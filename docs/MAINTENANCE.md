# ArtBot Maintenance Playbook

Step-by-step tasks for humans and AI agents. Channel IDs: Discord → Developer Mode → right-click channel → Copy ID.

Always update **both** prod and dev configs when the change should be testable on the a-t server: `channels.json` + `channels_dev.json`, `projectBots.json` + `projectBots_dev.json`.

## Add a curated artist channel

Issue template: `.github/ISSUE_TEMPLATE/curated-project-bot-support.md`

1. Confirm ArtBot can **View Channel** and **Send Messages** in the target channel.
2. Add to `src/ProjectConfig/channels.json` (and `channels_dev.json` if testing):

```json
"CHANNEL_ID": {
  "name": "artist-channel-slug",
  "projectBotHandlers": {
    "default": "PROJECT_ID"
  }
}
```

3. Open a PR. After merge + deploy, test `#1` (or `#?`) in that channel.

## Add playground / keyword routing

Issue template: `.github/ISSUE_TEMPLATE/playground-project-bot-support.md`

Add `stringTriggers` under the channel's `projectBotHandlers`:

```json
"projectBotHandlers": {
  "default": "0",
  "stringTriggers": {
    "123": ["keyword", "alias"]
  }
}
```

## Add named singles or sets

Issue templates: `new-project-singles.md`, `new-project-set.md`

1. Create `src/NamedMappings/<project>Singles.json` and/or `<project>Sets.json`.
   - Singles: `{ "goose": "879" }` (token invocation / id as used by the project)
   - Sets: `{ "perfects": [109, 879, 1024] }`
2. Reference in `projectBots.json` under the bot ID:

```json
"13": {
  "namedMappings": {
    "singles": "ringerSingles.json",
    "sets": "ringerSets.json"
  }
}
```

`singles` → Singles file; `sets` → Sets file. (Older README text had these swapped.)

## Add a project alias

Issue template: `.github/ISSUE_TEMPLATE/new-project-alias.md`

Edit `src/ProjectConfig/project_aliases.json`:

```json
"squig": "Chromie Squiggle"
```

## Add a partner / Engine contract

1. Add **lowercase** address to `src/ProjectConfig/partnerContracts.json`.
2. Ensure it is not incorrectly listed in `blockedEngineContracts.json` if it should appear in Engine indexing.
3. For mint posts: add a key in `mintBotConfig.json` mapping to existing channel **names** from `channels.json` (e.g. `"studio-mints"`), or add a new mint channel entry in `channels.json` first.
4. For sales/listings routing into the right Discord channels: check/update `src/Utils/activityTriager.ts`.
5. Update the partner contracts table in `README.md` if you document public partners.
6. Bot IDs for that contract use `{projectNumber}-{CONTRACT_NAME}` (e.g. `0-PLOTTABLES`).

## Add a smartBot / FAQ command

Issue template: `.github/ISSUE_TEMPLATE/new-command.md`

1. Implement in `src/Utils/smartBotResponse.ts`.
2. If adding a new `#` command surface, also update help text in `ArtIndexerBot` (`HASHTAG_MESSAGE` / related).

## Change GraphQL queries

1. Edit `src/Data/graphql/*.graphql`.
2. Run `yarn codegen`.
3. Update wrappers in `src/Data/queryGraphQL.ts` to use generated documents/types from `generated/graphql.ts`.

## Replay missed mints

```bash
# Inspect first
yarn ts-node scripts/replay-mints.ts --project-id <contract-projectNum> --dry-run

# Post (example channel name)
yarn ts-node scripts/replay-mints.ts --project-id <contract-projectNum> --channel studio-mints
```

Requires Discord + Hasura access consistent with the environment you target. Prefer `--dry-run` first.

## Local Discord testing checklist

1. Copy `.env.example` → `.env`; fill secrets (ask Eng for shared artbot-jr / test tokens).
2. Set `ARTBOT_IS_PROD=false`, `PRODUCTION_MODE=true`.
3. `yarn install && yarn start`.
4. Use the a-t Discord server: https://discord.gg/W6eYPpEk3a
5. Confirm logs show `ARTBOT_IS_PROD: false` and successful Discord login.

## Deploy / restart notes

- Host: Render.com (process: `yarn start`). Config/secrets live in the host dashboard, not this repo.
- On restart: Hasura project index rebuilds; OpenSea stream reconnects; mint queue starts empty (in-flight mints may need replay).
- No dedicated `/health` route — use process health + application logs.
- Discord 429s on shared Render IPs: login uses retries/backoff in `src/index.ts`.

## Ownership / review

- CODEOWNERS: `@ArtBlocks/Eng-Approvers-Product`
- Coordinate informally in Art Blocks eng Discord for operational incidents (OpenSea outages, mint webhook failures, Discord permission issues).
