---
description: "ArtBot project overview - Discord bot for Art Blocks NFT platform"
alwaysApply: true
---

# ArtBot Project Overview

ArtBot is a Discord bot for the Art Blocks NFT platform. It provides information about Art Blocks projects, handles sales/listing feeds from OpenSea, and supports Twitter integration for notable sales.

## Tech Stack

- **Runtime**: Node.js 20.x
- **Language**: TypeScript 5.x with strict mode enabled
- **Package Manager**: Yarn 4.3.1
- **Discord**: discord.js v14
- **GraphQL**: Hasura with urql client
- **NFT APIs**: OpenSea Stream API, OpenSea REST API
- **Blockchain**: viem for Ethereum interactions
- **Twitter**: twitter-api-v2

## Project Structure

```
src/
├── index.ts              # Main entry point, Discord client, bot initialization
├── Classes/              # Bot class implementations
│   ├── APIBots/          # External API integration bots (OpenSea, etc.)
│   ├── ArtIndexerBot.ts  # Project indexing and message routing
│   ├── ProjectBot.ts     # Individual project handlers
│   ├── MintBot.ts        # Mint event handling
│   ├── TwitterBot.ts     # Twitter posting functionality
│   └── TriviaBot.ts      # Trivia game functionality
├── Data/                 # Data access layer
│   ├── graphql/          # GraphQL queries (.graphql files)
│   ├── queryGraphQL.ts   # GraphQL client and query functions
│   └── supabase.ts       # Supabase client
├── ProjectConfig/        # Configuration files
│   ├── channels.json     # Discord channel configurations
│   ├── projectBots.json  # Project-specific bot configurations
│   ├── *Contracts.json   # Contract address configurations
│   └── projectConfig.ts  # Configuration loading/parsing
├── NamedMappings/        # Project-specific token name mappings
└── Utils/                # Utility functions
    ├── smartBotResponse.ts  # FAQ/help response handling
    ├── activityTriager.ts   # Sales/listing channel routing
    └── common.ts            # Shared utilities
```

## Key Concepts

- **ProjectBot**: Handles queries for a specific Art Blocks project (e.g., Fidenza, Chromie Squiggles)
- **ArtIndexerBot**: Indexes all projects and routes `#` commands to the right ProjectBot
- **Named Mappings**: Aliases for specific tokens or sets (e.g., "the goose" for a specific Squiggle)
- **Verticals**: Art Blocks collections (Curated, Presents, Explorations, Heritage, Collaborations)

## Environment Configuration

- `PRODUCTION_MODE` - Set to "true" for production behavior
- `ARTBOT_IS_PROD` - Set to "true" to use production config files
- `DISCORD_TOKEN` - Discord bot token
- `OPENSEA_API_KEY` - OpenSea API key
- `TWITTER_ENABLED` - Set to "true" to enable Twitter posting

## Development Commands

```bash
yarn start      # Run the bot
yarn dev        # Same as start
yarn format     # Format code with Prettier
yarn lint       # Lint with ESLint
yarn codegen    # Regenerate GraphQL types
```
