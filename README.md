# @erp/configuration-contract

The single source of truth for the master-data / catalog configuration draft schema, shared across:
- **Erp-backend** (`github.com/sovanhere/Erp-backend`)
- **Erp-platform-onboarding** (`github.com/sovanhere/Erp-platform-onboarding`)

This package provides static TypeScript types and runtime Zod schemas for tenant configuration schemas, units of measure (UOMs), property definitions, product types, role definitions, location types, inventory configurations, and workflow/lifecycle definitions.

---

## ⚠️ Contract Change Policy

Schema changes in this repository **must be treated like an API contract change**:
- **Never make silent edits.**
- Every change requires a version bump, semantic tag (`vX.Y.Z`), and cross-repo review.
- Consumers **must pin to a specific git tag** (not a mutable branch like `main`) in their `package.json` so that updates across services are deliberate, coordinated, and testable.

> **Note on Validation Boundaries:**  
> This package validates static shapes and schema constraints. Graph-level compilation rules (e.g., reachability, cycles, effect/document-type compatibility) are intentionally kept backend-only in `ConfigurationCompiler`.

---

## 📦 Installation

This repository is public and can be installed directly as a pinned git dependency without requiring an npm token or private registry.

```bash
npm install git+https://github.com/sovanhere/erp-configuration-contract.git#v0.1.0
```

### In `package.json`:

```json
{
  "dependencies": {
    "@erp/configuration-contract": "git+https://github.com/sovanhere/erp-configuration-contract.git#v0.1.0",
    "zod": "^3.24.1"
  }
}
```

> **Build on Install (`prepare` script):**  
> `package.json` defines a `"prepare": "npm run build"` lifecycle script. When installed via Git, npm runs the TypeScript compiler (`tsc`) automatically on `npm install`, generating `dist/` without checking build artifacts into source control.

---

## 🚀 Usage

### Runtime Validation with Zod

```ts
import {
  configurationDraftSchema,
  workflowSchema
} from "@erp/configuration-contract";

const result = configurationDraftSchema.safeParse(inputData);
if (!result.success) {
  console.error("Configuration schema validation errors:", result.error.format());
}
```

### Static TypeScript Types

```ts
import type {
  ConfigurationDraft,
  UnitOfMeasure,
  PropertyDefinition,
  ProductType,
  RoleDefinition,
  LocationType,
  WorkflowDefinition
} from "@erp/configuration-contract";
```

---

## 🔄 Migration

Refer to [MIGRATION.md](./MIGRATION.md) for step-by-step instructions on updating `Erp-backend` and `Erp-platform-onboarding` to consume this contract package.

---

## 🛠️ Development

```bash
# Install dependencies and build
npm install

# Compile TypeScript
npm run build

# Watch mode
npm run watch
```
