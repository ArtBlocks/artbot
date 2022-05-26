# ArtBot: The Art Blocks Discord Bot

[![CircleCI](https://circleci.com/gh/ArtBlocks/artbot/tree/main.svg?style=svg)](https://circleci.com/gh/ArtBlocks/artbot/tree/main)

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

- format your code!

```bash
yarn format
```

- Run unit tests

```bash
yarn test
```

## Basic structure of artbot

The core engine of Artbot is built around the discord.js package. It serves several functions, all of which are based on listening to messages in the ArtBlocks Discord, and responding with other messages. This core functionality is driven from index.js, and there are several helper Classes and Utility packages that assist with this logic.

- Project Queries

  One of the most widely used features is Artbot's ability to respond to a #[n] [project_name] query with a link to the appropriate token w/ embedded image. Currently this is implemented via the ProjectBot class.

  - Curated/Playground projects:
    - ProjectBot configurations are defined via json files in the `ProjectConfig/` directory.
  - Factory projects:
    - There is special handling for Art Blocks Factory projects in the FactoryBot class which queries the ArtBlocks hosted subgraph to cache any Factory Projects it can find, which is easier to maintain, but less flexible in the syntax we can respond to.
  - Random:
    - There's a special case in RandomBot which doesn't actually know about any of the projects, but simply responds to a `#?` query by looking for a random project number and mint number.

- OpenSea Activity Feeds

  Another well known feature of artbot is its ability to parse a feed of OpenSea activity data. There is a hidden channel in the ArtBlocks Discord that receives a raw feed of all Art Blocks OpenSea Activity data. Artbot then takes these messages and posts the appropriate events in the correct channel.  
  This includes several channels on the AB Discord, as well as a few adjacent Discords, like SquiggleDAO. This logic lives in `Utils/activityTriager.js`

- SmartBot Responses

  Artbot has been taught to respond to some specific queries about gas price, curated/playground/factory, etc. when directly queried. This logic lives in `Utils/smartBotResponse.js`.

- Giveaway queries

  Artbot can also create giveaways through use of the discord-giveaways package. They currently require Mod privileges to initiate.

## Adding query support for a project

**Curated & Playground Projects**

Supported Curated and playground projects are defined via json files in the `ProjectConfig/` directory.

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

**Factory Projects**

Factory projects are automatically handled by artbot and may be queried from the Art Blocks Discord channel titled `factory-projects`.

An example artbot query for a factory project is: `#146 Pieces of Me`

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

For now, Artbot development is coordinated informally over Discord. Please reach out to purplehat.eth#7327 or ryley-o.eth#5272 if you think you might be interested in helping out.

Please write tests for all new features!
