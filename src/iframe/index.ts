/**
 * Tangle Cloud iframe SDK — thin renderer for marketplace blueprints.
 *
 * Use this when building a blueprint UI that will be embedded by the
 * Tangle Cloud dapp. The SDK ships wallet + service-context state
 * subscriptions and a `callJob` helper, all driven by the parent dapp
 * over postMessage. The iframe never imports wagmi, never holds a wallet,
 * never touches the chain.
 *
 * Quick start:
 *
 *   import { TangleIframeProvider, useTangleWallet, useCallJob }
 *     from '@tangle-network/blueprint-iframe-sdk';
 *
 *   <TangleIframeProvider appId="llm-inference">
 *     <App />
 *   </TangleIframeProvider>
 *
 *   function PromptBar() {
 *     const { address } = useTangleWallet();
 *     const { call, invocation } = useCallJob();
 *     return <button onClick={() => call({ jobIndex: 0, inputs: { prompt: '...' }, stream: true })} />;
 *   }
 *
 * Two execution modes auto-detected:
 *
 *   - **bridge** (production): real Tangle Cloud parent. Wallet + service
 *     state flows in via postMessage. `callJob` is forwarded upstream and
 *     the parent handles RFQ + signing + submission.
 *   - **dev** (standalone): no parent detected. Hook surface is identical;
 *     drive state via the testing harness or a `<TangleParentHarness>`
 *     wrapped around the provider with `mode="bridge"` + the harness
 *     origin.
 *
 * The mode is decided once at mount and doesn't switch mid-session.
 */

export {
  TangleIframeProvider,
  useTangleIframeContext,
  TANGLE_CLOUD_ORIGINS_DEFAULT,
} from './TangleIframeProvider';

export {
  useTangleWallet,
  useTangleService,
  useCallJob,
  useTangleAddress,
  useTangleReady,
  useTangleMode,
  useChainContext,
  useTanglePublicClient,
} from './hooks';

export {
  TangleIframeClient,
  type ClientEventMap,
  type JobInvocation,
  type ServiceSnapshot,
  type TangleIframeClientOptions,
  type WalletSnapshot,
} from './tangleIframeClient';

// Re-export the protocol types so consumers can build their own clients
// against the same wire format if they want to skip the React layer.
export type {
  CallJobRequest,
  ChainContext,
  JobInputs,
  JobResultEvent,
  JobResultStatus,
  ServiceContextBroadcast,
  ServiceContextJob,
  ServiceContextOperator,
  SignTypedDataRequest,
  SignTypedDataResult,
} from '../wallet/parentBridgeProtocol';
