import { Client, EmbedBuilder, TextChannel } from 'discord.js'
import { artIndexerBot, mintBot, projectConfig } from '../index'
import axios from 'axios'
import {
  MINT_UTM,
  buildArtBlocksTokenURL,
  buildGeneratorUrl,
  buildMediaUrl,
  getCollectionType,
  replaceToPNG,
  waitForEngineContracts,
  waitForStudioContracts,
} from './APIBots/utils'
import { ensOrAddress } from './APIBots/utils'
import { TwitterBot } from './TwitterBot'

// When true, only post mints from mainnet (chain ID 1). Non-mainnet mints are skipped.
// Set to false in a couple weeks to enable L2/other chain mints.
const HIDE_NON_MAINNET_MINTS = true

const MAINNET_CHAIN_ID = 1

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

  // Go through all mints in the queue and make sure the media image exists.
  // Uses event data only (no token API call). Polls media URL until available, then posts.
  async checkAndPostMints() {
    if (Object.keys(this.mintsToPost).length === 0) {
      return
    }

    try {
      await Promise.all(
        Object.entries(this.mintsToPost).map(async ([id, mint]) => {
          try {
            const assetUrl = replaceToPNG(
              buildMediaUrl(mint.chainId, mint.contractAddress, mint.tokenId)
            )

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

              // If we get here, the image is valid - build embed from event data
              delete this.mintsToPost[id]
              mint.image = assetUrl
              mint.generatorLink = buildGeneratorUrl(
                mint.chainId,
                mint.contractAddress,
                mint.tokenId
              )
              mint.tokenName = `${mint.projectName} #${mint.invocation}`
              mint.artistName = '' // Not in mint event; omit from display
              mint.artblocksUrl = buildArtBlocksTokenURL(
                mint.chainId,
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
    projectId: string,
    projectName: string,
    chainId: number
  ) {
    console.log(
      'NEW MINT',
      contractAddress,
      tokenID,
      owner,
      'chainId:',
      chainId
    )
    const id = `${contractAddress}-${tokenID}`

    if (!this.contractToChannel[contractAddress]) {
      console.log('Skipping mint for contract not in config')
      return
    }

    if (HIDE_NON_MAINNET_MINTS && chainId !== MAINNET_CHAIN_ID) {
      console.log(
        `Skipping mint for non-mainnet chain ${chainId} (HIDE_NON_MAINNET_MINTS=true)`
      )
      return
    }

    artIndexerBot.checkMintedOut(projectId, invocation)

    this.mintsToPost[id] = new Mint(
      this.bot,
      contractAddress,
      tokenID,
      owner,
      chainId,
      projectName,
      invocation
    )
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
  chainId: number
  projectName: string
  invocation: string
  image: string
  generatorLink: string
  tokenName: string
  artistName: string
  artblocksUrl: string
  constructor(
    bot: Client,
    contractAddress: string,
    tokenId: string,
    owner: string,
    chainId: number,
    projectName: string,
    invocation: string
  ) {
    this.bot = bot
    this.contractAddress = contractAddress
    this.tokenId = tokenId
    this.owner = owner
    this.chainId = chainId
    this.projectName = projectName
    this.invocation = invocation
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

    embed.setTitle(`Minted: ${this.tokenName}`)
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
