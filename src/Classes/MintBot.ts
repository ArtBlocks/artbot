import { Client, TextChannel } from 'discord.js'
import { mintBot } from '../index'

const { MessageEmbed } = require('discord.js')
const { ensOrAddress } = require('./APIBots/utils')
const fetch = require('node-fetch')
const projectConfig = require('../ProjectConfig/projectConfig').projectConfig
const MINT_REFRESH_TIME_SECONDS = 5
const MINT_CONFIG: {
  [id: string]: string[]
} = require('../ProjectConfig/mintBotConfig.json')
const CORE_CONTRACTS = require('../ProjectConfig/coreContracts.json')
const COLLAB_CONTRACTS = require('../ProjectConfig/collaborationContracts.json')
const STAGING_CONTRACTS = require('../ProjectConfig/stagingContracts.json')
// Handles all logic and posting of new project mints!

enum MintType {
  CORE = 'CORE',
  COLLAB = 'COLLAB',
  ENGINE = 'ENGINE',
  STAGING = 'STAGING',
}

class MintBot {
  bot: Client
  mintsToPost: Mint[]
  contractToChannel: { [id: string]: string[] }
  constructor(bot: Client) {
    this.bot = bot
    this.mintsToPost = []
    this.contractToChannel = this.buildContractToChannel()

    this.startRoutine()
  }

  buildContractToChannel(): { [id: string]: string[] } {
    const contractToChannel: { [id: string]: string[] } = {}
    Object.entries(MINT_CONFIG).forEach(([mintType, channels]) => {
      let contracts: string[] = []
      switch (mintType) {
        case MintType.CORE:
          contracts = Object.values(CORE_CONTRACTS)
          break
        case MintType.COLLAB:
          contracts = Object.values(COLLAB_CONTRACTS)
          break
        case MintType.ENGINE:
          // TODO: Add engine contracts
          break
        case MintType.STAGING:
          contracts = Object.values(STAGING_CONTRACTS)
          break
        default:
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

  // Check and see if the mint has an image rendered yet
  // If it does, report to discord
  // If it doesn't, add it back in the queue to check again later
  async checkMintImage(mint: Mint) {
    const tokenUrl = `https://token.staging.artblocks.io/${mint.tokenId}`
    const artBlocksResponse = await fetch(tokenUrl)
    const artBlocksData = await artBlocksResponse.json()
    if (artBlocksData.image) {
      const imageRes = await fetch(artBlocksData.image)

      // Ensure image is available
      if (imageRes.status === 200) {
        mint.image = artBlocksData.image
        mint.generatorLink = artBlocksData.generator_url
        mint.tokenName = artBlocksData.name
        mint.postToDiscord()
        return true
      }
    }

    return false
  }

  addMint(contractAddress: string, tokenID: string, owner: string) {
    this.mintsToPost.push(new Mint(this.bot, contractAddress, tokenID, owner))
  }

  // Routine that runs every MINT_REFRESH_TIME_SECONDS seconds and
  // tries to report any new mints to the discord!
  startRoutine() {
    setInterval(async () => {
      console.log('Starting mint routine')
      const goodMints: Mint[] = []
      await Promise.all(
        this.mintsToPost.map(async (mint) => {
          const goodMint = await this.checkMintImage(mint)
          if (goodMint) {
            goodMints.push(mint)
          }
        })
      )
      this.mintsToPost = this.mintsToPost.filter(
        (mint) => !goodMints.includes(mint)
      )
    }, MINT_REFRESH_TIME_SECONDS * 1000)
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
  }

  async postToDiscord() {
    // Create embed we will be sending
    const embed = new MessageEmbed()
    const ownerText = await ensOrAddress(this.owner)

    const baseABProfile = 'https://www.artblocks.io/user/'
    const ownerProfile = baseABProfile + this.owner
    embed.addField('Minted by', `[${ownerText}](${ownerProfile})`)

    // Update thumbnail image to use larger variant from Art Blocks API.
    embed.setImage(this.image)

    // Add inline field for viewing live script on Art Blocks.
    embed.addField(
      'Live Script',
      `[view on artblocks.io](${this.generatorLink})`,
      true
    )
    // Update to remove author name and to reflect this info in piece name
    // rather than token number as the title and URL field..
    embed.author = null
    embed.setTitle(`Minted: ${this.tokenName}`)

    mintBot.contractToChannel[this.contractAddress].forEach(
      (channel: string) => {
        const discordChannel = this.bot.channels?.cache.get(
          projectConfig.chIdByName[channel]
        ) as TextChannel
        if (discordChannel) {
          discordChannel.send(embed)
        }
      }
    )
  }
}

module.exports.MintBot = MintBot
