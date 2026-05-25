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
 * Usage in an iframe app's wagmi config:
 *
 *   import {
 *     detectTangleCloudParentOrigin,
 *     parentBridgeConnector,
 *   } from '@tangle-network/blueprint-ui/wallet';
 *
 *   const parent = detectTangleCloudParentOrigin();
 *   const config = createConfig(
 *     parent !== null
 *       ? { ...getDefaultConfig({...}), connectors: [
 *           parentBridgeConnector({ parentOrigin: parent, appId: 'my-app' }),
 *         ] }
 *       : getDefaultConfig({...}),
 *   );
 *
 * The bridge is intentionally the ONLY connector when running inside the
 * dapp — surfacing injected / WalletConnect / Coinbase inside a sandboxed
 * iframe doesn't work (no popup, no extension injection) and would just
 * confuse operators.
 */

export {
  detectTangleCloudParentOrigin,
  TANGLE_CLOUD_ORIGINS_DEFAULT,
} from './detectParentOrigin';

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
