import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Address, Hex } from 'viem';

import { useTangleIframeContext } from './TangleIframeProvider';
import type {
  JobInvocation,
  ServiceSnapshot,
  WalletSnapshot,
} from './tangleIframeClient';
import type { JobInputs } from '../wallet/parentBridgeProtocol';

/**
 * Read-only view of the connected wallet, plus the operations the iframe
 * can request the parent to perform.
 *
 * The iframe never holds a private key, never sees `window.ethereum`, never
 * imports wagmi. All wallet work happens upstream in the Tangle Cloud
 * dapp's wagmi config + ConnectKit modal.
 */
export function useTangleWallet(): WalletSnapshot & {
  signMessage: (message: string) => Promise<Hex>;
  sendTransaction: (tx: {
    to: Address;
    data: Hex;
    value?: bigint;
  }) => Promise<Hex>;
  switchChain: (chainId: number) => Promise<number>;
} {
  const { client, wallet } = useTangleIframeContext();
  const signMessage = useCallback(
    (message: string) => {
      if (!client) throw new Error('Wallet not available in dev mode.');
      return client.signMessage(message);
    },
    [client],
  );
  const sendTransaction = useCallback(
    (tx: { to: Address; data: Hex; value?: bigint }) => {
      if (!client) throw new Error('Wallet not available in dev mode.');
      return client.sendTransaction(tx);
    },
    [client],
  );
  const switchChain = useCallback(
    (chainId: number) => {
      if (!client) throw new Error('Wallet not available in dev mode.');
      return client.switchChain(chainId);
    },
    [client],
  );
  return { ...wallet, signMessage, sendTransaction, switchChain };
}

/**
 * The service the iframe is currently rendering for. Broadcast by the
 * parent dapp on mount + every time the service/mode changes — the iframe
 * never queries the chain or the indexer itself.
 *
 * `serviceId === null` means the operator hasn't deployed an instance yet;
 * the iframe should render its deploy-ready / configuration surface.
 */
export function useTangleService(): ServiceSnapshot {
  return useTangleIframeContext().service;
}

/**
 * Invoke a blueprint job. Returns a callable + a snapshot of the most
 * recent invocation (or null if none yet).
 *
 * Streaming jobs (LLM, video, audio) opt in via `stream: true`. The hook's
 * `invocation.chunks` accumulates each streaming chunk so the UI can render
 * progressive output. For one-shot jobs (embeddings, classification), use
 * the `invocation.data` once `status === 'success'`.
 *
 * Multiple in-flight invocations are supported — each `call()` returns its
 * own correlationId. The hook tracks only the *latest* invocation in its
 * state; consumers that need all history can subscribe to the client's
 * `job` event directly.
 */
export function useCallJob() {
  const { client } = useTangleIframeContext();
  const [invocation, setInvocation] = useState<JobInvocation | null>(null);
  const [latestId, setLatestId] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return undefined;
    return client.subscribe('job', (next) => {
      // Only update if this is the latest invocation, or no latest tracked.
      setLatestId((prevLatest) => {
        if (prevLatest === null || prevLatest === next.correlationId) {
          setInvocation(next);
          return next.correlationId;
        }
        return prevLatest;
      });
    });
  }, [client]);

  const call = useCallback(
    async (args: { jobIndex: number; inputs: JobInputs; stream?: boolean }) => {
      if (!client) {
        throw new Error(
          'Job invocation not available in dev mode without a configured stub. See `setDevJobHandler` in the testing harness.',
        );
      }
      // Clear prior invocation state when starting a new call.
      setInvocation(null);
      const result = await client.callJob(args);
      setLatestId(result.correlationId);
      return result;
    },
    [client],
  );

  const reset = useCallback(() => {
    setInvocation(null);
    setLatestId(null);
  }, []);

  return useMemo(
    () => ({ call, invocation, reset, isPending: invocation?.status === 'pending' || invocation?.status === 'streaming' }),
    [call, invocation, reset],
  );
}

/**
 * Convenience: returns just the address when connected, or `null`. Most
 * iframe components only care about the address.
 */
export function useTangleAddress(): Address | null {
  return useTangleIframeContext().wallet.address;
}

/** Whether the iframe has completed its parent-handshake (or is in dev mode). */
export function useTangleReady(): boolean {
  return useTangleIframeContext().isReady;
}

/** Resolved mode — `'bridge'` (real parent) or `'dev'` (standalone). */
export function useTangleMode(): 'bridge' | 'dev' {
  return useTangleIframeContext().mode;
}
