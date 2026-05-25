// Tangle Cloud iframe ↔ parent dapp protocol — must mirror the parent's
// spec at `apps/tangle-cloud/src/blueprintApps/iframe/protocol.ts`. Bump the
// version constant in lockstep when either side adds a request kind.

import type { Address, Hex } from 'viem';

export const TANGLE_IFRAME_PROTOCOL_VERSION = '1' as const;
export const TANGLE_IFRAME_PROTOCOL_PREFIX = 'tangle.app.';

// ─── Iframe → Parent requests ────────────────────────────────────────────────

export type HandshakeRequest = {
  kind: 'tangle.app.handshake';
  appId: string;
  version: typeof TANGLE_IFRAME_PROTOCOL_VERSION;
};

export type ReadAccountRequest = {
  kind: 'tangle.app.readAccount';
  correlationId: string;
};

export type SwitchChainRequest = {
  kind: 'tangle.app.switchChain';
  correlationId: string;
  chainId: number;
};

export type SignMessageRequest = {
  kind: 'tangle.app.signMessage';
  correlationId: string;
  chainId: number;
  message: string;
};

export type SignTransactionRequest = {
  kind: 'tangle.app.signTransaction';
  correlationId: string;
  chainId: number;
  to: Address;
  data: Hex;
  value?: string;
};

// EIP-712 typed-data signing for publishers that need to sign custom message
// shapes — operator envelopes, off-chain attestations, claim proofs, etc.
// The parent renders the typed-data fields in its approval modal so the user
// can audit what they're signing. Iframes never see the wallet's signing key
// or private state.
//
// Shape mirrors viem's `signTypedData` argument: `domain` + `types` (without
// the EIP712Domain entry — viem injects it) + `primaryType` + `message`.
// Validation on the parent side rejects payloads that are obviously
// malformed (missing primaryType, types map empty, etc.) but does NOT
// re-shape the message — the user is the one who decides whether to sign.
export type SignTypedDataRequest = {
  kind: 'tangle.app.signTypedData';
  correlationId: string;
  chainId: number;
  domain: Readonly<{
    name?: string;
    version?: string;
    chainId?: number;
    verifyingContract?: Address;
    salt?: Hex;
  }>;
  /** EIP-712 types map; do NOT include the EIP712Domain entry (the parent
   * injects it derived from `domain`). */
  types: Readonly<Record<string, ReadonlyArray<{ name: string; type: string }>>>;
  /** Top-level type name in `types` whose values appear in `message`. */
  primaryType: string;
  /** The actual typed-data values. Shape matches `types[primaryType]`. */
  message: Readonly<Record<string, unknown>>;
};

// ─── Parent → Iframe messages ────────────────────────────────────────────────

export type HandshakeAck = {
  kind: 'tangle.app.handshakeAck';
  appId: string;
  protocolVersion: typeof TANGLE_IFRAME_PROTOCOL_VERSION;
};

export type ResultEnvelope<T> = { correlationId: string } & (
  | { ok: true; data: T }
  | { ok: false; error: string }
);

export type ReadAccountResult = {
  kind: 'tangle.app.readAccountResult';
} & ResultEnvelope<{ account: Address; chainId: number }>;

export type SwitchChainResult = {
  kind: 'tangle.app.switchChainResult';
} & ResultEnvelope<{ chainId: number }>;

export type SignMessageResult = {
  kind: 'tangle.app.signMessageResult';
} & ResultEnvelope<{ signature: Hex }>;

export type SignTransactionResult = {
  kind: 'tangle.app.signTransactionResult';
} & ResultEnvelope<{ txHash: Hex }>;

export type SignTypedDataResult = {
  kind: 'tangle.app.signTypedDataResult';
} & ResultEnvelope<{ signature: Hex }>;

export type AccountChanged = {
  kind: 'tangle.app.accountChanged';
  account: Address | null;
};

export type ChainChanged = {
  kind: 'tangle.app.chainChanged';
  chainId: number;
};

// ─── Service context (parent → iframe) ──────────────────────────────────────
//
// Iframe blueprints embedded by Tangle Cloud need to know which service +
// blueprint they're rendering for, plus which operators are quoted. The
// parent broadcasts this on mount and on every change (mode picker swap,
// new service activation, operator delta). The iframe just reads — it
// doesn't query the chain itself.
//
// The thin-iframe SDK exposes this as `useTangleService()`. Iframes that
// use the full wagmi connector path can still listen to `serviceContext`
// for routing convenience.

export type ServiceContextOperator = {
  readonly address: Address;
  readonly rpcAddress: string | undefined;
  readonly status: 'active' | 'inactive' | 'unknown';
};

export type ServiceContextJob = {
  readonly index: number;
  readonly name: string;
  readonly inputSchema?: unknown;
};

/**
 * Chain configuration the parent broadcasts to the iframe along with
 * service context. Iframes use this to build a `viem` public client for
 * READ-ONLY queries (`useTanglePublicClient` is the convenience hook).
 *
 * Iframes can ignore this and roll their own RPC config — particularly
 * when they need to read from chains OTHER than the active one (e.g. a
 * trading dapp pulling oracle data from mainnet while the active service
 * lives on Base Sepolia). The injected client is a hint, not a constraint.
 *
 * `rpcUrl` is the public RPC the parent uses, NOT a wallet RPC. Iframes
 * cannot sign or submit with this URL; signing always routes upstream via
 * the bridge.
 */
export type ChainContext = {
  readonly id: number;
  readonly name: string;
  readonly rpcUrl: string;
  /** Block-explorer base URL — useful for rendering tx links. */
  readonly blockExplorerUrl?: string;
  /** Native currency metadata for cost displays. */
  readonly nativeCurrency?: { readonly name: string; readonly symbol: string; readonly decimals: number };
};

export type ServiceContextBroadcast = {
  kind: 'tangle.app.serviceContext';
  readonly blueprintId: string;
  readonly serviceId: string | null;
  readonly operators: readonly ServiceContextOperator[];
  readonly jobs: readonly ServiceContextJob[];
  readonly mode: string | null;
  /** Active chain the parent is connected to; iframes can build a viem
   * publicClient against this for convenience. Optional for backwards
   * compatibility with parents that haven't been upgraded yet. */
  readonly chain?: ChainContext;
};

// ─── Job invocation (iframe ↔ parent) ────────────────────────────────────────
//
// Instead of the iframe wiring up its own EIP-712 quote / sign / submit
// flow, it sends a single CallJob request upstream. The parent does the
// whole dance (fetch RFQ quote, build typed data, request user signature,
// submit on-chain) and streams results back. The iframe never touches
// chain logic.

export type JobInputs = Readonly<Record<string, unknown>>;

export type CallJobRequest = {
  kind: 'tangle.app.callJob';
  correlationId: string;
  /** Job index within the blueprint, e.g. 0 for the primary entry-point. */
  jobIndex: number;
  /** Free-form inputs validated by the parent against the on-chain ABI. */
  inputs: JobInputs;
  /**
   * Whether the publisher wants intermediate progress (streaming chunks)
   * or just the terminal result. Streaming jobs (LLM generation, video
   * encode) opt in; one-shots (embeddings, classifications) don't.
   */
  stream?: boolean;
};

export type JobResultStatus = 'pending' | 'streaming' | 'success' | 'error';

export type JobResultEvent = {
  kind: 'tangle.app.jobResult';
  correlationId: string;
  status: JobResultStatus;
  /** Present on `streaming` and `success`. Shape is publisher-defined. */
  data?: unknown;
  /** Present on `streaming` only — incremental chunk for live UI. */
  chunk?: unknown;
  /** Present on `error`. Human-readable. */
  error?: string;
  /** Optional progress metadata (e.g. `{ percent: 0.42, eta_ms: 8000 }`). */
  progress?: { readonly percent?: number; readonly eta_ms?: number };
};

export type ParentMessage =
  | HandshakeAck
  | ReadAccountResult
  | SwitchChainResult
  | SignMessageResult
  | SignTransactionResult
  | SignTypedDataResult
  | AccountChanged
  | ChainChanged
  | ServiceContextBroadcast
  | JobResultEvent;

export type IframeRequest =
  | HandshakeRequest
  | ReadAccountRequest
  | SwitchChainRequest
  | SignMessageRequest
  | SignTransactionRequest
  | SignTypedDataRequest
  | CallJobRequest;

// The zero address used by the parent when no wallet is connected. The parent
// always responds to readAccount with an address; this sentinel means "no
// wallet" without making the response type a union of result shapes.
export const NO_WALLET_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Cryptographically-random ASCII correlation id matching the parent's
 * validator regex (`/^[\w.\-:]+$/`, max length 128). The connector keeps a
 * Map<correlationId, Resolver> so each request resolves independently.
 */
export function makeCorrelationId(prefix: string): string {
  const random =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return `${prefix}.${random}`;
}
