# ArtBot — Agent & Maintainer Guide

Canonical context for AI agents (Cursor, Claude Code, etc.) and human maintainers. Prefer this file over the README when they disagree; keep both in sync when you change behavior.

## What this is

ArtBot is the Art Blocks Discord bot: project/token queries (`#42 fidenza`), OpenSea sales/listings feeds, mint announcements (Hasura webhook), optional Twitter sale posts, and scheduled trivia.

It is a **single long-running Node process** (Express HTTP + Discord.js + OpenSea stream). Hosted on **Render.com** (see comment in `src/index.ts`). There is no Dockerfile in-repo; deploy is `yarn start` with env vars set in the host.

## Quick commands

```bash
corepack enable          # Yarn 4 via packageManager field
yarn install             # also runs postinstall → yarn codegen
yarn start               # ts-node src/index.ts
yarn codegen             # regenerate generated/graphql.ts from Hasura schema
yarn lint
yarn format
yarn lint-and-format
```

- **Node**: 20.x (see `.node-version`, `engines`)
- **Package manager**: Yarn 4.3.1 (`nodeLinker: node-modules`) — do not switch to npm for day-to-day work
- **`generated/` is gitignored** — a fresh clone must `yarn install` or `yarn codegen` before TypeScript works
- **Pre-commit** (husky): `yarn codegen && yarn lint-and-format`
- **Tests**: `yarn test` exists but there are **no test files**; CI does not run Jest
- **CI** (`.github/workflows/build-check.yml`): install → codegen → `timeout 1m yarn start` with `PRODUCTION_MODE=false` (exit 124 = success)

## Two production flags (critical)

These are **independent**. Mis-setting them is the most common ops footgun.

| Env var | Controls | Prod value | Local Discord testing |
|---------|----------|------------|------------------------|
| `ARTBOT_IS_PROD` | Which JSON configs load (`channels.json` / `projectBots.json` vs `*_dev.json`) | `true` | `false` (a-t test server channels) |
| `PRODUCTION_MODE` | Discord login, OpenSea event handling, OpenSea REST poll bot | `true` | `true` if you want live Discord/OpenSea; CI uses `false` |

Local pattern that works: `ARTBOT_IS_PROD=false` + `PRODUCTION_MODE=true` + test-server `DISCORD_TOKEN` + join [a-t Discord](https://discord.gg/W6eYPpEk3a).

## Architecture (actual)

```
src/index.ts
  ├── Express (:PORT, default 3001)
  │     POST /new-mint     ← Hasura mint webhook (header: webhook_secret)
  │     GET  /callback     ← Twitter OAuth
  │     GET|POST /update   ← stub OK responses (not a real health check)
  ├── Discord client (if PRODUCTION_MODE)
  │     MessageCreate → # commands OR smartBotResponse
  ├── OpenSea WebSocket stream → OpenSeaListBot / OpenSeaSaleBot → activityTriager
  ├── OpenSeaEventsPollBot (sales backfill, 30s) when PRODUCTION_MODE
  ├── MintBot (queue + media-proxy poll → Discord)
  ├── ScheduleBot (birthdays + optional trivia)
  └── TwitterBot (optional, TWITTER_ENABLED)
```

### Message routing

1. Channel must exist in the active `channels*.json` or the message is ignored.
2. If content starts with `#`:
   - Special channels → dedicated `ArtIndexerBot` instances (`engine-chat`, Pace, Bright Moments, block-talk, etc.)
   - Artist channels → `projectConfig.routeProjectNumberMsg()` (`default` / `stringTriggers` / `tokenIdTriggers`)
3. Else → `smartBotResponse()` (mentions, FAQ, gas, trivia helpers).

Four indexers are constructed in `index.ts`: main (`getAllProjects`), Engine (`getEngineProjects`), Pace, Bright Moments. Only the main indexer initializes `projectConfig` project bots.

### Data

- **Hasura** (public): `https://data.artblocks.io/v1/graphql` — hardcoded in `queryGraphQL.ts` / `codegen.ts`. Optional `HASURA_GRAPHQL_ADMIN_SECRET`.
- **One GraphQL client** — there is **no** separate Arbitrum Hasura client (older docs were wrong). urql uses `dedupExchange` + `fetchExchange` only (no document cache) so unique queries do not accumulate in a long-running process.
- **Supabase**: trivia scores + Twitter OAuth/state only (`src/Data/supabase.ts`).
- Queries live in `src/Data/graphql/*.graphql`; wrappers in `src/Data/queryGraphQL.ts`.

### Multi-chain reality

Token/mint data can include chain IDs (Ethereum, Arbitrum, Base). **OpenSea stream handling currently drops non-`ethereum` NFT IDs**, and the REST poll bot hardcodes mainnet (`chainId: 1`). Do not assume Arbitrum/Base sales appear in Discord feeds without code changes.

## Config map

| File | Purpose |
|------|---------|
| `channels.json` / `channels_dev.json` | Discord channel ID → name + optional `projectBotHandlers` |
| `projectBots.json` / `projectBots_dev.json` | Named mapping file refs per bot ID |
| `coreContracts.json` | Art Blocks core contracts |
| `partnerContracts.json` | Engine partner contracts (lowercase addresses) |
| `collaborationContracts.json` / `explorationsContracts.json` | Collab / Explorations |
| `blockedEngineContracts.json` | Excluded from Engine project index |
| `blockedMintContracts.json` | Suppress mints per chain |
| `stagingContracts.json` | Staging → `ab-art-chat` |
| `mintBotConfig.json` | Collection/partner key → Discord **channel names** (must match `channels.json` `name`) |
| `project_aliases.json` | User shorthand → project name |
| `contract_aliases.json` | Platform aliases for `#recent` etc. |
| `NamedMappings/*Singles.json` / `*Sets.json` | Token aliases / sets |

**Bot ID**: `{projectNumber}` or `{projectNumber}-{CONTRACT_NAME}` (contract name from partner/explorations/collab JSON).

**Contract addresses must be lowercase.**

## Environment variables

### Required in production

- `DISCORD_TOKEN`
- `PRODUCTION_MODE=true`
- `ARTBOT_IS_PROD=true`
- `OPENSEA_API_KEY` (stream + REST + username lookup)
- `MINT_WEBHOOK_SECRET` (Hasura → `POST /new-mint`, header name `webhook_secret`)
- `PORT` (set by Render)

### Feature / optional

- `HASURA_GRAPHQL_ADMIN_SECRET`
- `METADATA_REFRESH_INTERVAL_MINUTES` (default 480)
- `MINT_REFRESH_TIME_SECONDS` (default 60)
- `TWITTER_ENABLED` + `AB_TWITTER_*` / OAuth client vars / `TWITTER_CALLBACK_URL`
- `SUPABASE_URL`, `SUPABASE_API_KEY`, `TRIVIA_TABLE`
- `OPENAI_API_KEY`, `TRIVIA_CADENCE` (hours; `0` = off)
- `ETHERSCAN_API_KEY` (gas command)
- OpenSea reconnect tuning: `OPENSEA_MAX_RECONNECT_ATTEMPTS`, `OPENSEA_INITIAL_RECONNECT_DELAY`, `OPENSEA_MAX_RECONNECT_DELAY`, `OPENSEA_HEALTH_CHECK_INTERVAL`

### Unused / stale (do not invent new uses without cleanup)

`.env.example` historically listed `GOOGLE_AUTH_DETAILS`, `RANDOM_ART_INTERVAL_MINUTES`, `RESERVOIR_API_KEY` — **not referenced in code**. Reservoir bots were removed. CI sets `HASURA_GRAPHQL_ENDPOINT` but the app hardcodes the public URL.

## Agent rules of thumb

1. **Config PRs are the common path** — new artist channels, aliases, named mappings, partner contracts. Prefer JSON changes over code when possible.
2. **Sales/listing channel routing is code** — `src/Utils/activityTriager.ts` (artist/platform heuristics + ban list). New partners often need both `partnerContracts.json` / `mintBotConfig.json` **and** triager updates.
3. **After editing `.graphql` files**, run `yarn codegen` (pre-commit will too).
4. **Use `logger` (pino)**, not `console.log` / `console.error`, for new logging.
5. **Check `msg.channel.isSendable()`** before sending Discord messages.
6. **Do not assume null works in `tokenIdTriggers` ranges** — code compares `tokenID <= ranges[1]` without null handling; `_inRange()` exists but is unused. Use a large max instead of `null` until fixed.
7. **Mint channel names** in `mintBotConfig.json` must match the `name` field in `channels.json`, not channel IDs.
8. **Issue templates** under `.github/ISSUE_TEMPLATE/` map 1:1 to maintenance tasks — follow those file touch lists.
9. **No health endpoint** — hosting liveness is process + logs. `/update` is a stub.
10. **CODEOWNERS**: `@ArtBlocks/Eng-Approvers-Product`. Do not assign personal Discord handles from the old README.
11. **OpenSea stream reconnect must `disconnect()` the previous Phoenix client** before constructing a new one. Do not reset `reconnectAttempts` until a stream event confirms the socket is live. Keep wildcard `*` subscriptions (OpenSea topics are collection slugs, not contracts; ArtBot filters by contract address).
12. **Do not add urql `cacheExchange`** — this process is long-lived; the document cache never expires. App-level caches (project dicts, wallet TTL) are the right layer.

## Common tasks

See [docs/MAINTENANCE.md](./docs/MAINTENANCE.md) for step-by-step: add channel, alias, named mappings, partner contract, replay mints, GraphQL changes.

## Key files

| Path | Role |
|------|------|
| `src/index.ts` | Entry, Express, Discord, OpenSea stream |
| `src/Classes/ArtIndexerBot.ts` | Project index + `#` routing |
| `src/Classes/ProjectBot.ts` | Per-project responses |
| `src/ProjectConfig/projectConfig.ts` | Channel config + bot ID resolution |
| `src/Utils/activityTriager.ts` | Sale/list Discord routing |
| `src/Utils/smartBotResponse.ts` | Non-`#` / mention responses |
| `src/Data/queryGraphQL.ts` | Hasura client + query helpers |
| `src/Classes/MintBot.ts` | Mint queue/posting |
| `scripts/replay-mints.ts` | Replay missed mint posts |

## Known gaps / debt (for successors)

- Near-zero automated tests; CI only smoke-boots the process
- OpenSea feeds are Ethereum-mainnet-oriented despite multi-chain mint data
- Empty `Procfile`; Render config lives outside the repo
- `googleapis` dependency appears unused
- Trivia error copy still mentions a former maintainer by name in `TriviaBot.ts`
- GitHub issue templates may still list a personal assignee — update when ownership transfers
