export { B as BlueprintHostHero, a as BlueprintHostHeroProps, b as BlueprintHostPanel, c as BlueprintHostPanelProps } from './BlueprintHostPanel-6iVEh-f1.js';
import 'react/jsx-runtime';
import 'react';
import 'class-variance-authority/types';
import 'class-variance-authority';

type BlueprintAppVisibility = 'first-party' | 'third-party';
type BlueprintPublisherVerification = 'first-party' | 'verified' | 'unverified';
type BlueprintExperienceTier = 'generic' | 'declarative' | 'curated-module' | 'external-app';
type BlueprintSlugPolicy = 'reserved' | 'publisher-scoped' | 'public-requested';
type BlueprintUiSurface = 'generic-overview' | 'service-explorer' | 'service-console' | 'actions-panel' | 'resources' | 'chat' | 'vaults' | 'metrics' | 'permissions';
type BlueprintResourceRoute = 'bots' | 'agents' | 'runs' | 'vault' | 'chat' | 'custom';
type BlueprintPermissionScope = 'blueprint' | 'service' | 'resource';
type BlueprintExternalAppMode = 'link' | 'iframe';
type BlueprintExternalAppTrust = 'trusted' | 'restricted';
type BlueprintPublisher = {
    label: string;
    namespace?: string;
    visibility: BlueprintAppVisibility;
    verification: BlueprintPublisherVerification;
};
type BlueprintResourceModel = {
    serviceNoun: string;
    resourceNoun: string;
    resourceRoute?: BlueprintResourceRoute;
};
type BlueprintPermissionDescriptor = {
    key: string;
    label: string;
    scope: BlueprintPermissionScope;
    description?: string;
};
type BlueprintExternalAppConfig = {
    url: string;
    mode: BlueprintExternalAppMode;
    label?: string;
    host: string;
    trust: BlueprintExternalAppTrust;
    reason?: string;
};
type BlueprintUiManifest = {
    displayName: string;
    tagline: string;
    description: string;
    surfaces: BlueprintUiSurface[];
    resources: BlueprintResourceModel;
    permissions?: BlueprintPermissionDescriptor[];
    externalApp?: BlueprintExternalAppConfig;
};
type BlueprintAppModuleBinding = {
    moduleId: string;
    status: 'active' | 'planned';
};
type BlueprintAppEntry = {
    slug: string;
    canonicalSlug?: string;
    blueprintId?: bigint;
    publisher: BlueprintPublisher;
    tier: BlueprintExperienceTier;
    slugPolicy: BlueprintSlugPolicy;
    manifest: BlueprintUiManifest;
    module?: BlueprintAppModuleBinding;
};
type BlueprintAppResolvedView = {
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

declare function buildCanonicalBlueprintSlug(entry: BlueprintAppEntry): string;
declare function resolveBlueprintAppView(entry: BlueprintAppEntry): BlueprintAppResolvedView;
declare function toBlueprintAppEntry(view: BlueprintAppResolvedView): BlueprintAppEntry;
declare function getBlueprintExperienceTierLabel(tier: BlueprintExperienceTier): string;
declare function getBlueprintSlugPolicyLabel(policy: BlueprintSlugPolicy): string;
declare function getBlueprintSurfaceLabel(surface: BlueprintUiSurface): string;
declare function getBlueprintPublisherVerificationLabel(verification: BlueprintPublisherVerification): string;
declare function getExternalAppTrustLabel(trust: BlueprintExternalAppTrust): string;
declare function isVerifiedBlueprintPublisher(publisher: BlueprintPublisher): boolean;
declare function canPublisherClaimSlug(slug: string, publisher?: Pick<BlueprintPublisher, 'namespace' | 'verification'>, reservedSlugs?: Set<string>): boolean;
declare function isTrustedExternalAppHost(host: string, trustedHosts?: readonly string[]): boolean;
declare function getBlueprintPath(view: BlueprintAppResolvedView): string;
declare function getBlueprintServicePath(view: BlueprintAppResolvedView, serviceId: string): string;
declare function sanitizeBlueprintSlugPart(value: string): string;
declare function deriveBlueprintRequestedSlug(blueprint: Pick<{
    name: string;
    author: string;
    id: bigint;
}, 'name' | 'author' | 'id'>): string;

export { type BlueprintAppEntry, type BlueprintAppModuleBinding, type BlueprintAppResolvedView, type BlueprintAppVisibility, type BlueprintExperienceTier, type BlueprintExternalAppConfig, type BlueprintExternalAppMode, type BlueprintExternalAppTrust, type BlueprintPermissionDescriptor, type BlueprintPermissionScope, type BlueprintPublisher, type BlueprintPublisherVerification, type BlueprintResourceModel, type BlueprintResourceRoute, type BlueprintSlugPolicy, type BlueprintUiManifest, type BlueprintUiSurface, buildCanonicalBlueprintSlug, canPublisherClaimSlug, deriveBlueprintRequestedSlug, getBlueprintExperienceTierLabel, getBlueprintPath, getBlueprintPublisherVerificationLabel, getBlueprintServicePath, getBlueprintSlugPolicyLabel, getBlueprintSurfaceLabel, getExternalAppTrustLabel, isTrustedExternalAppHost, isVerifiedBlueprintPublisher, resolveBlueprintAppView, sanitizeBlueprintSlugPart, toBlueprintAppEntry };
