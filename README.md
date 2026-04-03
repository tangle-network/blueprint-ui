![Tangle Network Banner](https://raw.githubusercontent.com/tangle-network/tangle/refs/heads/main/assets/Tangle%20%20Banner.png)

<h1 align="center">@tangle-network/blueprint-ui</h1>

<p align="center"><em>Shared UI components, hooks, stores, and contract utilities for Tangle Blueprint applications.</em></p>

<p align="center">
  <a href="https://discord.com/invite/cv8EfJu3Tn"><img src="https://img.shields.io/discord/833784453251596298?label=Discord" alt="Discord"></a>
  <a href="https://t.me/tanglenet"><img src="https://img.shields.io/endpoint?color=neon&url=https%3A%2F%2Ftg.sumanjay.workers.dev%2Ftanglenet" alt="Telegram"></a>
</p>

---

A TypeScript/React package that provides the building blocks for blueprint UIs on the Tangle Network. The package now ships compiled ESM output plus a package-owned stylesheet so consuming apps can treat it like a normal library instead of compiling its source directly.

## What's Included

### Components

**UI Primitives** — Badge, Button, Card, Dialog, Input, Select, Separator, Skeleton, Table, Tabs, Textarea, Toggle

**Forms** — `FormField`, `BlueprintJobForm` (auto-generated from job definitions), `FormSummary`, `JobExecutionDialog`

**Layout / App Shell** — `AppDocument`, `AppFooter`, `AppToaster`, `Web3Shell`, `ChainSwitcher`, `ThemeToggle`

**Shared** — `Identicon` (blockie avatars), `TangleLogo`

**Motion** — `AnimatedPage`, `StaggerContainer`, `StaggerItem`

### Hooks

| Hook | Purpose |
|------|---------|
| `useSubmitJob` | Submit on-chain jobs with TX lifecycle tracking |
| `useJobForm` | Generic form state derived from `JobDefinition` |
| `useJobPrice` / `useJobPrices` | Fetch job pricing from operators |
| `useQuotes` | Operator quote aggregation with PoW challenge solving |
| `useOperators` | Discover active operators for a blueprint |
| `useServiceValidation` | Check service status and permissions |
| `useProvisionProgress` | Track provision lifecycle (events + polling) |
| `useSessionAuth` | PASETO session management |
| `useAuthenticatedFetch` | Fetch wrapper with automatic token refresh |
| `useThemeValue` | Resolve theme-dependent values |

### Stores (nanostores)

- **`infraStore`** — Blueprint ID, service ID, operator info
- **`sessionMapStore`** — PASETO sessions per operator
- **`txListStore`** — Transaction history tracking
- **`themeStore`** — Light/dark theme state
- **`persistedAtom`** — localStorage-backed atom with BigInt serialization

### Contract Utilities

- **ABI exports** — `tangleJobsAbi`, `tangleServicesAbi`, `tangleOperatorsAbi`
- **Chain configs** — Tangle Local, Testnet, Mainnet with RPC resolution
- **`publicClient`** — Singleton viem public client tied to selected chain
- **`encodeJobArgs`** — ABI-encode job arguments from form values using job field metadata
- **Web3 helpers** — `createTangleTransports`, `defaultConnectKitOptions`, `tangleWalletChains`, `resolveOperatorRpc`

## Package Boundaries

Use `@tangle-network/blueprint-ui` for:
- App-agnostic shell/layout primitives and design-system building blocks
- Shared chain/contract/provisioning hooks + stores
- Reusable cross-blueprint form and submission workflows

Keep in app-local code:
- Product-specific routes and copy
- Feature composition that is unique to a single app

### Blueprint Registry

- **`registerBlueprint`** / **`getBlueprint`** — Register and look up blueprint definitions
- **`JobDefinition`** — Declarative job schema with field types, ABI metadata, and categories

## Installation

```bash
npm install @tangle-network/blueprint-ui
# or
pnpm add @tangle-network/blueprint-ui
```

Package: https://www.npmjs.com/package/@tangle-network/blueprint-ui

## Publishing

Automated npm publishing is configured via GitHub Actions with npm Trusted Publishing (OIDC):
- Workflow: `.github/workflows/publish-npm.yml`
- Triggers:
  - Push tag `blueprint-ui-vX.Y.Z`
  - Manual `workflow_dispatch` with `version` input

No long-lived npm token is required once trusted publishing is configured.

Release flow:
1. Bump `package.json` version.
2. Push tag `blueprint-ui-v<same-version>`.
3. Workflow typechecks and runs `npm publish --provenance --access public`.

Trusted publishing setup (one-time in npm):
1. Open npm package settings for `@tangle-network/blueprint-ui`.
2. Configure a trusted publisher:
   - Provider: GitHub Actions
   - Owner: `tangle-network`
   - Repository: `blueprint-ui`
   - Workflow file: `publish-npm.yml`
   - Environment (if used): must match your workflow configuration

If npm does not allow configuring trusted publishing before first publish, do a one-time bootstrap publish with a short-lived token, then switch to trusted publishing and delete the token.

## Usage

```tsx
import '@tangle-network/blueprint-ui/styles.css';

// Import hooks and utilities from the main entry
import {
  useSubmitJob,
  useJobForm,
  encodeJobArgs,
  discoverOperatorsWithClient,
} from '@tangle-network/blueprint-ui';

// Import UI components from the /components entry
import { Button, Card, FormField } from '@tangle-network/blueprint-ui/components';
```

The package exports compiled files from `dist/`, so consumers do not need TypeScript-in-`node_modules` support anymore.

## Styling Setup

Import the package stylesheet once near your app entry:

```tsx
import '@tangle-network/blueprint-ui/styles.css';
```

That stylesheet provides:
- package-owned helper classes used by shared components such as `glass-card`, `font-display`, and `font-data`
- generated utility CSS for the shared components themselves
- a small compatibility layer that maps generic `--bp-*` tokens to `cloud` tokens by default

If you want the generic shared components to follow a different token family, you can either set the `--bp-*` variables directly or scope them with one of the helper classes:

```tsx
<div className="bp-tone-arena">
  <SomeBlueprintUiComponent />
</div>
```

## Migration Notes

- Preferred path: import `@tangle-network/blueprint-ui/styles.css` and stop scanning package source from the consumer app.
- Compatibility bridge: `src/` is still published for now, and `blueprintUiContentGlobs` remains available for apps migrating off the old source-scanning setup.
- The next cleanup step in consumer apps is usually removing custom Vite/Uno workarounds that existed only to compile or scan `blueprint-ui` source.

## Peer Dependencies

React 19, wagmi 3.x, viem 2.x, nanostores, Radix UI primitives, framer-motion, sonner, tailwind-merge, class-variance-authority. See `package.json` for the full list and version ranges.

## License

Licensed under either of [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0) or [MIT license](http://opensource.org/licenses/MIT), at your option.

---

## Key Concepts

**Blueprint UI** is a TypeScript/React component library for building user interfaces that interact with Tangle Network blueprints. It provides pre-built components for operator management, service requests, job submission, and payment flows.

**Tangle Network** is a decentralized infrastructure protocol where operators stake economic collateral to run verifiable services called blueprints.

**x402** is an HTTP-native micropayment protocol that enables per-request payments for blueprint services, integrated into the UI through payment hooks and components.

**Blueprint** is a deployable service specification on Tangle that defines computation, verification, and payment in a single package.

---

## Frequently Asked Questions

**What is @tangle-network/blueprint-ui?**
A React component library providing UI primitives, hooks, and contract utilities for building applications on Tangle Network.

**Do I need to build this package before using it?**
No. Published consumers use the compiled `dist/` output. Only this repo itself needs to run the build before publish.

**What framework does blueprint-ui support?**
React with TypeScript. Components use Radix UI primitives and Tailwind CSS for styling.

**How do I connect to Tangle contracts?**
Use the provided contract hooks and ABI utilities. The package includes typed bindings for Tangle's on-chain service registry, operator staking, and job submission.

**Can I use blueprint-ui for x402 payment flows?**
Yes. The hooks and utilities support x402 payment header construction for per-request micropayments to blueprint operators.
