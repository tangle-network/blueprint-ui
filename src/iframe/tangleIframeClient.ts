// Thin-iframe SDK client — the framework-agnostic state machine that talks
// to a Tangle Cloud parent dapp over postMessage. React hooks (below) are
// thin wrappers around an instance of this class.
//
// Why a class, not a bag of functions: the iframe lifecycle is stateful —
// handshake, account changes, service-context broadcasts, in-flight job
// requests. The class owns that state once; hooks subscribe via listeners.
// Testing the protocol shape doesn't require React.

import type { Address, Hex } from 'viem';

import {
  makeCorrelationId,
  NO_WALLET_ADDRESS,
  TANGLE_IFRAME_PROTOCOL_VERSION,
  type CallJobRequest,
  type ChainContext,
  type JobInputs,
  type JobResultEvent,
  type JobResultStatus,
  type ParentMessage,
  type ServiceContextBroadcast,
  type ServiceContextJob,
  type ServiceContextOperator,
  type SignTypedDataRequest,
} from '../wallet/parentBridgeProtocol';

export type WalletSnapshot = {
  readonly address: Address | null;
  readonly chainId: number | null;
  readonly isConnected: boolean;
};

export type ServiceSnapshot = {
  readonly blueprintId: string | null;
  readonly serviceId: string | null;
  readonly operators: readonly ServiceContextOperator[];
  readonly jobs: readonly ServiceContextJob[];
  readonly mode: string | null;
  /** Chain context broadcast by the parent — drives `useTanglePublicClient`.
   * `null` when the parent hasn't sent one (older parent or dev mode). */
  readonly chain: ChainContext | null;
};

export type JobInvocation = {
  readonly correlationId: string;
  readonly status: JobResultStatus;
  readonly data?: unknown;
  readonly chunks: readonly unknown[];
  readonly error?: string;
  readonly progress?: { readonly percent?: number; readonly eta_ms?: number };
};

export type ClientEventMap = {
  wallet: WalletSnapshot;
  service: ServiceSnapshot;
  job: JobInvocation;
};

type Listener<K extends keyof ClientEventMap> = (
  value: ClientEventMap[K],
) => void;

export type TangleIframeClientOptions = {
  /**
   * Origin of the parent dapp. The client posts every message with this
   * exact `targetOrigin` and rejects inbound messages from any other origin.
   * Pass `'*'` only in dev — production must pin to the real parent
   * (`https://cloud.tangle.tools` etc.).
   */
  parentOrigin: string;
  /**
   * Stable identifier for this iframe app. The parent surfaces it in
   * handshake logs + uses it for permission scoping.
   */
  appId: string;
  /**
   * Per-request timeout. Defaults to 60s — long enough for a user to
   * read + approve a signing prompt in the parent. Long-running jobs
   * stream progress events; the request "completes" only on terminal
   * status, so the timeout protects against parents that drop replies
   * entirely.
   */
  requestTimeoutMs?: number;
};

const DEFAULT_REQUEST_TIMEOUT_MS = 60_000;
const HANDSHAKE_RETRY_MS = 250;
const HANDSHAKE_RETRY_BUDGET_MS = 10_000;
const NULL_WALLET: WalletSnapshot = {
  address: null,
  chainId: null,
  isConnected: false,
};
const NULL_SERVICE: ServiceSnapshot = {
  blueprintId: null,
  serviceId: null,
  operators: [],
  jobs: [],
  mode: null,
  chain: null,
};

type PendingJob = {
  resolve: (value: JobInvocation) => void;
  reject: (reason: Error) => void;
  timer: ReturnType<typeof setTimeout>;
  invocation: JobInvocation;
};

export class TangleIframeClient {
  private wallet: WalletSnapshot = NULL_WALLET;
  private service: ServiceSnapshot = NULL_SERVICE;
  private handshakeAcked = false;
  private handshakeWaiters: Array<() => void> = [];
  private installed = false;
  private handshakeRetry: ReturnType<typeof setInterval> | null = null;
  private listeners: {
    [K in keyof ClientEventMap]: Set<Listener<K>>;
  } = {
    wallet: new Set(),
    service: new Set(),
    job: new Set(),
  };
  private pendingJobs = new Map<string, PendingJob>();

  constructor(private readonly options: TangleIframeClientOptions) {}

  /** Wire the global message listener + initial handshake. Idempotent. */
  install(): void {
    if (this.installed || typeof window === 'undefined') return;
    this.installed = true;
    window.addEventListener('message', this.handleParentMessage);
    this.postHandshake();
    // Stand up a bounded retry. The parent may attach its listener slightly
    // after the iframe loads (React mounts child effects before parent
    // effects; a real parent may create the frame before its handler is
    // ready), so a single handshake can be dropped. Retry until acked.
    if (this.handshakeRetry === null) {
      let elapsed = 0;
      this.handshakeRetry = setInterval(() => {
        elapsed += HANDSHAKE_RETRY_MS;
        if (this.handshakeAcked || elapsed >= HANDSHAKE_RETRY_BUDGET_MS) {
          this.clearHandshakeRetry();
          return;
        }
        this.postHandshake();
      }, HANDSHAKE_RETRY_MS);
    }
  }

  uninstall(): void {
    if (!this.installed || typeof window === 'undefined') return;
    this.installed = false;
    this.clearHandshakeRetry();
    window.removeEventListener('message', this.handleParentMessage);
    for (const [, pending] of this.pendingJobs) {
      clearTimeout(pending.timer);
      pending.reject(new Error('Tangle iframe client uninstalled'));
    }
    this.pendingJobs.clear();
  }

  // ── State accessors ─────────────────────────────────────────────────────

  getWallet(): WalletSnapshot {
    return this.wallet;
  }
  getService(): ServiceSnapshot {
    return this.service;
  }

  // ── Subscription API (used by React hooks) ──────────────────────────────

  subscribe<K extends keyof ClientEventMap>(
    event: K,
    listener: Listener<K>,
  ): () => void {
    this.listeners[event].add(listener);
    return () => {
      this.listeners[event].delete(listener);
    };
  }

  // ── Wallet operations ───────────────────────────────────────────────────

  async signMessage(message: string): Promise<Hex> {
    await this.ensureBootstrapped();
    return this.dispatchWallet('tangle.app.signMessage', {
      chainId: this.wallet.chainId ?? 0,
      message,
    }).then((data) => (data as { signature: Hex }).signature);
  }

  async sendTransaction(tx: {
    to: Address;
    data: Hex;
    value?: bigint;
  }): Promise<Hex> {
    await this.ensureBootstrapped();
    return this.dispatchWallet('tangle.app.signTransaction', {
      chainId: this.wallet.chainId ?? 0,
      to: tx.to,
      data: tx.data,
      ...(tx.value !== undefined ? { value: tx.value.toString(10) } : {}),
    }).then((data) => (data as { txHash: Hex }).txHash);
  }

  async switchChain(chainId: number): Promise<number> {
    await this.ensureBootstrapped();
    return this.dispatchWallet('tangle.app.switchChain', { chainId }).then(
      (data) => (data as { chainId: number }).chainId,
    );
  }

  /**
   * EIP-712 typed-data signing. The parent renders the typed-data fields in
   * its approval modal; the user audits what they're signing. Use for
   * operator envelopes, off-chain attestations, anything that needs a
   * signature outside the standard blueprint-job RFQ flow.
   *
   * Shape mirrors viem's `signTypedData` argument. Do not include the
   * EIP712Domain entry in `types` — the parent injects it from `domain`.
   */
  async signTypedData(args: {
    domain: SignTypedDataRequest['domain'];
    types: SignTypedDataRequest['types'];
    primaryType: string;
    message: Readonly<Record<string, unknown>>;
  }): Promise<Hex> {
    await this.ensureBootstrapped();
    return this.dispatchWallet('tangle.app.signTypedData', {
      chainId: this.wallet.chainId ?? 0,
      domain: args.domain,
      types: args.types,
      primaryType: args.primaryType,
      message: args.message,
    }).then((data) => (data as { signature: Hex }).signature);
  }

  // ── Job invocation ──────────────────────────────────────────────────────

  /**
   * Invoke a blueprint job. Returns a Promise that resolves on terminal
   * status (`success` or `error`); subscribe to the `job` event for
   * intermediate streaming chunks.
   *
   * Streaming opt-in: pass `stream: true` if the publisher's job emits
   * chunks (LLM generation, video encoding). One-shot jobs (embeddings,
   * classifications) skip the streaming machinery.
   */
  async callJob(args: {
    jobIndex: number;
    inputs: JobInputs;
    stream?: boolean;
  }): Promise<JobInvocation> {
    await this.ensureBootstrapped();
    const correlationId = makeCorrelationId('tangle.app.callJob');
    const timeout =
      this.options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
    return new Promise<JobInvocation>((resolve, reject) => {
      const invocation: JobInvocation = {
        correlationId,
        status: 'pending',
        chunks: [],
      };
      const timer = setTimeout(() => {
        this.pendingJobs.delete(correlationId);
        reject(
          bridgeError(4900, `Job did not respond within ${timeout}ms`),
        );
      }, timeout);
      this.pendingJobs.set(correlationId, {
        resolve,
        reject,
        timer,
        invocation,
      });
      const message: CallJobRequest = {
        kind: 'tangle.app.callJob',
        correlationId,
        jobIndex: args.jobIndex,
        inputs: args.inputs,
        ...(args.stream !== undefined ? { stream: args.stream } : {}),
      };
      this.postToParent(message);
      // Emit pending immediately so consumer UIs can show optimistic state.
      this.emit('job', invocation);
    });
  }

  // ── Internals ───────────────────────────────────────────────────────────

  private clearHandshakeRetry(): void {
    if (this.handshakeRetry !== null) {
      clearInterval(this.handshakeRetry);
      this.handshakeRetry = null;
    }
  }

  private postHandshake(): void {
    this.postToParent({
      kind: 'tangle.app.handshake',
      appId: this.options.appId,
      version: TANGLE_IFRAME_PROTOCOL_VERSION,
    });
  }

  private postToParent(message: object): void {
    if (typeof window === 'undefined') return;
    try {
      window.parent.postMessage(message, this.options.parentOrigin);
    } catch {
      // Cross-origin / sandboxed; defensive only — postMessage shouldn't throw.
    }
  }

  private handleParentMessage = (event: MessageEvent): void => {
    if (event.origin !== this.options.parentOrigin) return;
    const data = event.data;
    if (typeof data !== 'object' || data === null) return;
    const message = data as ParentMessage;
    switch (message.kind) {
      case 'tangle.app.handshakeAck':
        this.handshakeAcked = true;
        this.clearHandshakeRetry();
        for (const resolve of this.handshakeWaiters) resolve();
        this.handshakeWaiters = [];
        return;
      case 'tangle.app.readAccountResult':
        if (message.ok) {
          this.updateWallet({
            address:
              message.data.account === NO_WALLET_ADDRESS
                ? null
                : message.data.account,
            chainId: message.data.chainId,
            isConnected: message.data.account !== NO_WALLET_ADDRESS,
          });
        }
        return;
      case 'tangle.app.accountChanged':
        this.updateWallet({
          address: message.account,
          chainId: this.wallet.chainId,
          isConnected: message.account !== null,
        });
        return;
      case 'tangle.app.chainChanged':
        this.updateWallet({
          address: this.wallet.address,
          chainId: message.chainId,
          isConnected: this.wallet.isConnected,
        });
        return;
      case 'tangle.app.serviceContext':
        this.updateService(message);
        return;
      case 'tangle.app.jobResult':
        this.handleJobResult(message);
        return;
      // Wallet-shape responses (signMessageResult etc.) are routed by
      // dispatchWallet's promise resolver, not here.
      default:
        return;
    }
  };

  private async dispatchWallet(
    kind:
      | 'tangle.app.signMessage'
      | 'tangle.app.signTransaction'
      | 'tangle.app.signTypedData'
      | 'tangle.app.switchChain',
    payload: Record<string, unknown>,
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const correlationId = makeCorrelationId(kind);
      const timeout =
        this.options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
      const expectedKind = (
        {
          'tangle.app.signMessage': 'tangle.app.signMessageResult',
          'tangle.app.signTransaction': 'tangle.app.signTransactionResult',
          'tangle.app.signTypedData': 'tangle.app.signTypedDataResult',
          'tangle.app.switchChain': 'tangle.app.switchChainResult',
        } as const
      )[kind];
      const timer = setTimeout(() => {
        window.removeEventListener('message', listener);
        reject(bridgeError(4900, `Parent did not respond to ${kind} in ${timeout}ms`));
      }, timeout);
      const listener = (event: MessageEvent) => {
        if (event.origin !== this.options.parentOrigin) return;
        const data = event.data;
        if (typeof data !== 'object' || data === null) return;
        const msg = data as ParentMessage;
        if (
          msg.kind !== expectedKind ||
          !('correlationId' in msg) ||
          msg.correlationId !== correlationId
        ) {
          return;
        }
        clearTimeout(timer);
        window.removeEventListener('message', listener);
        // Narrow the type — expectedKind is the wallet-shape `{ok, data|error}` envelope
        const env = msg as {
          ok: boolean;
          data?: unknown;
          error?: string;
        };
        if (env.ok) {
          resolve(env.data);
        } else {
          reject(bridgeError(4001, env.error ?? 'Parent rejected request'));
        }
      };
      window.addEventListener('message', listener);
      this.postToParent({ kind, correlationId, ...payload });
    });
  }

  private handleJobResult(message: JobResultEvent): void {
    const pending = this.pendingJobs.get(message.correlationId);
    if (!pending) return;
    const updated: JobInvocation = {
      correlationId: message.correlationId,
      status: message.status,
      chunks:
        message.chunk !== undefined
          ? [...pending.invocation.chunks, message.chunk]
          : pending.invocation.chunks,
      ...(message.data !== undefined ? { data: message.data } : {}),
      ...(message.error !== undefined ? { error: message.error } : {}),
      ...(message.progress !== undefined ? { progress: message.progress } : {}),
    };
    pending.invocation = updated;
    this.emit('job', updated);
    if (message.status === 'success' || message.status === 'error') {
      clearTimeout(pending.timer);
      this.pendingJobs.delete(message.correlationId);
      if (message.status === 'success') {
        pending.resolve(updated);
      } else {
        pending.reject(bridgeError(4001, message.error ?? 'Job failed'));
      }
    }
  }

  private updateWallet(next: WalletSnapshot): void {
    if (
      this.wallet.address === next.address &&
      this.wallet.chainId === next.chainId &&
      this.wallet.isConnected === next.isConnected
    ) {
      return;
    }
    this.wallet = next;
    this.emit('wallet', next);
  }

  private updateService(broadcast: ServiceContextBroadcast): void {
    const next: ServiceSnapshot = {
      blueprintId: broadcast.blueprintId,
      serviceId: broadcast.serviceId,
      operators: broadcast.operators,
      jobs: broadcast.jobs,
      mode: broadcast.mode,
      chain: broadcast.chain ?? null,
    };
    this.service = next;
    this.emit('service', next);
  }

  private emit<K extends keyof ClientEventMap>(
    event: K,
    value: ClientEventMap[K],
  ): void {
    for (const listener of [...this.listeners[event]]) {
      try {
        (listener as Listener<K>)(value);
      } catch {
        // Listener bugs shouldn't break the bridge.
      }
    }
  }

  private async ensureBootstrapped(): Promise<void> {
    if (this.handshakeAcked) return;
    this.install();
    await new Promise<void>((resolve) => {
      this.handshakeWaiters.push(resolve);
      const retry = setInterval(() => {
        if (this.handshakeAcked) {
          clearInterval(retry);
          return;
        }
        this.postHandshake();
      }, 500);
      setTimeout(() => clearInterval(retry), 10_000);
    });
  }
}

function bridgeError(code: number, message: string): Error {
  const err = new Error(message) as Error & { code?: number };
  err.code = code;
  return err;
}
