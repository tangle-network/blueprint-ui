// Testing harness for iframe blueprints. The promise of the SDK is that
// publishers can iterate on their UI without running the Tangle Cloud dapp
// — these utilities are what makes that true.

import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Address } from 'viem';

import type {
  ServiceSnapshot,
  WalletSnapshot,
} from './tangleIframeClient';
import type {
  CallJobRequest,
  JobInputs,
  JobResultEvent,
  ParentMessage,
  ServiceContextBroadcast,
  ServiceContextJob,
  ServiceContextOperator,
} from '../wallet/parentBridgeProtocol';

export type MockWalletInput = Partial<{
  address: Address | null;
  chainId: number;
  isConnected: boolean;
}>;

export type MockServiceInput = Partial<{
  blueprintId: string;
  serviceId: string | null;
  operators: readonly ServiceContextOperator[];
  jobs: readonly ServiceContextJob[];
  mode: string | null;
}>;

/**
 * Construct a deterministic wallet snapshot for tests. Defaults:
 * connected, vitalik.eth's address, Base Sepolia (84532).
 */
export function mockWallet(input: MockWalletInput = {}): WalletSnapshot {
  return {
    address:
      input.address === undefined
        ? '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'
        : input.address,
    chainId: input.chainId ?? 84532,
    isConnected: input.isConnected ?? input.address !== null,
  };
}

/**
 * Construct a deterministic service snapshot for tests. Defaults: blueprint
 * id `0`, no service deployed yet (serviceId null), single mock operator on
 * the canonical local sidecar URL.
 */
export function mockServiceContext(
  input: MockServiceInput = {},
): ServiceSnapshot {
  return {
    blueprintId: input.blueprintId ?? '0',
    serviceId: input.serviceId === undefined ? null : input.serviceId,
    operators:
      input.operators ?? [
        {
          address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          rpcAddress: 'http://localhost:8545',
          status: 'active',
        },
      ],
    jobs:
      input.jobs ?? [
        { index: 0, name: 'invoke' },
      ],
    mode: input.mode ?? null,
  };
}

export type CallJobHandler = (
  request: CallJobRequest,
) => Promise<{
  status: 'success' | 'error';
  data?: unknown;
  error?: string;
  /** Streaming chunks emitted in order before the terminal status. */
  chunks?: readonly unknown[];
}>;

type HarnessProps = {
  appId?: string;
  wallet?: WalletSnapshot;
  service?: ServiceSnapshot;
  /** Override callJob behavior. Default: returns a static `{ ok: true }`. */
  onCallJob?: CallJobHandler;
  /** Surface a floating debug panel that lets the developer flip state at runtime. */
  showDebugPanel?: boolean;
  children: ReactNode;
};

/**
 * Drop-in parent simulator for tests + storybook + standalone dev. Wraps
 * children in a fake parent that:
 *
 *   - Acks the iframe's handshake immediately
 *   - Broadcasts the configured wallet + service context on mount
 *   - Intercepts `callJob` requests and routes them through `onCallJob`
 *   - (Optional) Mounts a floating debug panel so the developer can
 *     mutate state at runtime: change account, switch chain, set
 *     serviceId, fire a custom job
 *
 * The harness runs in the same JS context as the iframe app — there's no
 * cross-frame postMessage, just same-window event dispatch. That keeps it
 * fully synchronous + assertable, but the messages still flow through the
 * exact same protocol surface the production bridge uses.
 *
 * Usage:
 *
 *   <TangleParentHarness wallet={mockWallet()} service={mockServiceContext()}>
 *     <TangleIframeProvider appId="my-app" mode="bridge" parentOrigin="harness://">
 *       <App />
 *     </TangleIframeProvider>
 *   </TangleParentHarness>
 *
 * Set `mode="bridge"` + `parentOrigin="harness://"` on the provider so it
 * matches the harness's synthetic origin. In production, use `mode="auto"`
 * (the default).
 */
export const TangleParentHarness: FC<HarnessProps> = ({
  appId = 'harness',
  wallet = mockWallet(),
  service = mockServiceContext(),
  onCallJob,
  showDebugPanel = false,
  children,
}) => {
  const [currentWallet, setCurrentWallet] = useState<WalletSnapshot>(wallet);
  const [currentService, setCurrentService] =
    useState<ServiceSnapshot>(service);
  const [callLog, setCallLog] = useState<CallJobRequest[]>([]);
  const callJobHandler = useRef<CallJobHandler | undefined>(onCallJob);
  callJobHandler.current = onCallJob;
  const seenHandshake = useRef(false);

  // Listen for iframe → "parent" messages. Since the harness shares the
  // window, `window.postMessage` with the synthetic origin is the easiest
  // wire — the iframe SDK posts to `window.parent`, which in same-window
  // mode IS this listener.
  useEffect(() => {
    const reply = (message: ParentMessage) => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: message,
          origin: HARNESS_ORIGIN,
        }),
      );
    };

    const broadcast = () => {
      const broadcastMsg: ServiceContextBroadcast = {
        kind: 'tangle.app.serviceContext',
        blueprintId: currentService.blueprintId ?? '0',
        serviceId: currentService.serviceId,
        operators: currentService.operators,
        jobs: currentService.jobs,
        mode: currentService.mode,
      };
      reply(broadcastMsg);
      // Also broadcast wallet — combined into accountChanged + chainChanged.
      reply({
        kind: 'tangle.app.accountChanged',
        account: currentWallet.address,
      });
      if (currentWallet.chainId !== null) {
        reply({
          kind: 'tangle.app.chainChanged',
          chainId: currentWallet.chainId,
        });
      }
    };

    const handler = async (event: MessageEvent) => {
      // The iframe posts via `window.parent.postMessage(msg, parentOrigin)`.
      // In same-window mode, that fires a message event on this same window
      // with origin = parentOrigin. Filter out events the harness itself
      // dispatched (origin === HARNESS_ORIGIN) — those are replies.
      if (event.origin === HARNESS_ORIGIN) return;
      const data = event.data;
      if (typeof data !== 'object' || data === null) return;
      const message = data as { kind?: string; correlationId?: string };

      switch (message.kind) {
        case 'tangle.app.handshake': {
          if (!seenHandshake.current) {
            seenHandshake.current = true;
            reply({
              kind: 'tangle.app.handshakeAck',
              appId,
              protocolVersion: '1',
            });
            broadcast();
          }
          return;
        }
        case 'tangle.app.readAccount': {
          if (typeof message.correlationId !== 'string') return;
          reply({
            kind: 'tangle.app.readAccountResult',
            correlationId: message.correlationId,
            ok: true,
            data: {
              account:
                currentWallet.address ??
                ('0x0000000000000000000000000000000000000000' as Address),
              chainId: currentWallet.chainId ?? 0,
            },
          });
          return;
        }
        case 'tangle.app.callJob': {
          if (typeof message.correlationId !== 'string') return;
          const request = message as unknown as CallJobRequest;
          setCallLog((prev) => [...prev, request]);
          // Default behavior when no handler: emit a single `success` with
          // a echo of the inputs so UIs render *something* in dev mode.
          const handler = callJobHandler.current;
          if (!handler) {
            const result: JobResultEvent = {
              kind: 'tangle.app.jobResult',
              correlationId: request.correlationId,
              status: 'success',
              data: { echo: request.inputs },
            };
            reply(result);
            return;
          }
          try {
            const outcome = await handler(request);
            for (const chunk of outcome.chunks ?? []) {
              reply({
                kind: 'tangle.app.jobResult',
                correlationId: request.correlationId,
                status: 'streaming',
                chunk,
              });
            }
            reply({
              kind: 'tangle.app.jobResult',
              correlationId: request.correlationId,
              status: outcome.status,
              ...(outcome.data !== undefined ? { data: outcome.data } : {}),
              ...(outcome.error !== undefined ? { error: outcome.error } : {}),
            });
          } catch (err) {
            reply({
              kind: 'tangle.app.jobResult',
              correlationId: request.correlationId,
              status: 'error',
              error: err instanceof Error ? err.message : String(err),
            });
          }
          return;
        }
        // Wallet ops respond optimistically — tests that want to assert
        // specific signatures should pre-set them via the dev handler.
        case 'tangle.app.signMessage': {
          if (typeof message.correlationId !== 'string') return;
          reply({
            kind: 'tangle.app.signMessageResult',
            correlationId: message.correlationId,
            ok: true,
            data: { signature: '0xdeadbeef' as `0x${string}` },
          });
          return;
        }
        case 'tangle.app.signTransaction': {
          if (typeof message.correlationId !== 'string') return;
          reply({
            kind: 'tangle.app.signTransactionResult',
            correlationId: message.correlationId,
            ok: true,
            data: { txHash: ('0x' + '00'.repeat(32)) as `0x${string}` },
          });
          return;
        }
        case 'tangle.app.switchChain': {
          if (
            typeof message.correlationId !== 'string' ||
            typeof (message as unknown as { chainId?: number }).chainId !== 'number'
          ) {
            return;
          }
          const chainId = (message as unknown as { chainId: number }).chainId;
          setCurrentWallet((w) => ({ ...w, chainId }));
          reply({
            kind: 'tangle.app.switchChainResult',
            correlationId: message.correlationId,
            ok: true,
            data: { chainId },
          });
          return;
        }
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [appId, currentWallet, currentService]);

  // Re-broadcast when state changes.
  useEffect(() => {
    if (!seenHandshake.current) return;
    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          kind: 'tangle.app.accountChanged',
          account: currentWallet.address,
        },
        origin: HARNESS_ORIGIN,
      }),
    );
  }, [currentWallet.address]);

  useEffect(() => {
    if (!seenHandshake.current || currentWallet.chainId === null) return;
    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          kind: 'tangle.app.chainChanged',
          chainId: currentWallet.chainId,
        },
        origin: HARNESS_ORIGIN,
      }),
    );
  }, [currentWallet.chainId]);

  useEffect(() => {
    if (!seenHandshake.current) return;
    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          kind: 'tangle.app.serviceContext',
          blueprintId: currentService.blueprintId ?? '0',
          serviceId: currentService.serviceId,
          operators: currentService.operators,
          jobs: currentService.jobs,
          mode: currentService.mode,
        },
        origin: HARNESS_ORIGIN,
      }),
    );
  }, [currentService]);

  const debugApi = useMemo(
    () => ({
      setWallet: setCurrentWallet,
      setService: setCurrentService,
      callLog,
    }),
    [callLog],
  );

  return (
    <>
      {children}
      {showDebugPanel && <DebugPanel api={debugApi} />}
    </>
  );
};

/**
 * Synthetic origin every harness instance uses. Stable across tests so the
 * iframe SDK + the harness can pin to the same string.
 */
export const HARNESS_ORIGIN = 'harness://tangle.local';

// ── Debug panel ──────────────────────────────────────────────────────────────

const DebugPanel: FC<{
  api: {
    setWallet: (w: WalletSnapshot | ((prev: WalletSnapshot) => WalletSnapshot)) => void;
    setService: (
      s: ServiceSnapshot | ((prev: ServiceSnapshot) => ServiceSnapshot),
    ) => void;
    callLog: readonly CallJobRequest[];
  };
}> = ({ api }) => {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<'wallet' | 'service' | 'log'>('wallet');
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={debugStyles.collapsedTrigger}
      >
        Debug
      </button>
    );
  }
  return (
    <div style={debugStyles.panel}>
      <header style={debugStyles.header}>
        <strong style={{ fontSize: 11 }}>TANGLE DEV HARNESS</strong>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={debugStyles.closeButton}
          aria-label="Close debug panel"
        >
          ×
        </button>
      </header>
      <nav style={debugStyles.tabs}>
        {(['wallet', 'service', 'log'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              ...debugStyles.tab,
              ...(tab === t ? debugStyles.tabActive : {}),
            }}
          >
            {t}
          </button>
        ))}
      </nav>
      <div style={debugStyles.body}>
        {tab === 'wallet' && <WalletTab api={api} />}
        {tab === 'service' && <ServiceTab api={api} />}
        {tab === 'log' && <CallLogTab callLog={api.callLog} />}
      </div>
    </div>
  );
};

const WalletTab: FC<{
  api: { setWallet: (w: WalletSnapshot | ((prev: WalletSnapshot) => WalletSnapshot)) => void };
}> = ({ api }) => {
  const [address, setAddressInput] = useState(
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  );
  const [chainId, setChainIdInput] = useState('84532');
  const applyConnect = useCallback(() => {
    api.setWallet({
      address: address as Address,
      chainId: Number(chainId) || null,
      isConnected: true,
    });
  }, [address, chainId, api]);
  const disconnect = useCallback(() => {
    api.setWallet({ address: null, chainId: null, isConnected: false });
  }, [api]);
  return (
    <div>
      <label style={debugStyles.label}>address</label>
      <input
        value={address}
        onChange={(e) => setAddressInput(e.target.value)}
        style={debugStyles.input}
      />
      <label style={debugStyles.label}>chain id</label>
      <input
        value={chainId}
        onChange={(e) => setChainIdInput(e.target.value)}
        style={debugStyles.input}
      />
      <div style={debugStyles.buttonRow}>
        <button type="button" onClick={applyConnect} style={debugStyles.primary}>
          Set connected
        </button>
        <button type="button" onClick={disconnect} style={debugStyles.secondary}>
          Disconnect
        </button>
      </div>
    </div>
  );
};

const ServiceTab: FC<{
  api: {
    setService: (
      s: ServiceSnapshot | ((prev: ServiceSnapshot) => ServiceSnapshot),
    ) => void;
  };
}> = ({ api }) => {
  const [serviceId, setServiceIdInput] = useState('1');
  const [blueprintId, setBlueprintIdInput] = useState('0');
  const apply = useCallback(() => {
    api.setService((prev) => ({
      ...prev,
      serviceId: serviceId || null,
      blueprintId,
    }));
  }, [api, serviceId, blueprintId]);
  const clearService = useCallback(() => {
    api.setService((prev) => ({ ...prev, serviceId: null }));
  }, [api]);
  return (
    <div>
      <label style={debugStyles.label}>blueprint id</label>
      <input
        value={blueprintId}
        onChange={(e) => setBlueprintIdInput(e.target.value)}
        style={debugStyles.input}
      />
      <label style={debugStyles.label}>service id (empty = not deployed)</label>
      <input
        value={serviceId}
        onChange={(e) => setServiceIdInput(e.target.value)}
        style={debugStyles.input}
      />
      <div style={debugStyles.buttonRow}>
        <button type="button" onClick={apply} style={debugStyles.primary}>
          Apply
        </button>
        <button type="button" onClick={clearService} style={debugStyles.secondary}>
          Clear service
        </button>
      </div>
    </div>
  );
};

const CallLogTab: FC<{ callLog: readonly CallJobRequest[] }> = ({ callLog }) => {
  if (callLog.length === 0) {
    return <p style={debugStyles.empty}>No callJob requests yet.</p>;
  }
  return (
    <ol style={debugStyles.log}>
      {callLog.map((entry) => (
        <li key={entry.correlationId} style={debugStyles.logEntry}>
          <strong>job {entry.jobIndex}</strong>
          <pre style={debugStyles.pre}>
            {JSON.stringify(entry.inputs, null, 2)}
          </pre>
        </li>
      ))}
    </ol>
  );
};

// Inline styles keep the harness style-system-agnostic — consumers may not
// ship Tailwind, and the panel shouldn't add a dependency.
const debugStyles = {
  panel: {
    position: 'fixed' as const,
    right: 12,
    top: 12,
    width: 280,
    zIndex: 99999,
    background: '#0b0b14',
    color: '#fff',
    border: '1px solid #3a3a52',
    borderRadius: 10,
    boxShadow: '0 14px 32px rgba(0,0,0,0.4)',
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Code", monospace',
    fontSize: 12,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 10px',
    borderBottom: '1px solid #2a2a3e',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: 18,
    cursor: 'pointer',
    lineHeight: 1,
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #2a2a3e',
  },
  tab: {
    flex: 1,
    background: 'none',
    border: 'none',
    color: '#a0a0c0',
    padding: '6px 8px',
    cursor: 'pointer',
    fontSize: 11,
    textTransform: 'uppercase' as const,
  },
  tabActive: {
    color: '#fff',
    borderBottom: '2px solid #818cf8',
  },
  body: {
    padding: 10,
    maxHeight: 320,
    overflow: 'auto' as const,
  },
  label: {
    display: 'block',
    color: '#a0a0c0',
    fontSize: 10,
    marginBottom: 4,
    marginTop: 6,
    textTransform: 'uppercase' as const,
  },
  input: {
    width: '100%',
    background: '#15152a',
    border: '1px solid #2a2a3e',
    color: '#fff',
    padding: '6px 8px',
    borderRadius: 4,
    fontFamily: 'inherit',
    fontSize: 11,
    boxSizing: 'border-box' as const,
  },
  buttonRow: { display: 'flex', gap: 6, marginTop: 8 },
  primary: {
    flex: 1,
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    padding: '6px 8px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 11,
    fontFamily: 'inherit',
  },
  secondary: {
    flex: 1,
    background: 'transparent',
    color: '#a0a0c0',
    border: '1px solid #3a3a52',
    padding: '6px 8px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 11,
    fontFamily: 'inherit',
  },
  collapsedTrigger: {
    position: 'fixed' as const,
    right: 12,
    top: 12,
    zIndex: 99999,
    padding: '6px 10px',
    background: '#0b0b14',
    border: '1px solid #3a3a52',
    color: '#fff',
    borderRadius: 6,
    fontFamily: 'inherit',
    fontSize: 11,
    cursor: 'pointer',
  },
  log: { listStyle: 'none', padding: 0, margin: 0 },
  logEntry: {
    padding: 6,
    borderBottom: '1px solid #2a2a3e',
    fontSize: 11,
  },
  pre: {
    margin: '4px 0 0',
    color: '#a0a0c0',
    fontSize: 10,
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  },
  empty: { color: '#a0a0c0', fontSize: 11, margin: 0 },
} as const;

export type { JobInputs };
