![Tangle Network Banner](https://raw.githubusercontent.com/tangle-network/tangle/refs/heads/main/assets/Tangle%20%20Banner.png)

<h1 align="center">@tangle/blueprint-ui</h1>

<p align="center"><em>Shared UI components, hooks, stores, and contract utilities for Tangle Blueprint applications.</em></p>

<p align="center">
  <a href="https://discord.com/invite/cv8EfJu3Tn"><img src="https://img.shields.io/discord/833784453251596298?label=Discord" alt="Discord"></a>
  <a href="https://t.me/tanglenet"><img src="https://img.shields.io/endpoint?color=neon&url=https%3A%2F%2Ftg.sumanjay.workers.dev%2Ftanglenet" alt="Telegram"></a>
</p>

---

A TypeScript/React package that provides the building blocks for blueprint UIs on the Tangle Network. Designed to be consumed as a source dependency (no build step required) by apps using Vite or similar bundlers.

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

Use `@tangle/blueprint-ui` for:
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
## Installation

```bash
# As a git dependency (recommended for Tangle apps)
pnpm add github:tangle-network/blueprint-ui
```

## Usage

```tsx
// Import hooks and utilities from the main entry
import { useSubmitJob, useJobForm, encodeJobArgs } from '@tangle/blueprint-ui';

// Import UI components from the /components entry
import { Button, Card, FormField } from '@tangle/blueprint-ui/components';
```

The package uses source-level exports (`main` and `types` both point to `.ts` files). Your bundler must support TypeScript resolution — Vite works out of the box.

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

**What is @tangle/blueprint-ui?**
A React component library providing UI primitives, hooks, and contract utilities for building applications on Tangle Network.

**Do I need to build this package before using it?**
No. It is designed as a source dependency consumed directly by Vite or similar bundlers with no build step required.

**What framework does blueprint-ui support?**
React with TypeScript. Components use Radix UI primitives and Tailwind CSS for styling.

**How do I connect to Tangle contracts?**
Use the provided contract hooks and ABI utilities. The package includes typed bindings for Tangle's on-chain service registry, operator staking, and job submission.

**Can I use blueprint-ui for x402 payment flows?**
Yes. The hooks and utilities support x402 payment header construction for per-request micropayments to blueprint operators.
