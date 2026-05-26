import type { CreateConnectorFn } from 'wagmi';

import { detectTangleCloudParentOrigin } from './detectParentOrigin';
import { parentBridgeConnector } from './parentBridgeConnector';

export interface TangleBlueprintConnectorsOptions {
  /** App id reported to the parent dapp on handshake (when embedded). */
  appId: string;
  /**
   * Connectors used when running STANDALONE (the app's own domain) — e.g.
   * `[injected(), walletConnect({ projectId })]`. Ignored when embedded.
   */
  standalone: CreateConnectorFn[];
  /** Extra trusted parent origins (staging / preview deploys). */
  extraOrigins?: readonly string[];
  /** Override the bridged-request timeout (ms). */
  requestTimeoutMs?: number;
}

/**
 * One connector list, two deployment modes — so a blueprint app can ship a
 * single build that runs both standalone and embedded in Tangle Cloud:
 *
 *   - **Embedded** (a trusted Tangle Cloud parent is detected): the
 *     parent-bridge connector is the *only* connector. The sandboxed iframe
 *     can't inject a wallet extension, so it inherits / drives the parent's
 *     wallet over the postMessage bridge — surfacing injected/WalletConnect
 *     here would just dead-end.
 *   - **Standalone** (no trusted parent): the app's own `standalone`
 *     connectors, exactly as a normal dapp.
 *
 * The choice is made at runtime from the embedding context, so the same
 * artifact works in both places with no build flags.
 *
 *   createConfig({
 *     chains,
 *     transports,
 *     connectors: tangleBlueprintConnectors({
 *       appId: 'trading-arena',
 *       standalone: [injected(), walletConnect({ projectId })],
 *     }),
 *   })
 */
export function tangleBlueprintConnectors(
  options: TangleBlueprintConnectorsOptions,
): CreateConnectorFn[] {
  const parentOrigin = detectTangleCloudParentOrigin({
    extraOrigins: options.extraOrigins,
  });
  if (parentOrigin === null) {
    return options.standalone;
  }
  return [
    parentBridgeConnector({
      parentOrigin,
      appId: options.appId,
      ...(options.requestTimeoutMs !== undefined
        ? { requestTimeoutMs: options.requestTimeoutMs }
        : {}),
    }),
  ];
}
