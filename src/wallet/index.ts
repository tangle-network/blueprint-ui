/**
 * Tangle Cloud parent-bridge wallet adapter.
 *
 * iframe blueprints embedded by the Tangle Cloud dapp can't use the usual
 * `window.ethereum` connector — browser wallet extensions don't inject into
 * sandboxed iframes. This module ships a wagmi connector that proxies wallet
 * operations to the parent dapp through the existing `tangle.app.*`
 * postMessage protocol, so the iframe inherits the parent's wallet without
 * its own picker.
 *
 * Build a blueprint app ONCE and ship it both standalone and embedded — the
 * recommended entry point is `tangleBlueprintConnectors`, which picks the
 * right connectors at runtime:
 *
 *   import { tangleBlueprintConnectors } from '@tangle-network/blueprint-ui/wallet';
 *
 *   createConfig({
 *     chains, transports,
 *     connectors: tangleBlueprintConnectors({
 *       appId: 'my-app',
 *       standalone: [injected(), walletConnect({ projectId })],
 *     }),
 *   });
 *
 * Embedded in Tangle Cloud → the bridge connector inherits/drives the parent
 * wallet. Standalone → the app's own connectors. The bridge is intentionally
 * the ONLY connector when embedded — surfacing injected / WalletConnect inside
 * a sandboxed iframe doesn't work (no popup, no extension injection).
 *
 * `detectTangleCloudParentOrigin` + `parentBridgeConnector` stay exported for
 * apps that hand-roll the selection.
 */

export {
  detectTangleCloudParentOrigin,
  TANGLE_CLOUD_ORIGINS_DEFAULT,
} from './detectParentOrigin';

export {
  tangleBlueprintConnectors,
  type TangleBlueprintConnectorsOptions,
} from './tangleConnectors';

export {
  parentBridgeConnector,
  type ParentBridgeConnectorOptions,
} from './parentBridgeConnector';

export {
  ParentBridgeProvider,
  isRunningInIframe,
  type ParentBridgeOptions,
} from './parentBridgeProvider';

export {
  TANGLE_IFRAME_PROTOCOL_PREFIX,
  TANGLE_IFRAME_PROTOCOL_VERSION,
  NO_WALLET_ADDRESS,
  makeCorrelationId,
  type AccountChanged,
  type CallJobRequest,
  type ChainChanged,
  type ChainContext,
  type HandshakeAck,
  type HandshakeRequest,
  type IframeRequest,
  type JobInputs,
  type JobResultEvent,
  type JobResultStatus,
  type ParentMessage,
  type ReadAccountRequest,
  type ReadAccountResult,
  type ServiceContextBroadcast,
  type ServiceContextJob,
  type ServiceContextOperator,
  type SignMessageRequest,
  type SignMessageResult,
  type SignTransactionRequest,
  type SignTransactionResult,
  type SignTypedDataRequest,
  type SignTypedDataResult,
  type SwitchChainRequest,
  type SwitchChainResult,
} from './parentBridgeProtocol';
