---
description: "Project and channel configuration patterns for ArtBot"
alwaysApply: false
---

# Project Configuration

## Configuration Files

Configuration lives in `src/ProjectConfig/`:

| File | Purpose |
|------|---------|
| `channels.json` | Discord channel IDs and their project bot handlers |
| `channels_dev.json` | Development channel configuration |
| `projectBots.json` | Named mappings and custom config per project |
| `coreContracts.json` | Art Blocks core contract addresses |
| `partnerContracts.json` | Partner/Engine contract addresses |
| `collaborationContracts.json` | Collaboration contract addresses |
| `explorationsContracts.json` | Explorations contract addresses |

## Channel Configuration

Each channel can have a `projectBotHandlers` object:

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

- `default`: Project ID to handle messages by default
- `stringTriggers`: Map project IDs to trigger words
- `tokenIdTriggers`: Map project IDs to token ID ranges

## Contract Addresses

**Always use lowercase for contract addresses:**

```json
{
  "DOODLE": "0x28f2d3805652fb5d359486dffb7d08320d403240",
  "PLOTTABLES": "0xa319c382a702682129fcbf55d514e61a16f97f9c"
}
```

## Named Mappings

For projects with community-named tokens, create JSON files in `NamedMappings/`:

```json
// ringerSingles.json - single token aliases
{
  "goose": "879",
  "theone": "109"
}

// ringerSets.json - sets of tokens
{
  "perfects": [109, 879, 1024],
  "rainbows": [42, 156, 789]
}
```

Reference in `projectBots.json`:

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

## Adding a New Project Channel

1. Get the Discord channel ID
2. Add entry to `channels.json`:

```json
{
  "CHANNEL_ID": {
    "name": "artist-channel-name",
    "projectBotHandlers": {
      "default": "PROJECT_ID"
    }
  }
}
```

3. Optionally add named mappings in `projectBots.json`

## Adding a New Contract

1. Add to appropriate contracts file (lowercase address):

```json
{
  "CONTRACT_NAME": "0xcontractaddress..."
}
```

2. If it's a new Engine partner, also add to `partnerContracts.json`

## Environment-Based Config

The bot loads different configs based on environment:

```typescript
const ARTBOT_IS_PROD = process.env.ARTBOT_IS_PROD?.toLowerCase() === 'true'

const CHANNELS = ARTBOT_IS_PROD
  ? require('./channels.json')
  : require('./channels_dev.json')

const PROJECT_BOTS = ARTBOT_IS_PROD
  ? require('./projectBots.json')
  : require('./projectBots_dev.json')
```

## Project Aliases

Common project name aliases are in `project_aliases.json`:

```json
{
  "squig": "Chromie Squiggle",
  "fiddy": "Fidenza",
  "ringer": "Ringers"
}
```

These allow users to use shorthand in commands like `#? squig`.
