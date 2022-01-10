# ArtBot: The Art Blocks Discord Bot

[![CircleCI](https://circleci.com/gh/ArtBlocks/artbot/tree/main.svg?style=svg)](https://circleci.com/gh/ArtBlocks/artbot/tree/main)

The Discord bot for [ArtBlocks](http://artblocks.io/).

ArtBot is a Node.js application.  It uses the [Yarn Package Manager](https://yarnpkg.com/) to manage dependencies and run the application.  It can be interacted with via Discord messages.

## Running artbot

* Verify you have Node.js and npm installed.  If not, you can refer to the [Node.js official page](https://nodejs.org/) to get started.

```
node -v
npm -v
```

* Install Yarn Package Manager.  For detailed instructions, refer to the [Yarn official page](https://yarnpkg.com/getting-started/install).

```
npm install -g yarn
```

* Install tbe package dependencies
```
yarn install
```

* Join the a-t Discord Server

Artbot is based on the [discord.js](https://discord.js.org/) package, and is exclusively concerned with processing and sending Discord messages.  If you want to be able to interact with it, joining the Artbot test Discord server is the way to go.  https://discord.gg/W6eYPpEk3a
  
* Set up `.env` file based on `.env.example`.

* Run the application
```
yarn start
```
  
## Basic structure of artbot
  
The core engine of Artbot is built around the discord.js package.  It serves several functions, all of which are based on listening to messages in the ArtBlocks Discord, and responding with other messages.  This core functionality is driven from index.js, and there are several helper Classes and Utility packages that assist with this logic.
  
* Project Queries
  
  One of the most widely used features is Artbot's ability to respond to a #[n] [project_name] query with a link to the appropriate token w/ embedded image.  Currently this is implemented via the ProjectBot class.  
  - Curated/Playground projects: 
    - ProjectBot configurations are defined via json files in the `ProjectConfig/` directory.  
  - Factory projects:
    - There is special handling for Art Blocks Factory projects in the FactoryBot class which queries the ArtBlocks hosted subgraph to cache any Factory Projects it can find, which is easier to maintain, but less flexible in the syntax we can respond to.
  - Random: 
    - There's a special case in RandomBot which doesn't actually know about any of the projects, but simply responds to a `#?` query by looking for a random project number and mint number.
  
* OpenSea Activity Feeds
  
  Another well known feature of artbot is its ability to parse a feed of OpenSea activity data.  There is a hidden channel in the ArtBlocks Discord that receives a raw feed of all Art Blocks OpenSea Activity data.  Artbot then takes these messages and posts the appropriate events in the correct channel.  This includes several channels on the AB Discord, as well as a few adjacent Discords, like SquiggleDAO.  This logic lives in `Utils/activityTriager.js` 
  
* SmartBot Responses
  
  Artbot has been taught to respond to some specific queries about gas price, curated/playground/factory, etc.  when directly queried.  This logic lives in `Utils/smartBotResponse.js`.
  
* Giveaway queries
  
  Artbot can also create giveaways through use of the discord-giveaways package. They currently require Mod privileges to initiate.
  

## Adding qyery support for a project
**Curated & Playground Projects**

Supported Curated and playground projects are defined via json files in the `ProjectConfig/` directory.

Required Definitions:
- `ProjectConfig/channels.json`:
  - key: Discord channel ID
    - value: object:
      - key: `"name"`
        - value: name of Discord channel
      - key: `"projectBotHandlers"`
        - value: object:
          - key: `"default"`
            - value: ProjectBotName (as defined in `projectBots.json`)
          - (optional) key: `"stringTriggers"`
            - value: object:
              - key: ProjectBotName (as defined in `projectBots.json`)
                - value: array of strings that trigger artbot to use the project bot
          - (optional) key: `"tokenIdTriggers"`:
            - value: object:
              - key: ProjectBotName (as defined in `projectBots.json`)
                - value: length-2 array defining range of token IDs that trigger artbot to use the project bot. e.g. [555, null] means all tokens >= 555 should use the project bot defined in key. [100, 200] means all tokens from 100 to 200 should use the project bot bot defined in key.
- `ProjectConfig/projectBots.json`
  - key: project bot name
    - value: object:
      - key: `"projectNumber"`
        value: project ID this bot will look up tokens for
      - key: `"coreContract"`:
        value: "V2" for current core contract at `0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270`
      - key: `"editionSize"`:
        - value: maximum number of invocations allows on project
      - key: `"projectName"`:
        - value: Name of project
      - (optional) key: `"namedMappings"`
        - value: object:
          - (optional) key: `"sets"`
            - value: json file name defining single token labels; located in 'NamedMappings' directory. e.g. `ringerSingles.json`
          - (optional) key: `"singles"`
            value: json file name defining sets of token labels; located in 'NamedMappings' directory. e.g. `ringerSets.json`

Optional Definitions
- `NamedMappings/<projectName>Singles.json`
  - json file defining trigger names for single tokens. See `ringerSingles.json` for example.
- `NamedMappings/<projectName>Seets.json`
  - json file defining trigger names for single tokens. See `ringerSets.json` for example.

**Factory Projects**

Factory projects are automatically handled by artbot and may be queried from the Art Blocks Discord channel titled `factory-projects`. 

An example artbot query for a factory project is: `#146 Pieces of Me`

## Contributing to artbot
  
  For now, Artbot development is coordinated informally over Discord.  Please reach out to purplehat.eth#7327 or ryley-o.eth#5272 if you think you might be interested in helping out.
 

  
