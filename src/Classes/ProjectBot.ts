import { AxiosError } from 'axios'
import { Message } from 'discord.js'
import { PROJECTBOT_UTM } from './APIBots/utils'
import {
  getProjectInvocations,
  getTokenOwnerAddress,
} from '../Utils/parseArtBlocksAPI'
import { ensOrAddress } from './APIBots/utils'

const { EmbedBuilder } = require('discord.js')
const axios = require('axios')
const Web3 = require('web3')
const { ProjectHandlerHelper } = require('./ProjectHandlerHelper')

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

const EMBED_COLOR = 0xff0000
const UNKNOWN_ADDRESS = 'unknown'
const UNKNOWN_USERNAME = 'unknown'

const ONE_MILLION = 1e6

/**
 * Bot for handling projects
 */
export class ProjectBot {
  id: string
  projectNumber: number
  coreContract: string
  editionSize: number
  maxEditionSize: number
  projectName: string
  projectActive: boolean
  namedMappings: any
  artistName: string
  collection?: string
  heritageStatus?: string
  startTime?: Date

  constructor(
    id: string,
    projectNumber: number,
    coreContract: string,
    editionSize: number,
    maxEditionSize: number,
    projectName: string,
    projectActive: boolean,
    namedMappings: any,
    artistName = '',
    collection?: string,
    heritageStatus?: string,
    startTime?: Date
  ) {
    this.id = id
    this.projectNumber = projectNumber
    this.coreContract = coreContract
    this.editionSize = editionSize
    this.maxEditionSize = maxEditionSize
    this.projectName = projectName
    this.projectActive = projectActive
    this.namedMappings = namedMappings
      ? ProjectBot.getProjectHandlerHelper(namedMappings)
      : undefined
    this.artistName = artistName
    this.collection = collection
    this.heritageStatus = heritageStatus
    this.startTime = startTime
  }

  static getProjectHandlerHelper({ singles, sets }: any) {
    const singlesMap = singles ? require(`../NamedMappings/${singles}`) : null
    const setsMap = sets ? require(`../NamedMappings/${sets}`) : null
    return new ProjectHandlerHelper(singlesMap, setsMap)
  }

  async handleNumberMessage(msg: Message) {
    let content = msg.content
    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      )
      return
    }

    if (content.toLowerCase().includes('named')) {
      if (this.namedMappings) {
        msg.channel.send({ embeds: [this.namedMappings.listMappings()] })
      } else {
        msg.channel.send(
          new EmbedBuilder()
            // Set the title of the field.
            .setTitle('Named Pieces / Sets')
            .setDescription(
              'These are special tokens or sets of tokens that have been given a name by the community! Try them out here with `#<token>` or `#? <set>`'
            )
            .addFields({
              name: 'No named tokens or sets!',
              value:
                "I don't have any named tokens or sets for this project yet! [You can propose some here](https://github.com/ArtBlocks/artbot/issues/new/choose)",
            })
        )
      }
      return
    }

    // decode any mappings
    if (this.namedMappings) {
      content = this.namedMappings.transform(content)
    }

    const detailsRequested = content.toLowerCase().includes('detail')
    const afterTheHash = content.substring(1)
    let pieceNumber
    if (afterTheHash[0] == '?') {
      pieceNumber = Math.floor(Math.random() * this.editionSize)
    } else {
      pieceNumber = parseInt(afterTheHash)
    }

    // If project is still minting, refresh edition size to see if piece is in bounds
    if (pieceNumber >= this.editionSize && pieceNumber < this.maxEditionSize) {
      const invocations: number | null = await getProjectInvocations(this.id)

      if (invocations) {
        this.editionSize = invocations
      }
    }

    if (pieceNumber >= this.editionSize || pieceNumber < 0) {
      msg.channel.send(
        `Invalid #, only ${this.editionSize} pieces minted for ${this.projectName}.`
      )
      return
    }

    const tokenID = pieceNumber + this.projectNumber * 1e6

    this.sendMetaDataMessage(msg, tokenID.toString(), detailsRequested).catch(
      (err: Error | AxiosError) => {
        console.error('Error sending metadata message', err)
        if (axios.isAxiosError(err)) {
          const axErr = err as AxiosError
          if (axErr?.code === '429') {
            msg.channel.send(
              'Sorry! Our API is temporarily rate limited, please try again in a little bit'
            )
          }
        }
      }
    )
  }

  /**
   * Constructs and sends discord message
   * @param {*} openSeaData
   * @param {*} msg
   * @param {*} tokenID
   * @param {*} detailsRequested
   */
  async sendMetaDataMessage(
    msg: Message,
    tokenID: string,
    detailsRequested: boolean
  ) {
    const artBlocksResponse = await axios.get(
      `https://token.artblocks.io/${this.coreContract}/${tokenID}`
    )
    const artBlocksData = artBlocksResponse.data

    const osUrl = `https://api.opensea.io/api/v1/asset/${this.coreContract}/${tokenID}/`

    const titleLink =
      artBlocksData.external_url !== ''
        ? artBlocksData.external_url + PROJECTBOT_UTM
        : osUrl

    let title = artBlocksData.name + ' - ' + artBlocksData.artist

    // If PBAB project, add PBAB name to front
    if (
      artBlocksData.platform &&
      artBlocksData.platform !== '' &&
      !artBlocksData.platform.includes('Art Blocks')
    ) {
      if (artBlocksData.platform === 'MOMENT') {
        artBlocksData.platform = 'Bright Moments'
      }

      title = artBlocksData.platform + ' - ' + title
    }

    const ownerAddress = await getTokenOwnerAddress(
      `${this.coreContract}-${tokenID}`
    )
    let ownerText = ownerAddress ? await ensOrAddress(ownerAddress) : ''
    if (ownerText.startsWith('0x') && !ownerText.endsWith('.eth')) {
      ownerText = ownerText.substring(0, 6) + '...' + ownerText.substring(38)
    }

    const ownerProfileLink = ownerAddress
      ? 'https://www.artblocks.io/user/' + ownerAddress
      : ''
    // If user did *not* request full details, return just a large image,
    // along with a link to the OpenSea page and ArtBlocks live script.
    if (!detailsRequested) {
      const embedContent = new EmbedBuilder()
        // Set the title of the field.
        .setTitle(title)
        // Add link to title.
        .setURL(titleLink)
        // Set the full image for embed.
        .setImage(artBlocksData.image)

      if (ownerText) {
        embedContent.addFields({
          name: 'Owner',
          value: `[${ownerText}](${ownerProfileLink})`,
          inline: true,
        })
      }
      embedContent.addFields({
        name: 'Live Script',
        value: `[Generator](${artBlocksData.generator_url})`,
        inline: true,
      })
      msg.channel.send({ embeds: [embedContent] })
      return
    }

    // Otherwise, return full metadata for the asset.
    const { features } = artBlocksData
    const assetFeatures =
      !!features && Object.keys(features).length
        ? Object.keys(features)
            .map((key) => `${key}: ${features[key]}`)
            .join('\n')
        : 'Not yet available.'
    const embedContent = new EmbedBuilder()
      // Set the title of the field.
      .setTitle(title)
      // Add link to title.
      .setURL(titleLink)
      // Set the color of the embed.
      .setColor(EMBED_COLOR)
      // Set the main content of the embed
      .setThumbnail(artBlocksData.image)

    if (ownerText) {
      embedContent.addFields({
        name: 'Owner',
        value: `[${ownerText}](${ownerProfileLink})`,
        inline: true,
      })
    }
    embedContent.addFields(
      {
        name: 'Live Script',
        value: `[Generator](${artBlocksData.generator_url})`,
        inline: true,
      },
      {
        name: 'Features',
        value: assetFeatures,
      }
    )

    msg.channel.send({ embeds: [embedContent] })
  }

  parseSaleInfo(saleInfo: any) {
    if (saleInfo !== null && saleInfo.event_type == 'successful') {
      const eventDate = new Date(saleInfo.created_date).toLocaleDateString()
      const sellerAccount = saleInfo.transaction.to_account
      let sellerAddress
      let sellerAddressPreview
      let sellerUsername
      if (sellerAccount !== null) {
        sellerAddress = sellerAccount.address
        sellerAddressPreview =
          sellerAddress !== null ? sellerAddress.slice(0, 8) : UNKNOWN_ADDRESS
        sellerUsername =
          sellerAccount.user !== null
            ? sellerAccount.user.username
            : UNKNOWN_USERNAME
        if (sellerUsername === null) {
          sellerUsername = UNKNOWN_USERNAME
        }
      }

      return {
        name: 'Last Sale',
        value: `Sold for ${web3.utils.fromWei(
          saleInfo.total_price,
          'ether'
        )}Ξ by [${sellerAddressPreview}](https://opensea.io/accounts/${sellerAddress}) (${sellerUsername}) on ${eventDate}`,
        inline: true,
      }
    }
    return {
      name: 'Last Sale',
      value: 'N/A',
      inline: true,
    }
  }

  parseNumSales(numSales: number) {
    if (numSales == 0) {
      return 'None'
    }
    return `${numSales}`
  }

  async sendBirthdayMessage(channels: any, projectConfig: any) {
    try {
      console.log('sending birthday message(s) for:', this.projectName)

      const artBlocksResponse = await axios.get(
        `https://token.artblocks.io/${this.coreContract}/${
          this.projectNumber * ONE_MILLION
        }`
      )
      const artBlocksData = await artBlocksResponse.data
      if (
        !artBlocksData ||
        !artBlocksData.image ||
        !artBlocksData.collection_name ||
        !artBlocksData.artist
      ) {
        return
      }
      const title = `:tada:  Happy Birthday to ${artBlocksData.collection_name}!  :tada:`

      const embedContent = new EmbedBuilder()
        .setColor('#9370DB')
        .setTitle(title)
        .setImage(artBlocksData.image)
        .setDescription(
          `${
            this.projectName
          } was released on this day in ${this.startTime?.getFullYear()}! 
        
        What are your favorite outputs from ${this.projectName}?

        [Explore the full project here](${
          artBlocksData.external_url + PROJECTBOT_UTM
        })
        `
        )
        .setFooter(`${artBlocksData.name}`)

      // Send all birthdays to #block-talk

      let channel = channels.get(projectConfig.chIdByName['block-talk'])
      channel.send({ embeds: [embedContent] })

      if (projectConfig.projectToChannel[this.projectNumber]) {
        // Send in artist channel if one exists
        channel = channels.get(
          projectConfig.projectToChannel[this.projectNumber]
        )
        channel.send({ embeds: [embedContent] })
      } else {
        // Otherwise send in #factory-projects
        channel = channels.get(projectConfig.chIdByName['factory-projects'])
        channel.send({ embeds: [embedContent] })
      }
    } catch (err) {
      console.error(
        'Error sending birthday message for:',
        this.projectName,
        err
      )
    }
    return
  }
}
