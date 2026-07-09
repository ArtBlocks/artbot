---
description: "TypeScript coding conventions and patterns for ArtBot"
globs: "**/*.{ts,tsx}"
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
interface SaleEvent {
  contractAddress: string
  tokenId: string
  price: number
  currency: string
}

type MessageType = 'random' | 'project' | 'artist' | 'wallet'

async function getProject(
  projectId: number,
  contractAddress?: string
): Promise<ProjectDetailFragment> {
  // ...
}
```

## Async Patterns

Prefer `async/await` over chained `.then()`.

## Import Organization

External packages first, then internal modules:

```typescript
import { Client, EmbedBuilder } from 'discord.js'
import fetch from 'node-fetch'

import { ProjectBot } from './ProjectBot'
import { getProject } from '../Data/queryGraphQL'
import { logger } from '../logger'
```

## Error Handling

```typescript
try {
  const data = await someApiCall()
} catch (err) {
  logger.error({ err }, 'Error in someOperation')
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
