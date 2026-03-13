import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { type Config, WagmiContext, useReconnect } from 'wagmi';

interface Web3ShellProps {
  config: Config;
  reconnectOnMount?: boolean;
  children: ReactNode;
}

type RecentConnectorStorage = Pick<NonNullable<Config['storage']>, 'getItem' | 'removeItem'>;

// We prefer the last successful connector so silent restoration is fast and
// doesn't probe every available connector on startup.
async function findRecentConnector(currentConfig: Pick<Config, 'connectors' | 'storage'>) {
  const storage = currentConfig.storage as RecentConnectorStorage | null | undefined;
  const recentConnectorId = await storage?.getItem('recentConnectorId');
  if (!recentConnectorId) return null;

  const connector = currentConfig.connectors.find((candidate) => candidate.id === recentConnectorId) ?? null;
  if (!connector) {
    await storage?.removeItem('recentConnectorId');
  }

  return connector;
}

function ReconnectOnMount({
  config,
  reconnectOnMount,
}: Pick<Web3ShellProps, 'config' | 'reconnectOnMount'>) {
  const { reconnectAsync } = useReconnect();
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (!reconnectOnMount || attemptedRef.current) return;
    attemptedRef.current = true;

    let cancelled = false;

    // Why this exists:
    // - In this app stack, wagmi's built-in provider hydrate path can kick off
    //   reconnect work during provider rerenders.
    // - Route navigation rerenders the app shell, so wallet restore was being
    //   retriggered on page changes, which made the header look like it was
    //   reconnecting and added several seconds of delay.
    //
    // Our fix is to keep wagmi context/query wiring here, but move restore to a
    // single effect guarded by a ref. A rerender keeps the same ref value, so
    // reconnect only runs once per real mount and still runs again after a full
    // page refresh.
    void (async () => {
      try {
        const connector = await findRecentConnector(config);
        if (cancelled) return;

        if (connector) {
          await reconnectAsync({ connectors: [connector] });
          return;
        }

        await reconnectAsync();
      } catch {
        // A failed silent reconnect should leave the app disconnected.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [config, reconnectAsync, reconnectOnMount]);

  return null;
}

export function Web3Shell({
  config,
  reconnectOnMount = true,
  children,
}: Web3ShellProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 30_000,
          },
        },
      }),
  );

  return (
    // We provide wagmi context directly instead of using WagmiProvider so we can
    // control exactly when silent reconnect runs.
    <WagmiContext.Provider value={config}>
      <QueryClientProvider client={queryClient}>
        <ReconnectOnMount config={config} reconnectOnMount={reconnectOnMount} />
          {children}
      </QueryClientProvider>
    </WagmiContext.Provider>
  );
}
