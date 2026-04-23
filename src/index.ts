/**
 * @tangle-network/blueprint-ui — shared utilities, stores, contracts, hooks, and types
 * for Tangle blueprint UIs.
 */

// ── Utils ──
export { cn } from './utils';
export { resolveOperatorRpc } from './utils/resolveOperatorRpc';
export { createTangleTransports, defaultConnectKitOptions, getTangleWalletChains, tangleWalletChains } from './utils/web3';
export { bpThemeTokens } from './preset';

// ── Stores ──
export { serializeWithBigInt, deserializeWithBigInt, persistedAtom } from './stores/persistedAtom';
export type { SessionEntry } from './stores/session';
export { sessionMapStore, getSession, setSession, removeSession, gcSessions } from './stores/session';
export type { TrackedTx } from './stores/txHistory';
export { txListStore, pendingCount, addTx, updateTx, clearTxs } from './stores/txHistory';
export type { OperatorInfo, InfraConfig } from './stores/infra';
export { infraStore, updateInfra, getInfra } from './stores/infra';
export type { Theme } from './stores/theme';
export { kTheme, DEFAULT_THEME, themeStore, themeIsDark, toggleTheme } from './stores/theme';

// ── Contracts ──
export { tangleJobsAbi, tangleServicesAbi, tangleOperatorsAbi } from './contracts/abi';
export type { CoreAddresses, NetworkConfig } from './contracts/chains';
export {
  resolveRpcUrl,
  createTangleLocalChain,
  rpcUrl,
  tangleLocal,
  tangleTestnet,
  tangleMainnet,
  allTangleChains,
  mainnet,
  configureNetworks,
  getNetworks,
} from './contracts/chains';
export {
  selectedChainIdStore,
  sanitizeSelectedChainId,
  publicClientStore,
  getPublicClient,
  publicClient,
  getAddresses,
} from './contracts/publicClient';
export { encodeJobArgs } from './contracts/generic-encoder';

// ── Blueprints ──
export type {
  JobCategory,
  JobFieldDef,
  AbiContextParam,
  JobDefinition,
  BlueprintDefinition,
} from './blueprints/registry';
export {
  registerBlueprint,
  getBlueprint,
  getAllBlueprints,
  getBlueprintJobs,
  getJobById,
} from './blueprints/registry';

// ── Blueprint Host ──
export type {
  BlueprintAppVisibility,
  BlueprintPublisherVerification,
  BlueprintExperienceTier,
  BlueprintSlugPolicy,
  BlueprintUiSurface,
  BlueprintResourceRoute,
  BlueprintPermissionScope,
  BlueprintExternalAppMode,
  BlueprintExternalAppTrust,
  BlueprintPublisher,
  BlueprintResourceModel,
  BlueprintPermissionDescriptor,
  BlueprintExternalAppConfig,
  BlueprintUiManifest,
  BlueprintAppModuleBinding,
  BlueprintAppEntry,
  BlueprintAppResolvedView,
} from './host';
export {
  buildCanonicalBlueprintSlug,
  resolveBlueprintAppView,
  toBlueprintAppEntry,
  getBlueprintExperienceTierLabel,
  getBlueprintSlugPolicyLabel,
  getBlueprintSurfaceLabel,
  getBlueprintPublisherVerificationLabel,
  getExternalAppTrustLabel,
  isVerifiedBlueprintPublisher,
  canPublisherClaimSlug,
  isTrustedExternalAppHost,
  getBlueprintPath,
  getBlueprintServicePath,
  sanitizeBlueprintSlugPart,
  deriveBlueprintRequestedSlug,
} from './host';
export type { BlueprintHostHeroProps, BlueprintHostPanelProps } from './host';
export { BlueprintHostHero, BlueprintHostPanel } from './host';

// ── Hooks ──
export type { DiscoveredOperator } from './hooks/useOperators';
export { useOperators } from './hooks/useOperators';
export type { JobFormState } from './hooks/useJobForm';
export { useJobForm } from './hooks/useJobForm';
export type { JobQuote, UseJobPriceResult, JobPriceEntry, UseJobPricesResult } from './hooks/useJobPrice';
export { useJobPrice, useJobPrices } from './hooks/useJobPrice';
export type { ServiceInfo } from './hooks/useServiceValidation';
export { useServiceValidation } from './hooks/useServiceValidation';
export { useAuthenticatedFetch } from './hooks/useAuthenticatedFetch';
export type { OperatorQuote, UseQuotesResult } from './hooks/useQuotes';
export { solvePoW, formatCost, useQuotes } from './hooks/useQuotes';
export type { SubmitJobOpts, JobSubmitStatus } from './hooks/useSubmitJob';
export { useSubmitJob } from './hooks/useSubmitJob';
export { useSessionAuth } from './hooks/useSessionAuth';
export type { ProvisionPhase, ProvisionStatus } from './hooks/useProvisionProgress';
export { getPhaseLabel, isTerminalPhase, useProvisionProgress } from './hooks/useProvisionProgress';
export { useThemeValue } from './hooks/useThemeValue';
export type { UseSidecarAuthOptions, SidecarAuth } from './hooks/useSidecarAuth';
export { useSidecarAuth } from './hooks/useSidecarAuth';
export { useWagmiSidecarAuth } from './hooks/useWagmiSidecarAuth';
export { useWalletEthBalance } from './hooks/useWalletEthBalance';
