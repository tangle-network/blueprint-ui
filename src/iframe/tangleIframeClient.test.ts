import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TangleIframeClient } from './tangleIframeClient';
import { HARNESS_ORIGIN } from './testing';

const PARENT_ORIGIN = HARNESS_ORIGIN;

/**
 * Drive the client against a fake parent that lives in the same window.
 * Production flow goes iframe → window.parent (a different window); these
 * tests collapse the two windows for assertability while keeping the
 * exact protocol surface.
 */
function setupFakeParent() {
  const captured: object[] = [];
  const originalParent = window.parent;
  Object.defineProperty(window, 'parent', {
    configurable: true,
    get: () => ({
      postMessage: (message: object) => {
        captured.push(message);
      },
    }),
  });
  const restore = () => {
    Object.defineProperty(window, 'parent', {
      configurable: true,
      value: originalParent,
    });
  };
  const sendFromParent = (data: object) =>
    window.dispatchEvent(new MessageEvent('message', { data, origin: PARENT_ORIGIN }));
  return { captured, sendFromParent, restore };
}

describe('TangleIframeClient', () => {
  let fake: ReturnType<typeof setupFakeParent>;
  let client: TangleIframeClient;

  beforeEach(() => {
    fake = setupFakeParent();
    client = new TangleIframeClient({
      parentOrigin: PARENT_ORIGIN,
      appId: 'test-app',
      requestTimeoutMs: 1_000,
    });
  });

  afterEach(() => {
    client.uninstall();
    fake.restore();
  });

  it('posts a versioned handshake on install', () => {
    client.install();
    expect(fake.captured[0]).toEqual({
      kind: 'tangle.app.handshake',
      appId: 'test-app',
      version: '1',
    });
  });

  it('emits a wallet snapshot when the parent broadcasts accountChanged', () => {
    client.install();
    const seen: unknown[] = [];
    client.subscribe('wallet', (snap) => seen.push(snap));
    fake.sendFromParent({
      kind: 'tangle.app.accountChanged',
      account: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    });
    expect(seen).toEqual([
      {
        address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
        chainId: null,
        isConnected: true,
      },
    ]);
  });

  it('emits a service snapshot when the parent broadcasts serviceContext', () => {
    client.install();
    const seen: unknown[] = [];
    client.subscribe('service', (snap) => seen.push(snap));
    fake.sendFromParent({
      kind: 'tangle.app.serviceContext',
      blueprintId: '12',
      serviceId: '42',
      operators: [
        {
          address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          rpcAddress: 'http://op1:8000',
          status: 'active',
        },
      ],
      jobs: [{ index: 0, name: 'invoke' }],
      mode: 'cloud',
    });
    expect(seen).toHaveLength(1);
    const snap = seen[0] as {
      blueprintId: string;
      serviceId: string;
      operators: unknown[];
      jobs: unknown[];
    };
    expect(snap.blueprintId).toBe('12');
    expect(snap.serviceId).toBe('42');
    expect(snap.operators).toHaveLength(1);
    expect(snap.jobs).toHaveLength(1);
  });

  it('routes callJob requests + resolves on success terminal status', async () => {
    client.install();
    fake.sendFromParent({
      kind: 'tangle.app.handshakeAck',
      appId: 'test-app',
      protocolVersion: '1',
    });
    const call = client.callJob({
      jobIndex: 0,
      inputs: { prompt: 'hi' },
    });
    // First captured message is the handshake; the callJob is somewhere after.
    const outbound = await vi.waitFor(() => {
      const msg = fake.captured.find(
        (c) => (c as { kind?: string }).kind === 'tangle.app.callJob',
      );
      if (!msg) throw new Error('callJob not posted yet');
      return msg as { correlationId: string; inputs: Record<string, unknown> };
    });
    expect(outbound.inputs).toEqual({ prompt: 'hi' });
    // Reply with terminal success
    fake.sendFromParent({
      kind: 'tangle.app.jobResult',
      correlationId: outbound.correlationId,
      status: 'success',
      data: { text: 'hello world' },
    });
    const result = await call;
    expect(result.status).toBe('success');
    expect(result.data).toEqual({ text: 'hello world' });
  });

  it('accumulates streaming chunks in invocation state', async () => {
    client.install();
    fake.sendFromParent({
      kind: 'tangle.app.handshakeAck',
      appId: 'test-app',
      protocolVersion: '1',
    });
    const jobEvents: unknown[] = [];
    client.subscribe('job', (inv) => jobEvents.push(inv));
    const call = client.callJob({
      jobIndex: 0,
      inputs: { prompt: 'stream' },
      stream: true,
    });
    const outbound = await vi.waitFor(() => {
      const msg = fake.captured.find(
        (c) => (c as { kind?: string }).kind === 'tangle.app.callJob',
      );
      if (!msg) throw new Error('callJob not posted yet');
      return msg as { correlationId: string };
    });
    // Stream chunks then terminal
    fake.sendFromParent({
      kind: 'tangle.app.jobResult',
      correlationId: outbound.correlationId,
      status: 'streaming',
      chunk: 'hel',
    });
    fake.sendFromParent({
      kind: 'tangle.app.jobResult',
      correlationId: outbound.correlationId,
      status: 'streaming',
      chunk: 'lo',
    });
    fake.sendFromParent({
      kind: 'tangle.app.jobResult',
      correlationId: outbound.correlationId,
      status: 'success',
      data: { text: 'hello' },
    });
    const result = await call;
    expect(result.chunks).toEqual(['hel', 'lo']);
    expect(result.data).toEqual({ text: 'hello' });
    // Job events: initial pending + 2 streaming + final success = 4
    expect(jobEvents).toHaveLength(4);
  });

  it('rejects callJob on parent error', async () => {
    client.install();
    fake.sendFromParent({
      kind: 'tangle.app.handshakeAck',
      appId: 'test-app',
      protocolVersion: '1',
    });
    const call = client.callJob({ jobIndex: 0, inputs: {} });
    const outbound = await vi.waitFor(() => {
      const msg = fake.captured.find(
        (c) => (c as { kind?: string }).kind === 'tangle.app.callJob',
      );
      if (!msg) throw new Error('callJob not posted yet');
      return msg as { correlationId: string };
    });
    fake.sendFromParent({
      kind: 'tangle.app.jobResult',
      correlationId: outbound.correlationId,
      status: 'error',
      error: 'operator-unavailable',
    });
    await expect(call).rejects.toThrow('operator-unavailable');
  });

  it('ignores parent messages from untrusted origins', () => {
    client.install();
    const seen: unknown[] = [];
    client.subscribe('wallet', (snap) => seen.push(snap));
    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          kind: 'tangle.app.accountChanged',
          account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
        },
        origin: 'https://evil.example.com',
      }),
    );
    expect(seen).toEqual([]);
  });
});
