import type {
  BlueprintAppEntry,
  BlueprintAppResolvedView,
  BlueprintExperienceTier,
  BlueprintExternalAppTrust,
  BlueprintPublisher,
  BlueprintPublisherVerification,
  BlueprintSlugPolicy,
  BlueprintUiSurface,
} from './types';

const EXPERIENCE_TIER_LABELS: Record<BlueprintExperienceTier, string> = {
  generic: 'Protocol fallback',
  declarative: 'Declarative blueprint UI',
  'curated-module': 'Curated app module',
  'external-app': 'External app handoff',
};

const SLUG_POLICY_LABELS: Record<BlueprintSlugPolicy, string> = {
  reserved: 'Reserved slug',
  'publisher-scoped': 'Publisher-scoped slug',
  'public-requested': 'Public requested slug',
};

const SURFACE_LABELS: Record<BlueprintUiSurface, string> = {
  'generic-overview': 'Generic overview',
  'service-explorer': 'Service explorer',
  'service-console': 'Service console',
  'actions-panel': 'Actions panel',
  resources: 'Resources',
  chat: 'Chat',
  vaults: 'Vaults',
  metrics: 'Metrics',
  permissions: 'Permissions',
};

const PUBLISHER_VERIFICATION_LABELS: Record<
  BlueprintPublisherVerification,
  string
> = {
  'first-party': 'First-party publisher',
  verified: 'Verified publisher',
  unverified: 'Unverified publisher',
};

const EXTERNAL_APP_TRUST_LABELS: Record<BlueprintExternalAppTrust, string> = {
  trusted: 'Trusted external app',
  restricted: 'Restricted external app',
};

export function buildCanonicalBlueprintSlug(entry: BlueprintAppEntry): string {
  if (entry.canonicalSlug) {
    return entry.canonicalSlug;
  }

  if (entry.slugPolicy === 'reserved' || !entry.publisher.namespace) {
    return entry.slug;
  }

  return `@${entry.publisher.namespace}/${entry.slug}`;
}

export function resolveBlueprintAppView(
  entry: BlueprintAppEntry,
): BlueprintAppResolvedView {
  return {
    slug: entry.slug,
    canonicalSlug: buildCanonicalBlueprintSlug(entry),
    blueprintId: entry.blueprintId,
    publisher: entry.publisher,
    tier: entry.tier,
    slugPolicy: entry.slugPolicy,
    manifest: entry.manifest,
    module: entry.module,
    fallbackEnabled: true,
  };
}

export function toBlueprintAppEntry(
  view: BlueprintAppResolvedView,
): BlueprintAppEntry {
  return {
    slug: view.slug,
    canonicalSlug: view.canonicalSlug,
    blueprintId: view.blueprintId,
    publisher: view.publisher,
    tier: view.tier,
    slugPolicy: view.slugPolicy,
    manifest: view.manifest,
    module: view.module,
  };
}

export function getBlueprintExperienceTierLabel(
  tier: BlueprintExperienceTier,
): string {
  return EXPERIENCE_TIER_LABELS[tier];
}

export function getBlueprintSlugPolicyLabel(policy: BlueprintSlugPolicy): string {
  return SLUG_POLICY_LABELS[policy];
}

export function getBlueprintSurfaceLabel(surface: BlueprintUiSurface): string {
  return SURFACE_LABELS[surface];
}

export function getBlueprintPublisherVerificationLabel(
  verification: BlueprintPublisherVerification,
): string {
  return PUBLISHER_VERIFICATION_LABELS[verification];
}

export function getExternalAppTrustLabel(
  trust: BlueprintExternalAppTrust,
): string {
  return EXTERNAL_APP_TRUST_LABELS[trust];
}

export function isVerifiedBlueprintPublisher(
  publisher: BlueprintPublisher,
): boolean {
  return (
    publisher.verification === 'first-party' ||
    publisher.verification === 'verified'
  );
}

export function canPublisherClaimSlug(
  slug: string,
  publisher?: Pick<BlueprintPublisher, 'namespace' | 'verification'>,
  reservedSlugs: Set<string> = new Set(),
): boolean {
  if (reservedSlugs.has(slug)) {
    return false;
  }

  return (
    publisher?.namespace !== undefined &&
    publisher.namespace.trim().length > 0 &&
    (publisher.verification === 'verified' ||
      publisher.verification === 'first-party')
  );
}

export function isTrustedExternalAppHost(
  host: string,
  trustedHosts: readonly string[] = [],
): boolean {
  const normalizedHost = host.trim().toLowerCase();

  return trustedHosts.some(
    (trustedHost) =>
      normalizedHost === trustedHost || normalizedHost.endsWith(`.${trustedHost}`),
  );
}

export function getBlueprintPath(view: BlueprintAppResolvedView): string {
  if (view.tier === 'curated-module' || view.tier === 'external-app') {
    return `/blueprints/${view.canonicalSlug}`;
  }

  if (view.blueprintId !== undefined) {
    return `/blueprints/${view.blueprintId.toString()}`;
  }

  return `/blueprints/${view.slug}`;
}

export function getBlueprintServicePath(
  view: BlueprintAppResolvedView,
  serviceId: string,
): string {
  if (view.tier === 'curated-module' || view.tier === 'external-app') {
    return `${getBlueprintPath(view)}/${serviceId}`;
  }

  return `${getBlueprintPath(view)}/services/${serviceId}`;
}

export function sanitizeBlueprintSlugPart(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function deriveBlueprintRequestedSlug(
  blueprint: Pick<{ name: string; author: string; id: bigint }, 'name' | 'author' | 'id'>,
): string {
  const fromName = sanitizeBlueprintSlugPart(blueprint.name);
  if (fromName.length > 0) {
    return fromName;
  }

  const fromAuthor = sanitizeBlueprintSlugPart(blueprint.author);
  if (fromAuthor.length > 0) {
    return `${fromAuthor}-${blueprint.id.toString()}`;
  }

  return `blueprint-${blueprint.id.toString()}`;
}
