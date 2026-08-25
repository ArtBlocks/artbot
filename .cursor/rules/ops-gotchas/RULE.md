---
description: "Operational gotchas, env flags, and deployment notes for ArtBot"
alwaysApply: true
---

# Ops & Gotchas

Read `AGENTS.md` for the full matrix. This rule is the short always-on checklist.

## Env Flags

| Flag | Meaning |
|------|---------|
| `ARTBOT_IS_PROD=true` | Load `channels.json` + `projectBots.json` |
| `ARTBOT_IS_PROD` unset/false | Load `*_dev.json` (a-t test server) |
| `PRODUCTION_MODE=true` | Discord login, then OpenSea stream/poll + scheduler |
| `PRODUCTION_MODE=false` | Boot Express/indexers; skip Discord login (CI) |

Never assume one flag implies the other.

## Deploy

- Host: **Render.com**, command `yarn start`, binds `0.0.0.0:$PORT`
- No in-repo Dockerfile / health route; `/update` is a stub
- Shared Render IPs can hit Discord 429 — login retries/backoff exist in `index.ts`. OpenSea/scheduler wait until Discord is ready; do not restart to "kick" a 429.
- Secrets live in the host dashboard; keep `.env` out of git

## Codegen

`generated/` is gitignored. Fresh clones need `yarn install` or `yarn codegen`. Editing `.graphql` without codegen breaks TypeScript.

## OpenSea / Chains

- Stream handlers filter to **ethereum** NFT IDs
- REST sale poll uses **mainnet** `chainId: 1`
- Multi-chain mint webhooks can still arrive — do not conflate mint support with sale-feed support

## Config Pitfalls

- Contract addresses: **lowercase**
- `mintBotConfig.json` → channel **names** matching `channels.json` `name`
- `tokenIdTriggers` with `null` max: **broken**; use a large number
- Sales routing: `activityTriager.ts` (code), not channels JSON alone
- Update prod + `_dev` JSON when testing on a-t

## Safe Agent Behavior

- Prefer config PRs for channels/aliases/mappings
- Do not invent Reservoir / Google Sheets / Arbitrum-Hasura clients — removed or never present
- Do not commit secrets; `.env.example` is the template
- After mint outages, prefer `scripts/replay-mints.ts --dry-run` before posting
