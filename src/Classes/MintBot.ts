import { Client, EmbedBuilder, TextChannel } from 'discord.js'
import { ENGINE_CONTRACTS, mintBot } from '../index'
import axios, { AxiosError } from 'axios'
import { getTokenApiUrl } from './APIBots/utils'
import { ensOrAddress } from './APIBots/utils'

const projectConfig = require('../ProjectConfig/projectConfig').projectConfig
const MINT_CONFIG: {
  [id: string]: string[]
} = require('../ProjectConfig/mintBotConfig.json')
const CORE_CONTRACTS = require('../ProjectConfig/coreContracts.json')
const COLLAB_CONTRACTS = require('../ProjectConfig/collaborationContracts.json')
const STAGING_CONTRACTS = require('../ProjectConfig/stagingContracts.json')
const EXPLORATIONS_CONTRACTS = require('../ProjectConfig/explorationsContracts.json')
const PARTNER_CONTRACTS = require('../ProjectConfig/partnerContracts.json')

const MINT_REFRESH_TIME_SECONDS = process.env.MINT_REFRESH_TIME_SECONDS ?? '60'

enum MintType {
  CORE = 'CORE',
  EXPLORATIONS = 'EXPLORATIONS',
  COLLAB = 'COLLAB',
  ENGINE = 'ENGINE',
  STAGING = 'STAGING',
}

// Handles all logic and posting of new project mints!
export class MintBot {
  bot: Client
  newMints: { [id: string]: Mint } = {}
  mintsToPost: { [id: string]: Mint } = {}
  contractToChannel: { [id: string]: string[] }
  constructor(bot: Client) {
    this.bot = bot
    this.contractToChannel = this.buildContractToChannel()

    this.startRoutine()
  }

  buildContractToChannel(): { [id: string]: string[] } {
    const contractToChannel: { [id: string]: string[] } = {}
    Object.entries(MINT_CONFIG).forEach(async ([mintType, channels]) => {
      let contracts: string[] = []
      switch (mintType) {
        case MintType.CORE:
          contracts = Object.values(CORE_CONTRACTS)
          break
        case MintType.EXPLORATIONS:
          contracts = Object.values(EXPLORATIONS_CONTRACTS)
          break
        case MintType.COLLAB:
          contracts = Object.values(COLLAB_CONTRACTS)
          break
        case MintType.ENGINE:
          contracts = await ENGINE_CONTRACTS
          break
        case MintType.STAGING:
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

    return contractToChannel
  }

  // Go through all mints in the queue and make sure the image exists
  // If it does, report to discord and remove from the queue
  // If it doesn't, add it back in the queue to check again later
  async checkAndPostMints() {
    await Promise.all(
      Object.entries(this.mintsToPost).map(async ([id, mint]) => {
        const tokenUrl = getTokenApiUrl(mint.contractAddress, mint.tokenId)

        let artBlocksResponse
        try {
          artBlocksResponse = await axios.get(tokenUrl)
        } catch (e) {
          const axiosError = e as AxiosError
          if (axiosError && e.response?.status === 404) {
            console.log('Mint for inactive project')
            delete this.mintsToPost[id]
            return
          }
          console.log(`Error on fetching token API for ${id}`, e)
          return
        }

        try {
          const artBlocksData = artBlocksResponse.data
          if (artBlocksData.image) {
            const imageRes = await axios.get(artBlocksData.image)
            // Double check to ensure image is available
            if (imageRes.status === 200) {
              delete this.mintsToPost[id]
              mint.image = artBlocksData.image
              mint.generatorLink = artBlocksData.generator_url
              mint.tokenName = artBlocksData.name
              mint.artistName = artBlocksData.artist
              mint.artblocksUrl = artBlocksData.external_url
              mint.postToDiscord()
            }
          }
        } catch (e) {
          console.log(`Error getting mint ${id}:`, e)
          return
        }
      })
    )
  }

  // Function to add a new mint to the queue!
  addMint(contractAddress: string, tokenID: string, owner: string) {
    console.log('NEW MINT', contractAddress, tokenID, owner)
    const id = `${contractAddress}-${tokenID}`

    if (parseInt(tokenID) % 1e6 === 0) {
      console.log('Skipping mint #0')
      return
    }

    if (!this.contractToChannel[contractAddress]) {
      console.log('Skipping mint for contract not in config')
      return
    }

    this.mintsToPost[id] = new Mint(this.bot, contractAddress, tokenID, owner)
  }

  // Routine that runs every MINT_REFRESH_TIME_SECONDS seconds and
  // tries to report any new mints to the discord!
  startRoutine() {
    setInterval(async () => {
      if (Object.keys(this.mintsToPost).length > 0) {
        console.log(`${Object.keys(this.mintsToPost).length} mints to post`)
      }
      await this.checkAndPostMints()
    }, parseInt(MINT_REFRESH_TIME_SECONDS) * 1000)
  }
}

class Mint {
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
    const ownerProfile = baseABProfile + this.owner

    embed.setTitle(`Minted: ${this.tokenName} - ${this.artistName}`)
    embed.setURL(this.artblocksUrl)
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
        value: `[Generator](${this.generatorLink})`,
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
