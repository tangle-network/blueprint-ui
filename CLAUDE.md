# Project Instructions

## Mission
`@tangle/blueprint-ui` is a shared UI and infrastructure package for multiple consumers. Treat it as a stable library, not an app.

## Scope
Include:
- Reusable, app-agnostic components and layout primitives
- Chain/contract helpers, shared hooks, and shared stores
- Cross-app utilities that reduce duplication

Exclude:
- Product-specific route logic, copy, or feature orchestration
- Agent chat/session/terminal UX (belongs in `@tangle/agent-ui`)
- Any direct dependency on a consuming app's source tree

## Public API Discipline
- `src/index.ts`, `src/components.ts`, and `src/preset.ts` exports are the public contract.
- Prefer additive changes; avoid removing/renaming exports without a migration path.
- Keep TypeScript types explicit and stable; avoid weakening types to `any`.
- Avoid side effects at module import time.

## Dependency Rules
- Prefer peer dependencies for framework/runtime packages.
- Add runtime dependencies only when justified by shared-package needs.
- Do not import optional tooling into core modules unless guarded.

## Styling and UX
- Keep styling token-driven and theme-safe.
- Avoid hardcoded product branding, URLs, or app-specific wording.
- Ensure components are keyboard accessible and include required ARIA attributes.

## Quality Bar for Changes
- Every new shared primitive/hook should be reused by at least two consumer contexts, or have clear near-term reuse intent.
- If duplicated code appears across consuming apps (roughly 20+ lines), extract to this package when it is app-agnostic.
- Keep files focused; split large mixed-responsibility modules.

## Change Checklist
Before merging:
1. Confirm scope fits shared-package boundaries.
2. Verify exports are intentional and typed.
3. Ensure no app-specific assumptions leaked in.
4. Validate consumers still compile and run with the change.
