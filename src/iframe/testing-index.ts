/**
 * Testing-only utilities for the iframe SDK. Imported from
 * `@tangle-network/blueprint-ui/iframe/testing` so production bundles don't
 * pull in the debug panel + mock factories.
 */

export {
  TangleParentHarness,
  HARNESS_ORIGIN,
  mockWallet,
  mockServiceContext,
  type CallJobHandler,
  type MockServiceInput,
  type MockWalletInput,
} from './testing';
