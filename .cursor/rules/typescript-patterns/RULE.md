---
description: "TypeScript coding conventions and patterns for ArtBot"
alwaysApply: false
---

# TypeScript Patterns

## Strict Mode

TypeScript strict mode is enabled. Always handle null/undefined properly:

```typescript
// Good - check before access
const name = project?.name ?? 'unknown'

// Good - guard clause
if (!data || !data.projects_metadata) {
  throw Error('No data returned from query')
}

// Bad - will fail strict null checks
const name = project.name  // Error if project could be null
```

## Type Definitions

- Use explicit types for function parameters and return values
- Prefer interfaces for object shapes, types for unions/aliases
- Import generated types from `generated/graphql.ts` for GraphQL data

```typescript
// Interface for object shapes
interface SaleEvent {
  contractAddress: string
  tokenId: string
  price: number
  currency: string
}

// Type for unions
type MessageType = 'random' | 'project' | 'artist' | 'wallet'

// Explicit return types
async function getProject(id: string): Promise<ProjectDetailFragment> {
  // ...
}
```

## Async Patterns

Use `async/await` over raw promises:

```typescript
// Good
async function fetchData() {
  const result = await client.query(SomeDocument, {}).toPromise()
  return result.data
}

// Avoid chained .then() when possible
```

## Import Organization

Order imports: external packages first, then internal modules:

```typescript
// External packages
import { Client, EmbedBuilder } from 'discord.js'
import axios from 'axios'

// Internal modules
import { ProjectBot } from './ProjectBot'
import { getProject } from '../Data/queryGraphQL'
import { CHANNEL_BLOCK_TALK } from '..'
```

## Error Handling

Use try/catch blocks around external API calls. Log errors with context:

```typescript
try {
  const data = await someApiCall()
  // process data
} catch (err) {
  console.error('Error in someOperation:', err)
  // Handle gracefully - don't rethrow unless necessary
}
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Classes | PascalCase | `ProjectBot`, `ArtIndexerBot` |
| Functions/Methods | camelCase | `handleNumberMessage` |
| Constants | UPPER_SNAKE_CASE | `CHANNEL_BLOCK_TALK` |
| Class files | PascalCase | `ProjectBot.ts` |
| Utility files | camelCase | `smartBotResponse.ts` |
| Config JSON | camelCase | `channels.json` |
