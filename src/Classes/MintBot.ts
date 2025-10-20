import { Client, EmbedBuilder, TextChannel } from 'discord.js'
import { artIndexerBot, mintBot, projectConfig } from '../index'
import axios from 'axios'
import {
  MINT_UTM,
  getCollectionType,
  getTokenApiUrl,
  getTokenUrl,
  replaceToPNG,
  waitForEngineContracts,
  waitForStudioContracts,
} from './APIBots/utils'
import { ensOrAddress } from './APIBots/utils'
import { TwitterBot } from './TwitterBot'

const MINT_CONFIG: {
  [id: string]: string[]
} = require('../ProjectConfig/mintBotConfig.json')
const CORE_CONTRACTS = require('../ProjectConfig/coreContracts.json')
const COLLAB_CONTRACTS = require('../ProjectConfig/collaborationContracts.json')
const STAGING_CONTRACTS = require('../ProjectConfig/stagingContracts.json')
const EXPLORATIONS_CONTRACTS = require('../ProjectConfig/explorationsContracts.json')
const PARTNER_CONTRACTS = require('../ProjectConfig/partnerContracts.json')

const MINT_REFRESH_TIME_SECONDS = process.env.MINT_REFRESH_TIME_SECONDS ?? '60'

export enum CollectionType {
  CORE = 'CORE',
  EXPLORATIONS = 'EXPLORATIONS',
  COLLAB = 'COLLAB',
  ENGINE = 'ENGINE',
  STAGING = 'STAGING',
  STUDIO = 'STUDIO',
}

// Handles all logic and posting of new project mints!
export class MintBot {
  bot: Client
  abTwitterBot?: TwitterBot
  newMints: { [id: string]: Mint } = {}
  intervalId?: NodeJS.Timeout
  mintsToPost: { [id: string]: Mint } = {}
  contractToChannel: { [id: string]: string[] } = {}
  contractToTwitterBot: { [id: string]: TwitterBot } = {}
  constructor(bot: Client, abTwitterBot?: TwitterBot) {
    this.bot = bot
    this.abTwitterBot = abTwitterBot
    this.buildContractToChannel()
    this.startRoutine()
  }

  async buildContractToChannel() {
    const contractToChannel: { [id: string]: string[] } = {}
    const engineContracts = await waitForEngineContracts()
    const studioContracts = await waitForStudioContracts()
    Object.entries(MINT_CONFIG).forEach(([mintType, channels]) => {
      let contracts: string[] = []
      switch (mintType) {
        case CollectionType.CORE:
          contracts = Object.values(CORE_CONTRACTS)
          break
        case CollectionType.EXPLORATIONS:
          contracts = Object.values(EXPLORATIONS_CONTRACTS)
          break
        case CollectionType.COLLAB:
          contracts = Object.values(COLLAB_CONTRACTS)
          break
        case CollectionType.ENGINE:
          contracts = engineContracts ?? []
          break
        case CollectionType.STUDIO:
          contracts = studioContracts ?? []
          break
        case CollectionType.STAGING:
          contracts = Object.values(STAGING_CONTRACTS)
          break
        default:
          // Non-MintTypes are partner contracts that forward to other discord servers/channels
          contracts = PARTNER_CONTRACTS[mintType]
          if (typeof contracts === 'string') {
            contracts = [contracts]
          }
          break
      }
      channels.forEach((channel) => {
        contracts.forEach((contract) => {
          if (!contractToChannel[contract]) {
            contractToChannel[contract] = []
          }
          contractToChannel[contract].push(channel)
        })
      })
    })

    this.contractToChannel = contractToChannel
  }

  // Go through all mints in the queue and make sure the image exists
  // If it does, report to discord and remove from the queue
  // If it doesn't, add it back in the queue to check again later
  async checkAndPostMints() {
    if (Object.keys(this.mintsToPost).length === 0) {
      return
    }

    try {
      await Promise.all(
        Object.entries(this.mintsToPost).map(async ([id, mint]) => {
          try {
            const tokenUrl = getTokenApiUrl(mint.contractAddress, mint.tokenId)
            const artBlocksResponse = await axios.get(tokenUrl)

            const artBlocksData = artBlocksResponse.data
            let assetUrl = artBlocksData?.preview_asset_url
            if (!assetUrl) {
              console.log(`No preview asset URL for mint ${id}`)
              return
            }

            assetUrl = replaceToPNG(assetUrl)

            // Validate URL format
            try {
              new URL(assetUrl)
            } catch (e) {
              console.log(`Invalid asset URL for mint ${id}: ${assetUrl}`)
              return
            }

            // Check image with timeout and content-type validation
            try {
              const imageRes = await axios.get(assetUrl, {
                timeout: 10000, // 10 second timeout
                validateStatus: (status) => status === 200,
                headers: { Accept: 'image/*' },
              })

              const contentType = imageRes.headers['content-type']
              if (!contentType?.startsWith('image/')) {
                console.log(
                  `Invalid content type for mint ${id}: ${contentType}`
                )
                return
              }

              // If we get here, the image is valid
              delete this.mintsToPost[id]
              mint.image = assetUrl
              mint.generatorLink = artBlocksData.generator_url
              mint.tokenName = artBlocksData.name
              mint.artistName = artBlocksData.artist
              mint.artblocksUrl = getTokenUrl(
                artBlocksData.external_url,
                mint.contractAddress,
                mint.tokenId
              )
              await mint.postToDiscord()
              await this.postToTwitter(mint)
            } catch (e) {
              console.log(`Error fetching image for mint ${id}:`, e)
              // Keep in queue to retry later
              return
            }
          } catch (e) {
            console.log(`Error processing mint ${id}:`, e)
            return
          }
        })
      )
    } catch (e) {
      console.error('Error in checkAndPostMints:', e)
    }
  }

  // Function to add a new mint to the queue!
  addMint(
    contractAddress: string,
    tokenID: string,
    owner: string,
    invocation: string,
    projectId: string
  ) {
    console.log('NEW MINT', contractAddress, tokenID, owner)
    const id = `${contractAddress}-${tokenID}`

    if (!this.contractToChannel[contractAddress]) {
      console.log('Skipping mint for contract not in config')
      return
    }

    artIndexerBot.checkMintedOut(projectId, invocation)

    this.mintsToPost[id] = new Mint(this.bot, contractAddress, tokenID, owner)
  }

  // Routine that runs every MINT_REFRESH_TIME_SECONDS seconds and
  // tries to report any new mints to the discord!
  startRoutine() {
    this.intervalId = setInterval(async () => {
      if (Object.keys(this.mintsToPost).length > 0) {
        console.log(`${Object.keys(this.mintsToPost).length} mints to post`)
      }
      await this.checkAndPostMints()
    }, parseInt(MINT_REFRESH_TIME_SECONDS) * 1000)
  }

  async postToTwitter(mint: Mint) {
    const collectionType = await getCollectionType(mint.contractAddress)
    if (
      collectionType !== CollectionType.ENGINE &&
      collectionType !== CollectionType.STAGING
    ) {
      // Turned off for now to avoid rate limiting
      // this.abTwitterBot?.sendToTwitter(mint)
    }
    if (this.contractToTwitterBot[mint.contractAddress]) {
      this.contractToTwitterBot[mint.contractAddress].tweetMint(mint)
    }
  }

  /**
   * Cleanup method to be called when the bot is being destroyed
   */
  cleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
    // Clear any pending mints
    this.mintsToPost = {}
  }
}

export class Mint {
  bot: Client
  contractAddress: string
  tokenId: string
  owner: string
  image: string
  generatorLink: string
  tokenName: string
  artistName: string
  artblocksUrl: string
  constructor(
    bot: Client,
    contractAddress: string,
    tokenId: string,
    owner: string
  ) {
    this.bot = bot
    this.contractAddress = contractAddress
    this.tokenId = tokenId
    this.owner = owner
    this.image = ''
    this.generatorLink = ''
    this.tokenName = ''
    this.artistName = ''
    this.artblocksUrl = ''
  }

  async postToDiscord() {
    // Create embed we will be sending
    const embed = new EmbedBuilder()
    const ownerText = await ensOrAddress(this.owner)

    const baseABProfile = 'https://www.artblocks.io/user/'
    const ownerProfile = baseABProfile + this.owner + MINT_UTM

    embed.setTitle(`Minted: ${this.tokenName} - ${this.artistName}`)
    if (this.artblocksUrl) {
      embed.setURL(this.artblocksUrl + MINT_UTM)
    }
    embed.setImage(this.image)
    embed.setColor('#c9fdc9')

    embed.addFields(
      {
        name: 'Minted by',
        value: `[${ownerText}](${ownerProfile})`,
        inline: true,
      },
      {
        name: 'Live Script',
        value: `[Generator](${this.generatorLink + MINT_UTM})`,
        inline: true,
      }
    )

    mintBot.contractToChannel[this.contractAddress].forEach(
      (channel: string) => {
        const discordChannel = this.bot.channels?.cache.get(
          projectConfig.chIdByName[channel]
        ) as TextChannel
        if (discordChannel) {
          discordChannel.send({ embeds: [embed] })
        }
      }
    )
  }
}
