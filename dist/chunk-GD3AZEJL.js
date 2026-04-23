// src/host/resolver.ts
var EXPERIENCE_TIER_LABELS = {
  generic: "Protocol fallback",
  declarative: "Declarative blueprint UI",
  "curated-module": "Curated app module",
  "external-app": "External app handoff"
};
var SLUG_POLICY_LABELS = {
  reserved: "Reserved slug",
  "publisher-scoped": "Publisher-scoped slug",
  "public-requested": "Public requested slug"
};
var SURFACE_LABELS = {
  "generic-overview": "Generic overview",
  "service-explorer": "Service explorer",
  "service-console": "Service console",
  "actions-panel": "Actions panel",
  resources: "Resources",
  chat: "Chat",
  vaults: "Vaults",
  metrics: "Metrics",
  permissions: "Permissions"
};
var PUBLISHER_VERIFICATION_LABELS = {
  "first-party": "First-party publisher",
  verified: "Verified publisher",
  unverified: "Unverified publisher"
};
var EXTERNAL_APP_TRUST_LABELS = {
  trusted: "Trusted external app",
  restricted: "Restricted external app"
};
function buildCanonicalBlueprintSlug(entry) {
  if (entry.canonicalSlug) {
    return entry.canonicalSlug;
  }
  if (entry.slugPolicy === "reserved" || !entry.publisher.namespace) {
    return entry.slug;
  }
  return `@${entry.publisher.namespace}/${entry.slug}`;
}
function resolveBlueprintAppView(entry) {
  return {
    slug: entry.slug,
    canonicalSlug: buildCanonicalBlueprintSlug(entry),
    blueprintId: entry.blueprintId,
    publisher: entry.publisher,
    tier: entry.tier,
    slugPolicy: entry.slugPolicy,
    manifest: entry.manifest,
    module: entry.module,
    fallbackEnabled: true
  };
}
function toBlueprintAppEntry(view) {
  return {
    slug: view.slug,
    canonicalSlug: view.canonicalSlug,
    blueprintId: view.blueprintId,
    publisher: view.publisher,
    tier: view.tier,
    slugPolicy: view.slugPolicy,
    manifest: view.manifest,
    module: view.module
  };
}
function getBlueprintExperienceTierLabel(tier) {
  return EXPERIENCE_TIER_LABELS[tier];
}
function getBlueprintSlugPolicyLabel(policy) {
  return SLUG_POLICY_LABELS[policy];
}
function getBlueprintSurfaceLabel(surface) {
  return SURFACE_LABELS[surface];
}
function getBlueprintPublisherVerificationLabel(verification) {
  return PUBLISHER_VERIFICATION_LABELS[verification];
}
function getExternalAppTrustLabel(trust) {
  return EXTERNAL_APP_TRUST_LABELS[trust];
}
function isVerifiedBlueprintPublisher(publisher) {
  return publisher.verification === "first-party" || publisher.verification === "verified";
}
function canPublisherClaimSlug(slug, publisher, reservedSlugs = /* @__PURE__ */ new Set()) {
  if (reservedSlugs.has(slug)) {
    return false;
  }
  return publisher?.namespace !== void 0 && publisher.namespace.trim().length > 0 && (publisher.verification === "verified" || publisher.verification === "first-party");
}
function isTrustedExternalAppHost(host, trustedHosts = []) {
  const normalizedHost = host.trim().toLowerCase();
  return trustedHosts.some(
    (trustedHost) => normalizedHost === trustedHost || normalizedHost.endsWith(`.${trustedHost}`)
  );
}
function getBlueprintPath(view) {
  if (view.tier === "curated-module" || view.tier === "external-app") {
    return `/blueprints/${view.canonicalSlug}`;
  }
  if (view.blueprintId !== void 0) {
    return `/blueprints/${view.blueprintId.toString()}`;
  }
  return `/blueprints/${view.slug}`;
}
function getBlueprintServicePath(view, serviceId) {
  if (view.tier === "curated-module" || view.tier === "external-app") {
    return `${getBlueprintPath(view)}/${serviceId}`;
  }
  return `${getBlueprintPath(view)}/services/${serviceId}`;
}
function sanitizeBlueprintSlugPart(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
}
function deriveBlueprintRequestedSlug(blueprint) {
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

// src/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/card.tsx
import { jsx } from "react/jsx-runtime";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn("glass-card rounded-xl text-bp-elements-textPrimary", className),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "card-header", className: cn("flex flex-col gap-1.5 p-6", className), ...props });
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "card-title", className: cn("leading-none font-semibold font-display", className), ...props });
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "card-description", className: cn("text-bp-elements-textSecondary text-sm", className), ...props });
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "card-content", className: cn("px-6 pb-6", className), ...props });
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "card-footer", className: cn("flex items-center px-6 pb-6", className), ...props });
}

// src/components/ui/badge.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
var badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-data uppercase tracking-wider w-fit whitespace-nowrap shrink-0 gap-1 transition-colors",
  {
    variants: {
      variant: {
        default: "border-bp-elements-borderColor bg-bp-elements-background-depth-3 text-bp-elements-textPrimary",
        secondary: "border-bp-elements-dividerColor bg-bp-elements-background-depth-2 text-bp-elements-textSecondary",
        destructive: "border-crimson-500/20 bg-crimson-500/10 text-bp-elements-icon-error",
        success: "border-teal-500/20 bg-teal-500/10 text-bp-elements-icon-success",
        outline: "text-bp-elements-textPrimary border-bp-elements-borderColor bg-transparent",
        accent: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400",
        amber: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        running: "border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400",
        stopped: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
        cold: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx2(Comp, { "data-slot": "badge", className: cn(badgeVariants({ variant }), className), ...props });
}

// src/components/ui/button.tsx
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx3 } from "react/jsx-runtime";
var buttonVariants = cva2(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium font-display transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bp-elements-background-depth-1',
  {
    variants: {
      variant: {
        default: "bg-violet-600 text-white font-semibold hover:bg-violet-500 shadow-[0_0_20px_rgba(142,89,255,0.25)] hover:shadow-[0_0_30px_rgba(142,89,255,0.35)]",
        destructive: "bg-crimson-500/15 text-crimson-400 border border-crimson-500/20 hover:bg-crimson-500/25 hover:border-crimson-500/30",
        outline: "glass glass-hover text-bp-elements-textPrimary",
        secondary: "bg-bp-elements-background-depth-3 text-bp-elements-textSecondary border border-bp-elements-borderColor hover:bg-bp-elements-background-depth-4 hover:text-bp-elements-textPrimary",
        ghost: "text-bp-elements-textSecondary hover:text-bp-elements-textPrimary hover:bg-bp-elements-item-backgroundHover",
        link: "text-violet-700 dark:text-violet-400 underline-offset-4 hover:underline",
        success: "bg-teal-600/15 text-teal-400 border border-teal-500/20 hover:bg-teal-600/25"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-11 rounded-xl px-7 text-base has-[>svg]:px-5",
        icon: "size-9",
        "icon-sm": "size-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot2 : "button";
  return /* @__PURE__ */ jsx3(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/host/components/BlueprintHostHero.tsx
import { jsx as jsx4, jsxs } from "react/jsx-runtime";
function BlueprintHostHero({
  title,
  tagline,
  description,
  badges = [],
  actions = [],
  children,
  className
}) {
  return /* @__PURE__ */ jsxs(Card, { className: cn("rounded-3xl border-bp-elements-borderColor/70 bg-bp-elements-background-depth-2", className), children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-4", children: [
      badges.length > 0 ? /* @__PURE__ */ jsx4("div", { className: "flex flex-wrap gap-2", children: badges.map((badge) => /* @__PURE__ */ jsx4(Badge, { variant: "secondary", children: badge }, badge)) }) : null,
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx4(CardTitle, { className: "text-3xl", children: title }),
        tagline ? /* @__PURE__ */ jsx4(CardDescription, { className: "text-base text-bp-elements-textPrimary/80", children: tagline }) : null
      ] }),
      description ? /* @__PURE__ */ jsx4("p", { className: "max-w-3xl text-sm leading-6 text-bp-elements-textSecondary", children: description }) : null
    ] }),
    (actions.length > 0 || children) && /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      actions.length > 0 ? /* @__PURE__ */ jsx4("div", { className: "flex flex-wrap gap-3", children: actions.map((action) => {
        const button = /* @__PURE__ */ jsx4(
          Button,
          {
            variant: action.variant ?? "default",
            onClick: action.onClick,
            disabled: action.disabled,
            children: action.label
          },
          action.label
        );
        return action.href ? /* @__PURE__ */ jsx4("a", { href: action.href, children: button }, action.label) : button;
      }) }) : null,
      children
    ] })
  ] });
}

// src/host/components/BlueprintHostPanel.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
function BlueprintHostPanel({
  title,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs2(Card, { className: cn("rounded-3xl border-bp-elements-borderColor/70 bg-bp-elements-background-depth-2", className), children: [
    /* @__PURE__ */ jsx5(CardHeader, { children: /* @__PURE__ */ jsx5(CardTitle, { className: "text-xl", children: title }) }),
    /* @__PURE__ */ jsx5(CardContent, { children })
  ] });
}

export {
  cn,
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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  badgeVariants,
  Badge,
  buttonVariants,
  Button,
  BlueprintHostHero,
  BlueprintHostPanel
};
//# sourceMappingURL=chunk-GD3AZEJL.js.map