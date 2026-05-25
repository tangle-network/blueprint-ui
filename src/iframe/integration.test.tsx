import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TangleIframeProvider } from './TangleIframeProvider';
import {
  useChainContext,
  useTangleService,
  useTangleWallet,
} from './hooks';
import {
  HARNESS_ORIGIN,
  TangleParentHarness,
  mockServiceContext,
  mockWallet,
} from './testing';

/**
 * End-to-end: a consumer app mounts `TangleIframeProvider` (forced bridge
 * mode) *inside* `TangleParentHarness`. This is exactly how a downstream
 * blueprint tests itself, and it exercises the parts that unit tests of the
 * client alone can't:
 *   - React mounts child effects before parent effects, so the provider's
 *     `install()` posts its first handshake before the harness has wired its
 *     `window.parent.postMessage` interceptor. The client's standing retry
 *     must recover from that dropped handshake.
 *   - The harness must receive iframe→parent posts via the `window.parent`
 *     override (same-window `postMessage` with a synthetic origin is dropped
 *     by the DOM), and replies must flow back as dispatched `message` events.
 * A regression in either path makes wallet/service context never arrive.
 */
function Probe() {
  const wallet = useTangleWallet();
  const service = useTangleService();
  const chain = useChainContext();
  return (
    <div>
      <span data-testid="address">{wallet.address ?? 'none'}</span>
      <span data-testid="connected">{String(wallet.isConnected)}</span>
      <span data-testid="chainId">{String(wallet.chainId)}</span>
      <span data-testid="serviceId">{service.serviceId ?? 'none'}</span>
      <span data-testid="operators">{String(service.operators.length)}</span>
      <span data-testid="chainName">{chain?.name ?? 'none'}</span>
    </div>
  );
}

function mount(opts?: {
  address?: `0x${string}` | null;
  serviceId?: string | null;
}) {
  return render(
    <TangleParentHarness
      appId="probe-app"
      wallet={mockWallet({ address: opts?.address })}
      service={mockServiceContext({ serviceId: opts?.serviceId ?? '7' })}
    >
      <TangleIframeProvider
        appId="probe-app"
        mode="bridge"
        parentOrigin={HARNESS_ORIGIN}
      >
        <Probe />
      </TangleIframeProvider>
    </TangleParentHarness>,
  );
}

describe('TangleIframeProvider ↔ TangleParentHarness integration', () => {
  it('propagates wallet + chain + service context after handshake', async () => {
    mount();
    await waitFor(() => {
      expect(screen.getByTestId('connected').textContent).toBe('true');
    });
    expect(screen.getByTestId('address').textContent).toBe(
      '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    );
    expect(screen.getByTestId('chainId').textContent).toBe('84532');
    expect(screen.getByTestId('serviceId').textContent).toBe('7');
    expect(screen.getByTestId('operators').textContent).toBe('1');
    expect(screen.getByTestId('chainName').textContent).toBe('Base Sepolia');
  });

  it('reports a disconnected wallet when the parent has no account', async () => {
    mount({ address: null });
    await waitFor(() => {
      expect(screen.getByTestId('serviceId').textContent).toBe('7');
    });
    expect(screen.getByTestId('connected').textContent).toBe('false');
    expect(screen.getByTestId('address').textContent).toBe('none');
  });
});
