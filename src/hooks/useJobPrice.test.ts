import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useJobPrice, useJobPrices, assertRequester } from './useJobPrice';

vi.mock('./useQuotes', async () => {
  const actual = await vi.importActual('./useQuotes');
  return {
    ...(actual as any),
    solvePoW: vi.fn().mockResolvedValue({ proof: new Uint8Array([1, 2, 3]) }),
  };
});

const VALID_REQUESTER = '0x1234567890123456789012345678901234567890';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const ALT_REQUESTER = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

describe('assertRequester guard', () => {
  it('throws when enabled=true and requester is zero address', () => {
    expect(() => assertRequester(ZERO_ADDRESS, 'useJobPrice', true)).toThrow(
      /requester.*required.*non-zero address/i,
    );
  });

  it('does not throw when enabled=false and requester is zero address', () => {
    expect(() => assertRequester(ZERO_ADDRESS, 'useJobPrice', false)).not.toThrow();
  });

  it('throws when enabled=true and requester is empty string', () => {
    expect(() => assertRequester('' as `0x${string}`, 'useJobPrice', true)).toThrow(
      /requester.*required.*non-zero address/i,
    );
  });

  it('does not throw when enabled=true and requester is valid', () => {
    expect(() => assertRequester(VALID_REQUESTER as `0x${string}`, 'useJobPrice', true)).not.toThrow();
  });
});

describe('useJobPrice requester integration', () => {
  const defaultFetchResponse = {
    ok: true,
    json: async () => ({
      service_id: '1',
      job_index: 0,
      price: '1000',
      timestamp: '1234567890',
      expiry: '1234567900',
      signature: '0xdeadbeef',
      operator: '0xoperator',
    }),
  } as Response;

  it('includes requester in the POST body', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(defaultFetchResponse);

    renderHook(() =>
      useJobPrice('http://localhost:8080', 1n, 0, 1n, true, VALID_REQUESTER as `0x${string}`),
    );

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    const [, init] = fetchSpy.mock.calls[0];
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.requester).toBe(VALID_REQUESTER);

    fetchSpy.mockRestore();
  });

  it('falls back to input requester when response lacks requester', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(defaultFetchResponse);

    const { result } = renderHook(() =>
      useJobPrice('http://localhost:8080', 1n, 0, 1n, true, VALID_REQUESTER as `0x${string}`),
    );

    await waitFor(() => {
      expect(result.current.quote).not.toBeNull();
    });

    expect(result.current.quote?.requester).toBe(VALID_REQUESTER);

    fetchSpy.mockRestore();
  });

  it('uses response requester when present', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        service_id: '1',
        job_index: 0,
        price: '1000',
        timestamp: '1234567890',
        expiry: '1234567900',
        signature: '0xdeadbeef',
        operator: '0xoperator',
        requester: ALT_REQUESTER,
      }),
    } as Response);

    const { result } = renderHook(() =>
      useJobPrice('http://localhost:8080', 1n, 0, 1n, true, VALID_REQUESTER as `0x${string}`),
    );

    await waitFor(() => {
      expect(result.current.quote).not.toBeNull();
    });

    expect(result.current.quote?.requester).toBe(ALT_REQUESTER);

    fetchSpy.mockRestore();
  });
});

describe('useJobPrices requester integration', () => {
  const defaultFetchResponse = {
    ok: true,
    json: async () => ({
      service_id: '1',
      job_index: 0,
      price: '1000',
      timestamp: '1234567890',
      expiry: '1234567900',
      signature: '0xdeadbeef',
      operator: '0xoperator',
    }),
  } as Response;

  const stableJobIndexes = [{ index: 0, name: 'test', multiplier: 1 }];

  it('includes requester in the POST body', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(defaultFetchResponse);

    renderHook(() =>
      useJobPrices(
        'http://localhost:8080',
        1n,
        1n,
        stableJobIndexes,
        true,
        VALID_REQUESTER as `0x${string}`,
      ),
    );

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    const [, init] = fetchSpy.mock.calls[0];
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.requester).toBe(VALID_REQUESTER);

    fetchSpy.mockRestore();
  });

  it('falls back to input requester when response lacks requester', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(defaultFetchResponse);

    const { result } = renderHook(() =>
      useJobPrices(
        'http://localhost:8080',
        1n,
        1n,
        stableJobIndexes,
        true,
        VALID_REQUESTER as `0x${string}`,
      ),
    );

    await waitFor(() => {
      expect(result.current.prices.length).toBeGreaterThan(0);
    });

    expect(result.current.prices[0].quote?.requester).toBe(VALID_REQUESTER);

    fetchSpy.mockRestore();
  });

  it('uses response requester when present', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        service_id: '1',
        job_index: 0,
        price: '1000',
        timestamp: '1234567890',
        expiry: '1234567900',
        signature: '0xdeadbeef',
        operator: '0xoperator',
        requester: ALT_REQUESTER,
      }),
    } as Response);

    const { result } = renderHook(() =>
      useJobPrices(
        'http://localhost:8080',
        1n,
        1n,
        stableJobIndexes,
        true,
        VALID_REQUESTER as `0x${string}`,
      ),
    );

    await waitFor(() => {
      expect(result.current.prices.length).toBeGreaterThan(0);
    });

    expect(result.current.prices[0].quote?.requester).toBe(ALT_REQUESTER);

    fetchSpy.mockRestore();
  });
});
