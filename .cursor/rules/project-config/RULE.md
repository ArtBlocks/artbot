---
description: "Project and channel configuration patterns for ArtBot"
globs: "**/ProjectConfig/**,**/NamedMappings/**"
alwaysApply: false
---

# Project Configuration

Full task checklists: `docs/MAINTENANCE.md`. Env flag that selects prod vs dev JSON: `ARTBOT_IS_PROD` (not `PRODUCTION_MODE`).

## Configuration Files

| File | Purpose |
|------|---------|
| `channels.json` / `channels_dev.json` | Discord channel IDs → name + `projectBotHandlers` |
| `projectBots.json` / `projectBots_dev.json` | Named mapping refs per bot ID |
| `coreContracts.json` | Art Blocks core contracts |
| `partnerContracts.json` | Engine partner contracts |
| `collaborationContracts.json` | Collab contracts (Pace, BM, …) |
| `explorationsContracts.json` | Explorations contracts |
| `blockedEngineContracts.json` | Excluded from Engine index |
| `blockedMintContracts.json` | Mint suppression |
| `stagingContracts.json` | Staging mint routing |
| `mintBotConfig.json` | Partner/collection → Discord channel **names** |
| `project_aliases.json` | User shorthand → project name |
| `contract_aliases.json` | Platform aliases |

## Channel Configuration

```json
{
  "123456789012345678": {
    "name": "chromie-squiggle",
    "projectBotHandlers": {
      "default": "0",
      "stringTriggers": {
        "1": ["other-project"]
      },
      "tokenIdTriggers": [
        { "2": [100, 200] }
      ]
    }
  }
}
```

- `default`: Bot ID when no trigger matches
- `stringTriggers`: Bot ID → trigger words (substring match on lowercase content)
- `tokenIdTriggers`: Bot ID → `[min, max]` inclusive ranges

**Gotcha:** Open-ended ranges with `null` (e.g. `[555, null]`) are documented historically but **not handled** by the active comparison in `projectConfig.ts` (uses `<= ranges[1]`). Use a large numeric max until fixed. Prefer updating both `channels.json` and `channels_dev.json`.

## Contract Addresses

Always lowercase:

```json
{
  "PLOTTABLES": "0xa319c382a702682129fcbf55d514e61a16f97f9c",
  "HODLERS": "0x9f79e46a309f804aa4b7b53a1f72c69137427794"
}
```

Current partners live in `partnerContracts.json` (PLOTTABLES, BM, HODLERS, etc.). Do not copy stale DOODLE examples — DOODLE is blocked, not a live partner entry.

## Named Mappings

```json
// *Singles.json — single token aliases
{ "goose": "879", "theone": "109" }

// *Sets.json — sets of tokens
{ "perfects": [109, 879, 1024] }
```

In `projectBots.json`:

```json
{
  "13": {
    "namedMappings": {
      "singles": "ringerSingles.json",
      "sets": "ringerSets.json"
    }
  }
}
```

## mintBotConfig

Keys are collection types or partner contract names; values are arrays of channel **names** that must exist in `channels.json`:

```json
{
  "STUDIO": ["studio-mints"],
  "PLOTTABLES": ["plottables-mints"]
}
```

## Adding a New Contract

1. Lowercase address → appropriate `*Contracts.json`
2. Mints → `mintBotConfig.json` (+ channel if needed)
3. Sales/listings → often `activityTriager.ts` as well
4. Update README partner table if public
