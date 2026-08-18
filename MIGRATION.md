# Migration guide

## 1. Publish/link the package
Depending on your existing tooling, either:
- Add to an npm/pnpm/yarn workspace (`packages/configuration-contract`) if both
  repos already live in — or can be moved into — a monorepo, or
- Publish to a private npm registry and version it (`0.1.0` -> bump on any
  schema change; treat schema changes as you would an API contract change,
  with the same review rigor).

## 2. Backend (Erp-backend)
Replace the contents of `src/modules/configuration/configuration-contract.ts`
and `src/shared/workflow/contract.ts` with re-exports:

```ts
// src/modules/configuration/configuration-contract.ts
export * from "@erp/configuration-contract";
```

Keep the file so existing imports elsewhere in the backend
(`ConfigurationCompiler`, `ConfigurationService`, etc.) don't need path
changes — only the definitions move.

## 3. Frontend (Erp-platform-onboarding)
In `src/lib/template-types.ts`:
- Delete the hand-written enums/interfaces that now live in the shared
  package (`UnitOfMeasure`, `PropertyDefinition`, `ProductType`,
  `RoleDefinition`, `LocationType`, `InventoryConfiguration`,
  `ConfigurationV2`'s field types, the workflow/lifecycle types, and all the
  `as const` enum arrays).
- Re-export or alias what the UI components already import by name, backed
  by `@erp/configuration-contract`'s inferred types, e.g.:

  ```ts
  import type {
    ConfigurationDraft as ConfigurationV2,
    UnitOfMeasure,
    PropertyDefinition,
    ProductType,
    RoleDefinition,
    LocationType
  } from "@erp/configuration-contract";
  ```

- Rewrite `validateTemplateConfiguration` to run the shared Zod schema
  first (`configurationDraftSchema.safeParse(config)`), map any Zod issues
  into `errorsBySection` by inspecting `issue.path[0]` (e.g. `"uoms"` ->
  the `uoms` section, `"productTypes"` -> `product_types`), and keep only
  the genuinely structural/UX-specific checks that aren't expressible as a
  static schema rule (e.g. "at least one non-warehouse stock-eligible
  location type", which depends on cross-referencing two array entries, not
  just shape).
- **Do not** port the ~15 workflow/lifecycle graph rules (reachability,
  cycles, effect/document-type compatibility, etc.) into this file at all.
  Those live only in `ConfigurationCompiler` on the backend. Before a draft
  moves past "review", call the backend's `validate()` endpoint
  (`POST /platform/v1/tenants/:tenantId/configurations/:version/validate`,
  or the template-equivalent validate action) and merge its returned error
  codes into `errorsBySection` the same way as the Zod issues above. This
  makes the backend compiler the single, authoritative source for anything
  beyond static shape — exactly the way it already is for onboarding.

## 4. Guardrail against future drift
Add a CI check in `Erp-platform-onboarding` (or wherever templates are
authored) that runs a fixture draft through both the shared schema and a
live call to the backend's `/validate` endpoint, asserting they agree. This
catches the next version of this exact problem — someone adding a rule to
`ConfigurationCompiler` without updating anything client-side — as soon as
it happens, not the next time someone audits it by hand.
