export type BlueprintAppVisibility = 'first-party' | 'third-party';

export type BlueprintPublisherVerification =
  | 'first-party'
  | 'verified'
  | 'unverified';

export type BlueprintExperienceTier =
  | 'generic'
  | 'declarative'
  | 'curated-module'
  | 'external-app';

export type BlueprintSlugPolicy =
  | 'reserved'
  | 'publisher-scoped'
  | 'public-requested';

export type BlueprintUiSurface =
  | 'generic-overview'
  | 'service-explorer'
  | 'service-console'
  | 'actions-panel'
  | 'resources'
  | 'chat'
  | 'vaults'
  | 'metrics'
  | 'permissions';

export type BlueprintResourceRoute =
  | 'bots'
  | 'agents'
  | 'runs'
  | 'vault'
  | 'chat'
  | 'custom';

export type BlueprintPermissionScope =
  | 'blueprint'
  | 'service'
  | 'resource';

export type BlueprintExternalAppMode = 'link' | 'iframe';
export type BlueprintExternalAppTrust = 'trusted' | 'restricted';

export type BlueprintPublisher = {
  label: string;
  namespace?: string;
  visibility: BlueprintAppVisibility;
  verification: BlueprintPublisherVerification;
};

export type BlueprintResourceModel = {
  serviceNoun: string;
  resourceNoun: string;
  resourceRoute?: BlueprintResourceRoute;
};

export type BlueprintPermissionDescriptor = {
  key: string;
  label: string;
  scope: BlueprintPermissionScope;
  description?: string;
};

export type BlueprintExternalAppConfig = {
  url: string;
  mode: BlueprintExternalAppMode;
  label?: string;
  host: string;
  trust: BlueprintExternalAppTrust;
  reason?: string;
};

export type BlueprintUiManifest = {
  displayName: string;
  tagline: string;
  description: string;
  surfaces: BlueprintUiSurface[];
  resources: BlueprintResourceModel;
  permissions?: BlueprintPermissionDescriptor[];
  externalApp?: BlueprintExternalAppConfig;
};

export type BlueprintAppModuleBinding = {
  moduleId: string;
  status: 'active' | 'planned';
};

export type BlueprintAppEntry = {
  slug: string;
  canonicalSlug?: string;
  blueprintId?: bigint;
  publisher: BlueprintPublisher;
  tier: BlueprintExperienceTier;
  slugPolicy: BlueprintSlugPolicy;
  manifest: BlueprintUiManifest;
  module?: BlueprintAppModuleBinding;
};

export type BlueprintAppResolvedView = {
  slug: string;
  canonicalSlug: string;
  blueprintId?: bigint;
  publisher: BlueprintPublisher;
  tier: BlueprintExperienceTier;
  slugPolicy: BlueprintSlugPolicy;
  manifest: BlueprintUiManifest;
  module?: BlueprintAppModuleBinding;
  fallbackEnabled: boolean;
};
