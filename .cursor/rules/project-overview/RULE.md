---
description: "ArtBot project overview - Discord bot for Art Blocks NFT platform"
alwaysApply: true
---

# ArtBot Project Overview

ArtBot is the Art Blocks Discord bot: `#` project/token queries, OpenSea sales/listings, Hasura-driven mint posts, optional Twitter sales, and trivia.

For full handoff context (env matrix, gotchas, ops), read **`AGENTS.md`** at the repo root. For step-by-step tasks, see **`docs/MAINTENANCE.md`**.

## Tech Stack

- **Runtime**: Node.js 20.x (`ts-node`, no separate build step)
- **Language**: TypeScript 5.x, strict mode
- **Package Manager**: Yarn 4.3.1 (`packageManager` field; use corepack)
- **Discord**: discord.js v14
- **GraphQL**: Hasura at `https://data.artblocks.io/v1/graphql` via urql
- **NFT activity**: OpenSea Stream API + OpenSea REST poll backfill
- **HTTP**: Express (`PORT`, default 3001) for mint webhook + Twitter OAuth
- **Other**: viem (ENS/mainnet helpers), twitter-api-v2, Supabase (trivia/Twitter state), OpenAI (trivia), pino logger
- **Hosting**: Render.com (long-running `yarn start`)

## Project Structure

```
src/
├── index.ts                 # Express + Discord + OpenSea stream entry
├── Classes/
│   ├── APIBots/             # OpenSea list/sale/poll bots
│   ├── ArtIndexerBot.ts     # Project index + # routing
│   ├── ProjectBot.ts        # Per-project handlers
│   ├── MintBot.ts           # Mint queue → Discord
│   ├── TwitterBot.ts        # Optional Twitter sale posts
│   ├── TriviaBot.ts         # Trivia game
│   └── SchedulerBot.ts      # Birthdays + trivia cron
├── Data/
│   ├── graphql/             # .graphql documents
│   ├── queryGraphQL.ts      # urql client + wrappers
│   └── supabase.ts          # Trivia + Twitter state only
├── ProjectConfig/           # channels, contracts, aliases, mintBotConfig
├── NamedMappings/           # Token singles/sets JSON
└── Utils/
    ├── smartBotResponse.ts  # Non-# / mention responses
    ├── activityTriager.ts   # Sale/list channel routing (code, not JSON)
    └── common.ts
scripts/replay-mints.ts      # Replay missed mint posts
generated/graphql.ts         # Codegen output (gitignored)
```

## Key Concepts

- **ProjectBot**: One Art Blocks (or partner) project
- **ArtIndexerBot**: Indexes projects from Hasura; routes `#` commands; four instances (main, Engine, Pace, BM)
- **Bot ID**: `{projectId}` or `{projectId}-{CONTRACT_NAME}`
- **Named mappings**: Community aliases for tokens/sets
- **`ARTBOT_IS_PROD` vs `PRODUCTION_MODE`**: Independent flags — see `AGENTS.md`

## Development Commands

```bash
yarn install          # postinstall runs codegen
yarn start            # run bot
yarn codegen          # after .graphql edits
yarn lint-and-format
```

## Agent Defaults

- Prefer JSON config changes for channels/aliases/mappings/contracts
- Use `logger` (pino), not `console.*`
- Run `yarn codegen` after GraphQL document changes
- Contract addresses: lowercase
- `mintBotConfig.json` values are channel **names**, not IDs
