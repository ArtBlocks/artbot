---
description: "GraphQL and Hasura patterns for ArtBot data queries"
alwaysApply: false
---

# GraphQL & Hasura Patterns

## Query File Location

Define all GraphQL queries in `.graphql` files under `src/Data/graphql/`:

```graphql
# src/Data/graphql/artbot-hasura-queries.graphql

fragment ProjectDetail on projects_metadata {
  id
  project_id
  name
  artist_name
  contract_address
  invocations
  max_invocations
}

query getProject($id: String!) {
  projects_metadata(where: { id: { _eq: $id } }) {
    ...ProjectDetail
  }
}
```

## Code Generation

After modifying `.graphql` files, regenerate TypeScript types:

```bash
yarn codegen
```

This generates types in `generated/graphql.ts`. Import from there:

```typescript
import {
  ProjectDetailFragment,
  GetProjectDocument,
  TokenDetailFragment,
} from '../../generated/graphql'
```

## Query Function Pattern

Create wrapper functions in `src/Data/queryGraphQL.ts`:

```typescript
import { createClient } from 'urql/core'
import { GetProjectDocument, ProjectDetailFragment } from '../../generated/graphql'

const client = createClient({
  url: PUBLIC_HASURA_ENDPOINT,
  fetch: fetch,
  requestPolicy: 'network-only',
})

export async function getProject(projectId: string): Promise<ProjectDetailFragment> {
  const { data, error } = await client
    .query(GetProjectDocument, { id: projectId })
    .toPromise()

  if (error) {
    throw Error(error.message)
  }

  if (!data || !data.projects_metadata?.length) {
    throw Error('No data returned from getProject query')
  }

  return data.projects_metadata[0]
}
```

## Pagination Pattern

For queries that may return many results, use pagination:

```typescript
const maxProjectsPerQuery = 1000

export async function getAllProjects(): Promise<ProjectDetailFragment[]> {
  const allProjects: ProjectDetailFragment[] = []
  let loop = true
  
  while (loop) {
    const { data } = await client
      .query(GetAllProjectsDocument, {
        first: maxProjectsPerQuery,
        skip: allProjects.length,
      })
      .toPromise()
      
    if (!data) {
      throw Error('No data returned from query')
    }
    
    allProjects.push(...data.projects_metadata)
    
    if (data.projects_metadata.length !== maxProjectsPerQuery) {
      loop = false
    }
  }
  
  return allProjects
}
```

## Multi-Chain Support

ArtBot supports both Ethereum mainnet and Arbitrum. Use the appropriate client:

```typescript
const client = createClient({ url: PUBLIC_HASURA_ENDPOINT })
const arbitrumClient = createClient({ url: PUBLIC_ARB_HASURA_ENDPOINT })

const getClientForContract = (contract: string) => {
  if (isArbitrumContract(contract)) {
    return arbitrumClient
  }
  return client
}
```

## Fragment Reuse

Use fragments for consistent field selection across queries:

```graphql
fragment TokenDetail on tokens_metadata {
  invocation
  preview_asset_url
  live_view_url
  owner { public_address }
  list_price
  list_currency_symbol
  project { name, artist_name }
  contract { token_base_url, name }
}

query getToken($token_id: String!) {
  tokens_metadata(where: { id: { _eq: $token_id } }) {
    ...TokenDetail
  }
}

query getWalletTokens($wallet: String!, $contracts: [String!]!) {
  tokens_metadata(where: { owner_address: { _eq: $wallet } }) {
    ...TokenDetail
  }
}
```
