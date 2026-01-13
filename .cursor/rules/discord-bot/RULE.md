---
description: "Discord.js patterns and bot class architecture for ArtBot"
alwaysApply: false
---

# Discord Bot Patterns

## Bot Class Architecture

Bot classes follow a consistent pattern:

```typescript
export class SomeBot {
  // Private fields first
  private bot: Client
  private someState: Map<string, Value> = new Map()

  constructor(bot: Client, otherDeps?: OtherType) {
    this.bot = bot
    // Synchronous initialization only in constructor
  }

  // Async initialization in separate init() method if needed
  async init() {
    await this.buildSomething()
    
    // Set up intervals for periodic tasks
    setInterval(() => {
      this.periodicTask()
    }, 60000)
  }

  // Public handler methods
  async handleSomeEvent(event: EventType) {
    try {
      // Handle the event
    } catch (err) {
      console.error('Error handling event:', err)
    }
  }

  // Private helper methods
  private helperMethod(): void {
    // Implementation
  }

  // Cleanup method for resource management
  cleanup() {
    // Clear intervals, close connections, reset state
    this.someState.clear()
  }
}
```

## Message Handling

Check if channel is sendable before sending messages:

```typescript
async handleNumberMessage(msg: Message) {
  if (!msg.channel.isSendable()) {
    return
  }
  
  // Process message
  msg.channel.send('Response')
}
```

## Embed Messages

Use `EmbedBuilder` for rich message formatting:

```typescript
import { EmbedBuilder } from 'discord.js'

const embed = new EmbedBuilder()
  .setTitle('Token Name - Artist')
  .setURL('https://artblocks.io/...')
  .setColor(0x00ff00)
  .setImage(assetUrl)
  .setDescription('Description text')
  .addFields(
    { name: 'Owner', value: ownerText, inline: true },
    { name: 'Price', value: priceText, inline: true }
  )
  .setFooter({ text: 'Footer text' })

msg.channel.send({ embeds: [embed] })
```

## Event Listeners

Handle Discord events via the client exported from index.ts:

```typescript
import { discordClient } from '..'

discordClient.on(Events.MessageCreate, async (msg) => {
  const content = msg.content
  const channelID = msg.channel.id
  
  if (content.startsWith('#')) {
    // Handle # commands
  }
})

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user?.tag}!`)
})
```

## Process Signal Handling

Register cleanup handlers for graceful shutdown:

```typescript
// In index.ts
const botsToCleanup: { cleanup: () => void }[] = []

// Add bots that need cleanup
botsToCleanup.push(openSeaListBot)
botsToCleanup.push(openSeaSaleBot)

process.on('SIGINT', () => {
  console.log('Received SIGINT. Cleaning up...')
  botsToCleanup.forEach((bot) => bot.cleanup())
  discordClient.destroy()
  process.exit(0)
})
```

## Message Routing

The `#` prefix triggers project/token queries:

- `#42 fidenza` - Get Fidenza #42
- `#? squiggle` - Random Chromie Squiggle
- `#entry curated` - Lowest priced Curated token
- `#set AB500` - Set collection data

Messages are routed through `ArtIndexerBot.handleNumberMessage()` which normalizes project names via `toProjectKey()` and dispatches to the appropriate `ProjectBot`.
