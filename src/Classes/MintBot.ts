import { Client, TextChannel } from 'discord.js'

const { MessageEmbed } = require('discord.js')
const { ensOrAddress } = require('./APIBots/utils')
const fetch = require('node-fetch')
const projectConfig = require('../ProjectConfig/projectConfig').projectConfig
const MINT_REFRESH_TIME_SECONDS = 10
// const MINT_CONFIG = require('../ProjectConfig/mintBot_config.json')
// const CORE_CONTRACTS = require('../ProjectConfig/coreContracts.json')
// const COLLAB_CONTRACTS = require('../ProjectConfig/collaborationContracts.json')
// Handles all logic and posting of new project mints!

enum MintType {
  CORE,
  COLLAB,
  ENGINE,
  STAGING,
}

class MintBot {
  bot: Client
  mintsToPost: Mint[]
  constructor(bot: Client) {
    this.bot = bot
    this.mintsToPost = []

    // Uncomment when MintBot config is finalized!
    // this.startRoutine()
  }
  // buildContractToChannel(mintType: MintType, channels: Channel[]) {
  //   let contracts = []
  //   switch (mintType) {
  //     case CORE:
  //       contracts = Object.values(CORE_CONTRACTS)
  //     default:
  //       break
  //   }
  //   return contractToChannel
  // }

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
      console.log(this.mintsToPost)
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

    const channel = this.bot.channels?.cache.get(
      projectConfig.chIdByName['block-talk']
    ) as TextChannel
    if (channel) {
      channel.send(embed)
    }
  }
}

module.exports.MintBot = MintBot
