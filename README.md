# ArtBot: The Art Blocks Discord Bot

![Build status](https://github.com/ArtBlocks/artbot/actions/workflows/build-check.yml/badge.svg)
[![GitPOAPs](https://public-api.gitpoap.io/v1/repo/ArtBlocks/artbot/badge)](https://www.gitpoap.io/gh/ArtBlocks/artbot)

The Discord bot for [ArtBlocks](http://artblocks.io/).

ArtBot is a Node.js application. It uses the [Yarn Package Manager](https://yarnpkg.com/) to manage dependencies and run the application. It can be interacted with via Discord messages.

## Running artbot

- Verify you have Node.js and npm installed. If not, you can refer to the [Node.js official page](https://nodejs.org/) to get started.

```bash
node -v
npm -v
```

- Install Yarn Package Manager. For detailed instructions, refer to the [Yarn official page](https://yarnpkg.com/getting-started/install).

```bash
npm install -g yarn
```

- Install the package dependencies

```bash
yarn install
```

- Join the a-t Discord Server

Artbot is based on the [discord.js](https://discord.js.org/) package, and is exclusively concerned with processing and sending Discord messages. If you want to be able to interact with it, joining the Artbot test Discord server is the way to go. <https://discord.gg/W6eYPpEk3a>

- Set up `.env` file based on `.env.example`.

- Run the application

```bash
yarn start
```

- You should now be able to interact with your local Artbot instance in the a-t Discord server!

## Basic structure of artbot

The core engine of Artbot is built around the discord.js package. It serves several functions, all of which are based on listening to messages in the ArtBlocks Discord, and responding with other messages. This core functionality is driven from index.js, and there are several helper Classes and Utility packages that assist with this logic.

- Project Queries

  One of the most widely used features is Artbot's ability to respond to a #[n] [project_name] query with a link to the appropriate token w/ embedded image. Currently this is implemented via the ProjectBot class.

  - All projects and their metadata are retrieved from the subgraph on startup in the `ArtIndexerBot.ts` class, which in turn creates a `ProjectBot` for every project. `#[n] [project_name]`, `#?`, etc queries are triaged by the `ArtIndexerBot` class, and the corresponding `ProjectBot` is triggered to respond.
  - Curated artist channels are handled a bit differently. ProjectBots for the artist's projects are defined in `ProjectConfig/channels.json` and are triggered by the artist's name in the query. e.g. `#1 ringer` in `#dmitri-cherniak` will trigger the Ringer project bot.
    - Additional configuration for these projects can be defined in `ProjectConfig/projectBots.json`. See [Adding query support for a project](#adding-query-support-for-a-project) for more details.

- Sales/Listing Feeds

  Artbot also provides a feeds for sales and listings of Art Blocks projects. It polls the (incredible) [Reservoir API](https://docs.reservoir.tools/reference/overview) to get the latest activity across all marketplaces (using the `ReservoirListBot.ts` and `ReservoirSaleBot.ts` classes, respectively), and then posts them to the appropriate Discord channels (`Utils/activityTriager.ts`).

- SmartBot Responses

  Artbot has been taught to respond to some specific queries about gas price, curated/playground/factory, etc. when directly queried. This logic lives in `Utils/smartBotResponse.ts`.

- ArtBotGPT Responses

  Artbot has been given the power of GPT-3.5 and given the data of our public docs and smart-contracts repos:

  - https://github.com/ArtBlocks/artblocks-docs
  - https://github.com/ArtBlocks/artblocks-contracts

  This logic lives in `Utils/artGPTResponse.ts` and is queried in Discord via `?artGPT` commands.

## Adding query support for a project

### Definitions

#### Bot ID

A bot ID consists of a project ID and contract name concatinated via a `-`. This is used in the config files to identify which bot should be used where or which bot you're configuring. For Art Blocks projects the contract name is optional and as such the `-` is not required.

An example of a simple bot ID would be `0` for Chromie Squiggles or `0-DOODLE` for The Family Mooks. Contract names are defined in `partnerContracts.json`.

##### Contract Names

Here are the currently valid contract names.

| Partner     | Contract Name | Contract Address                           |
| ----------- | ------------- | ------------------------------------------ |
| Doodle Labs | DOODLE        | 0x28f2d3805652fb5d359486dffb7d08320d403240 |
| Plottables  | PLOTTABLES    | 0xa319C382a702682129fcbF55d514E61a16f97f9c |

### Required Configuration

- `ProjectConfig/channels.json`:
  - key: Discord channel ID
    - value: object:
      - key: `"name"`
        - value: name of Discord channel
      - key: `"projectBotHandlers"`
        - value: object:
          - key: `"default"`
            - value: [Bot ID](#bot-id)
          - (optional) key: `"stringTriggers"`
            - value: object:
              - key: [Bot ID](#bot-id)
                - value: array of strings that trigger artbot to use the project bot
          - (optional) key: `"tokenIdTriggers"`:
            - value: object:
              - key: [Bot ID](#bot-id)
                - value: length-2 array defining range of token IDs that trigger artbot to use the project bot. e.g. [555, null] means all tokens >= 555 should use the project bot defined in key. [100, 200] means all tokens from 100 to 200 should use the project bot bot defined in key.

### Optional Configuration

- `ProjectConfig/projectBots.json`
  - key: [Bot ID](#bot-id)
    - value: object:
      - (optional) key: `"namedMappings"`
        - value: object:
          - (optional) key: `"sets"`
            - value: json filename defining single token labels; located in 'NamedMappings' directory. e.g. `ringerSingles.json`
          - (optional) key: `"singles"`
            value: json filename defining sets of token labels; located in 'NamedMappings' directory. e.g. `ringerSets.json`
- `ProjectConfig/partnerContracts.json`
  - key: contract name
    - value: contract address (lowercase)
- `NamedMappings/<projectName>Singles.json`
  - json file defining trigger names for single tokens. See `ringerSingles.json` for example.
- `NamedMappings/<projectName>Seets.json`
  - json file defining trigger names for single tokens. See `ringerSets.json` for example.

## PBAB instructions

These instructions explain how to configure Art Bot to serve project data in relevant channels.

1. Invite ArtBot to your server by clicking [here](https://discord.com/oauth2/authorize?client_id=794646394420854824&scope=bot&permissions=19520). Note that you must have the "Manage Server" permission on the desired server to invite Art Bot.
2. As a PBAB partner you most likely have a contract of your own. To configure this you will have to follow the [optional configuration](#optional-configuration) scheme in `ProjectConfig/partnerContracts.json` by adding a new entry.

> :warning: Address must be all lowercase characters

**Example Config**

```json
{
  "DOODLE": "0x28f2d3805652fb5d359486dffb7d08320d403240",
  "PLOTTABLES": "0xa319c382a702682129fcbf55d514e61a16f97f9c",
  "<Your contract name>": "<Your contract address>"
}
```

3. Create a pull request following the configuration schema in [required configuration](#required-configuration) to set up Art Bot to listen to a relevant channel or channels. Note that Art Bot must have the proper permissions to view whatever channel it is listening to.

**Example Config**

```json
"880280317477404713": {
    "name": "doodle-labs-the-lab",
    "projectBotHandlers": {
        "default": "0-DOODLE",
        "stringTriggers": {
            "1-DOODLE": [
                "slider"
            ],
            "2-DOODLE": [
                "neo",
                "neogen"
            ]
        }
    }
}
```

4. Please update the [contract names](#contract-names) table in the README if you added a new contract to `partnerContract.json`.
5. Once the pull request goes in you should then be able to query Art Bot for configured projects in the relevant channel(s).

## Contributing to artbot

For now, Artbot development is coordinated informally over Discord. Please reach out to grant#6616, purplehat.eth#7327, or ryley-o.eth#5272 if you think you might be interested in helping out.

Anyone who contributes to Artbot will be eligible to claim a [GitPOAP](https://www.gitpoap.io/gh/ArtBlocks/artbot)
