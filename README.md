# ArtBot: The Art Blocks Discord Bot

![Build status](https://github.com/ArtBlocks/artbot/actions/workflows/build-check.yml/badge.svg)
[![GitPOAPs](https://public-api.gitpoap.io/v1/repo/ArtBlocks/artbot/badge)](https://www.gitpoap.io/gh/ArtBlocks/artbot)

The Discord bot for [Art Blocks](http://artblocks.io/).

ArtBot is a Node.js / TypeScript application. It uses [Yarn](https://yarnpkg.com/) (v4) to manage dependencies and runs via `ts-node`. It listens to Discord messages, OpenSea activity, and Hasura mint webhooks.

**Maintainer / AI-agent handoff:** see [`AGENTS.md`](./AGENTS.md) and [`docs/MAINTENANCE.md`](./docs/MAINTENANCE.md). Prefer those over this README when they disagree.

## Running artbot

- Node.js **20.x** and Yarn 4 (via corepack):

```bash
node -v
corepack enable
```

- Install dependencies (also runs GraphQL codegen):

```bash
yarn install
```

- Join the a-t Discord Server (test instance): <https://discord.gg/W6eYPpEk3a>

- Copy `.env.example` → `.env` and fill secrets (ask Art Blocks eng for shared test tokens).

**Important env flags** (they are independent):

| Variable | Local testing | Production |
|----------|---------------|------------|
| `ARTBOT_IS_PROD` | `false` → `channels_dev.json` | `true` → `channels.json` |
| `PRODUCTION_MODE` | `true` to connect Discord / process OpenSea | `true` |

- Start:

```bash
yarn start
```

You should be able to interact with your local Artbot in the a-t Discord server.

## Basic structure of artbot

The core engine uses [discord.js](https://discord.js.org/). Entry point: `src/index.ts` (Express HTTP server + Discord client + OpenSea stream).

- **Project queries** — `#[n] [project]`, `#?`, etc. `ArtIndexerBot` indexes projects from Hasura and routes to `ProjectBot` instances. Curated artist channels are configured in `ProjectConfig/channels.json` (string/token triggers). Optional named mappings live in `ProjectConfig/projectBots.json` + `NamedMappings/`.

- **Sales / listings** — OpenSea Stream API (`OpenSeaListBot` / `OpenSeaSaleBot`) with REST poll backfill (`OpenSeaEventsPollBot`). Discord routing is in `Utils/activityTriager.ts`.

- **Mints** — Hasura calls `POST /new-mint` (header `webhook_secret`). `MintBot` waits for media-proxy images, then posts using `mintBotConfig.json`.

- **SmartBot responses** — Mentions / FAQ / gas / etc. in `Utils/smartBotResponse.ts`.

- **Trivia / Twitter** — Optional; see `AGENTS.md` for env vars and feature flags.

## Adding query support for a project

### Definitions

#### Bot ID

A bot ID is a project ID, optionally concatenated with a contract name via `-` (e.g. `0` for Chromie Squiggles, `0-PLOTTABLES` for a Plottable project). Contract names are defined in `partnerContracts.json`, `explorationsContracts.json`, and `collaborationContracts.json`.

##### Partner contract names

Current entries in `partnerContracts.json` (addresses must be **lowercase**):

| Partner / label   | Contract Name     | Contract Address                           |
| ----------------- | ----------------- | ------------------------------------------ |
| Plottables        | PLOTTABLES        | 0xa319c382a702682129fcbf55d514e61a16f97f9c |
| Plottables V3     | PLOTTABLESV3      | 0xac521ea7a83a3bc3f9f1e09f8300a6301743fb1f |
| Bright Moments    | BM                | 0x0a1bbd57033f57e7b6743621b79fcb9eb2ce3676 |
| Rozendaal         | ROZENDAAL         | 0x68c01cb4733a82a58d5e7bb31bddbff26a3a35d5 |
| Hodlers           | HODLERS           | 0x9f79e46a309f804aa4b7b53a1f72c69137427794 |
| Hodlers Pass      | HODLERS-PASS      | 0xd00495689d5161c511882364e0c342e12dcc5f08 |
| Classical Revival | CLASSICAL_REVIVAL | 0x000000098a14b4e08132fd55faec521ab597a001 |

### Required configuration

- `ProjectConfig/channels.json` (and `channels_dev.json` for the test server):
  - key: Discord channel ID
  - value:
    - `name`: Discord channel name slug
    - `projectBotHandlers` (optional):
      - `default`: [Bot ID](#bot-id)
      - `stringTriggers` (optional): map of Bot ID → array of trigger substrings
      - `tokenIdTriggers` (optional): array of `{ "BOT_ID": [min, max] }` inclusive ranges

> **Note:** Open-ended ranges with `null` (e.g. `[555, null]`) are not reliably supported by the current range check. Prefer a large numeric max.

### Optional configuration

- `ProjectConfig/projectBots.json`
  - key: [Bot ID](#bot-id)
  - `namedMappings.singles` → filename under `NamedMappings/` for single-token aliases (e.g. `ringerSingles.json`)
  - `namedMappings.sets` → filename for token sets (e.g. `ringerSets.json`)
- `ProjectConfig/partnerContracts.json` — partner contract name → lowercase address
- `NamedMappings/<project>Singles.json` / `<project>Sets.json` — see existing Ringers files for examples

For end-to-end checklists (aliases, mint routing, replay scripts), use [`docs/MAINTENANCE.md`](./docs/MAINTENANCE.md).

## Engine instructions

Configure Art Bot to serve project data in partner channels:

1. Invite ArtBot: [OAuth link](https://discord.com/oauth2/authorize?client_id=794646394420854824&scope=bot&permissions=19520) (requires Manage Server).
2. Add your contract to `ProjectConfig/partnerContracts.json` (address **all lowercase**).

**Example**

```json
{
  "PLOTTABLES": "0xa319c382a702682129fcbf55d514e61a16f97f9c",
  "<Your contract name>": "<Your contract address>"
}
```

3. Open a PR adding the channel to `channels.json` with `projectBotHandlers`. Art Bot needs View Channel + Send Messages.

**Example**

```json
"880280317477404713": {
  "name": "example-partner-channel",
  "projectBotHandlers": {
    "default": "0-PLOTTABLES",
    "stringTriggers": {
      "1-PLOTTABLES": ["slider"]
    }
  }
}
```

4. Update the [partner contract names](#partner-contract-names) table in this README if you added a new public partner.
5. After merge + deploy, query Art Bot in the configured channel(s).

Mint feed routing for partners also requires `mintBotConfig.json` (and often `activityTriager.ts` for sales). See `docs/MAINTENANCE.md`.

## Contributing to artbot

Development is coordinated through Art Blocks eng / Discord and GitHub PRs. CODEOWNERS: `@ArtBlocks/Eng-Approvers-Product`.

Useful commands: `yarn lint-and-format`, `yarn codegen`. CI smoke-boots the process with `PRODUCTION_MODE=false`.

Anyone who contributes to Artbot will be eligible to claim a [GitPOAP](https://www.gitpoap.io/gh/ArtBlocks/artbot).
