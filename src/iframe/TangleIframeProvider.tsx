import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  TangleIframeClient,
  type ServiceSnapshot,
  type TangleIframeClientOptions,
  type WalletSnapshot,
} from './tangleIframeClient';
import {
  detectTangleCloudParentOrigin,
  TANGLE_CLOUD_ORIGINS_DEFAULT,
} from '../wallet/detectParentOrigin';

type Props = {
  appId: string;
  /** Override the detected parent origin (e.g. dev/staging deploys). */
  parentOrigin?: string;
  /** Extra trusted origins for `detectTangleCloudParentOrigin`. */
  extraOrigins?: readonly string[];
  /**
   * Override the bootstrap behavior. When `'auto'` (default), the SDK
   * sniffs the embed context: real parent → install the bridge, top-frame
   * → drop into dev mode. `'bridge'` forces real-parent mode and throws
   * if no parent is detected. `'dev'` forces dev mode even when embedded
   * — useful for component-level tests.
   */
  mode?: 'auto' | 'bridge' | 'dev';
  children: ReactNode;
};

type ContextValue = {
  readonly client: TangleIframeClient | null;
  readonly wallet: WalletSnapshot;
  readonly service: ServiceSnapshot;
  readonly mode: 'bridge' | 'dev';
  readonly isReady: boolean;
};

const TangleIframeContext = createContext<ContextValue | null>(null);

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
};

/**
 * Iframe-blueprint root provider. Wrap your app once at the entry point.
 *
 * In `auto` mode (default) the SDK detects whether the app is embedded by a
 * trusted Tangle Cloud parent. If yes → installs the postMessage bridge.
 * If no (running standalone at `localhost:5173` etc.) → enters **dev mode**
 * with an in-memory state machine that the developer can drive via the
 * exported debug controls. Dev mode keeps the hook surface identical to
 * production so component code never branches on embed-vs-not.
 *
 * Three lifecycle stages:
 *
 *   1. Mount — `client` is created, mode is decided.
 *   2. Bootstrap — handshake (bridge) or first-paint setup (dev). The
 *      `isReady` flag flips to true.
 *   3. Active — wallet + service snapshots flow in via subscriptions.
 */
export function TangleIframeProvider({
  appId,
  parentOrigin: explicitOrigin,
  extraOrigins,
  mode: requestedMode = 'auto',
  children,
}: Props) {
  // Resolve the effective mode once at mount. Switching modes mid-session
  // would tear down the bridge / dev state inconsistently; restart instead.
  const resolution = useMemo(() => {
    if (requestedMode === 'dev') {
      return { mode: 'dev' as const, parentOrigin: null };
    }
    const detected =
      explicitOrigin ?? detectTangleCloudParentOrigin({ extraOrigins });
    if (requestedMode === 'bridge') {
      if (!detected) {
        // eslint-disable-next-line no-console
        console.error(
          '[TangleIframeProvider] mode="bridge" but no trusted parent was detected. Falling back to dev mode.',
        );
        return { mode: 'dev' as const, parentOrigin: null };
      }
      return { mode: 'bridge' as const, parentOrigin: detected };
    }
    // auto: bridge when detected, dev otherwise.
    return detected
      ? { mode: 'bridge' as const, parentOrigin: detected }
      : { mode: 'dev' as const, parentOrigin: null };
  }, [requestedMode, explicitOrigin, extraOrigins]);

  const clientRef = useRef<TangleIframeClient | null>(null);
  const [wallet, setWallet] = useState<WalletSnapshot>(NULL_WALLET);
  const [service, setService] = useState<ServiceSnapshot>(NULL_SERVICE);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (resolution.mode === 'dev') {
      // Dev mode: no bridge. The DevHarness component (or a test) seeds
      // wallet + service via `setDevWallet` / `setDevService` on the
      // returned context. Mark ready immediately so app code unblocks.
      setIsReady(true);
      return undefined;
    }
    // Bridge mode
    const options: TangleIframeClientOptions = {
      parentOrigin: resolution.parentOrigin,
      appId,
    };
    const client = new TangleIframeClient(options);
    clientRef.current = client;
    const unsubWallet = client.subscribe('wallet', setWallet);
    const unsubService = client.subscribe('service', setService);
    client.install();
    setIsReady(true);
    return () => {
      unsubWallet();
      unsubService();
      client.uninstall();
      clientRef.current = null;
      setIsReady(false);
    };
  }, [resolution, appId]);

  const value = useMemo<ContextValue>(
    () => ({
      client: clientRef.current,
      wallet,
      service,
      mode: resolution.mode,
      isReady,
    }),
    [wallet, service, resolution.mode, isReady],
  );

  return (
    <TangleIframeContext.Provider value={value}>
      {children}
    </TangleIframeContext.Provider>
  );
}

export function useTangleIframeContext(): ContextValue {
  const ctx = useContext(TangleIframeContext);
  if (!ctx) {
    throw new Error(
      'useTangleIframeContext must be used inside <TangleIframeProvider>.',
    );
  }
  return ctx;
}

export { TANGLE_CLOUD_ORIGINS_DEFAULT };
