---
description: "Discord.js patterns and bot class architecture for ArtBot"
globs: "**/Classes/**,**/Utils/smartBotResponse.ts,**/Utils/activityTriager.ts,**/index.ts"
alwaysApply: false
---

# Discord Bot Patterns

## Bot Class Architecture

```typescript
export class SomeBot {
  private bot: Client
  private someState: Map<string, Value> = new Map()

  constructor(bot: Client, otherDeps?: OtherType) {
    this.bot = bot
  }

  async init() {
    await this.buildSomething()
    setInterval(() => this.periodicTask(), 60000)
  }

  async handleSomeEvent(event: EventType) {
    try {
      // ...
    } catch (err) {
      logger.error({ err }, 'Error handling event')
    }
  }

  cleanup() {
    this.someState.clear()
  }
}
```

Register bots that need shutdown cleanup on `botsToCleanup` in `index.ts` (SIGINT/SIGTERM). MintBot/TriviaBot/TwitterBot are not all on that list today — be careful adding long-lived intervals.

## Message Handling

```typescript
async handleNumberMessage(msg: Message) {
  if (!msg.channel.isSendable()) return
  await msg.channel.send('Response')
}
```

Use `logger` (pino) from `src/logger` / project logger helpers — not `console.error`.

## Embeds

```typescript
import { EmbedBuilder } from 'discord.js'

const embed = new EmbedBuilder()
  .setTitle('Token Name - Artist')
  .setURL('https://artblocks.io/...')
  .setImage(assetUrl)
  .addFields(
    { name: 'Owner', value: ownerText, inline: true },
    { name: 'Price', value: priceText, inline: true }
  )

await msg.channel.send({ embeds: [embed] })
```

## Message Routing

`#` prefix → project/token queries via `ArtIndexerBot` / `projectConfig`:

- `#42 fidenza` — specific token
- `#? squiggle` — random
- `#entry curated` — lowest listed in vertical
- `#set AB500` — set collection helpers

Non-`#` → `smartBotResponse.ts`. Channel must be present in active `channels*.json`.

## OpenSea Dual Path

1. **Stream** (`@opensea/stream-js`): primary listings + sales; gated by `PRODUCTION_MODE` in handlers
2. **REST poll** (`OpenSeaEventsPollBot`): sales backfill; registers stream sale IDs to dedupe

Activity posts go through `activityTriager.ts` (hardcoded artist/platform → channel mapping + ban list). New sale destinations usually need code there, not only JSON.

## Mint Webhook

`POST /new-mint` — Hasura payload; auth header `webhook_secret` must equal `MINT_WEBHOOK_SECRET`. MintBot polls media-proxy until an image is ready, then posts using `mintBotConfig.json` channel names.

## Process Signals

`SIGINT`/`SIGTERM` in `index.ts`: OpenSea cleanup → `botsToCleanup` → `discordClient.destroy()`.
