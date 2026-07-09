---
description: "GraphQL and Hasura patterns for ArtBot data queries"
globs: "**/Data/**,**/generated/**,**/codegen.ts"
alwaysApply: false
---

# GraphQL & Hasura Patterns

## Endpoint

- Public Hasura: `https://data.artblocks.io/v1/graphql` (hardcoded in `queryGraphQL.ts` and `codegen.ts`)
- Optional auth: `HASURA_GRAPHQL_ADMIN_SECRET` → `x-hasura-admin-secret`
- **One client only** — there is no separate Arbitrum Hasura endpoint/client in this repo

## Query Files

Define documents under `src/Data/graphql/`:

```graphql
fragment ProjectDetail on projects_metadata {
  id
  project_id
  name
  artist_name
  contract_address
  invocations
  max_invocations
}
```

## Code Generation

```bash
yarn codegen
```

Writes `generated/graphql.ts` (gitignored). `postinstall` and pre-commit also run codegen. Import generated types/documents from there.

## Query Wrapper Pattern

Wrappers live in `src/Data/queryGraphQL.ts` (urql, `requestPolicy: 'network-only'`).

```typescript
export async function getProject(
  projectId: number,
  contractAddress?: string
): Promise<ProjectDetailFragment> {
  // builds Hasura id, queries, throws if missing
}
```

Token IDs in Hasura are typically `{contractAddress}-{tokenId}` where tokenId encodes invocation + project number × 1e6.

## Pagination

Large lists use 1000-item loops (`first` / `skip`) until a short page is returned — see `getAllProjects` and similar helpers.

## Multi-Chain Note

Hasura rows may include `chain_id` for Ethereum / Arbitrum / Base. That does **not** imply OpenSea Discord feeds cover those chains — stream filtering in `index.ts` is Ethereum-oriented. Do not document a phantom `arbitrumClient`.

## After Schema/Query Changes

1. Edit `.graphql`
2. `yarn codegen`
3. Update `queryGraphQL.ts` callers/types
4. Smoke with `yarn start` (CI uses `PRODUCTION_MODE=false`)
