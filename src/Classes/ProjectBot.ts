import axios from 'axios'
import {
  Channel,
  Collection,
  EmbedBuilder,
  Message,
  TextChannel,
} from 'discord.js'
import {
  PROJECTBOT_BUY_UTM,
  PROJECTBOT_EXPLORE_UTM,
  PROJECTBOT_UTM,
  ethFromWeiString,
  getProjectUrl,
  getTokenApiUrl,
  getTokenUrl,
  isCoreContract,
} from './APIBots/utils'

import { ensOrAddress, replaceVideoWithGIF } from './APIBots/utils'
import {
  getProjectInvocations,
  getRandomOobForProject,
  getToken,
} from '../Data/queryGraphQL'
import { CHANNEL_BLOCK_TALK, discordClient, triviaBot } from '..'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
import { ProjectHandlerHelper } from './ProjectHandlerHelper'
import { UpcomingProjectDetailFragment } from '../../generated/graphql'
import { getDayName, getMonthName, getDayOfMonth } from '../Utils/common'
import { paths } from '@reservoir0x/reservoir-sdk'

const ONE_MILLION = 1e6

type ReservoirTokenResponse =
  paths['/tokens/v7']['get']['responses']['200']['schema']

type ReservoirCollectionResponse =
  paths['/collections/v5']['get']['responses']['200']['schema']

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
  namedHandler: ProjectHandlerHelper | undefined
  artistName: string
  collection?: string
  tags?: string[]
  startTime?: Date
  description?: string

  constructor({
    id,
    projectNumber,
    coreContract,
    editionSize,
    maxEditionSize,
    projectName,
    projectActive,
    artistName,
    collection,
    tags,
    startTime,
    description,
  }: {
    id: string
    projectNumber: number
    coreContract: string
    editionSize: number
    maxEditionSize: number
    projectName: string
    projectActive: boolean
    artistName: string
    collection?: string
    tags?: string[]
    startTime?: Date
    description?: string
  }) {
    this.id = id
    this.projectNumber = projectNumber
    this.coreContract = coreContract
    this.editionSize = editionSize
    this.maxEditionSize = maxEditionSize
    this.projectName = projectName
    this.projectActive = projectActive
    this.artistName = artistName
    this.collection = collection
    this.tags = tags
    this.startTime = startTime
    this.description = description
  }

  setNamedMappings(
    singles?: { [id: string]: string },
    sets?: { [id: string]: number[] }
  ) {
    this.namedHandler = new ProjectHandlerHelper(singles, sets)
  }

  // If project is still minting, refresh edition size to see if piece is in bounds
  async checkEditionSize(pieceNumber: number) {
    if (pieceNumber >= this.editionSize && pieceNumber < this.maxEditionSize) {
      const invocations: number | null = await getProjectInvocations(this.id)

      if (invocations) {
        this.editionSize = invocations
      }
    }
  }

  async handleNumberMessage(msg: Message) {
    let content = msg.content
    if (!msg.channel.isSendable()) {
      return
    }
    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      )
      return
    }
    if (triviaBot.isActiveTriviaAnswer(this)) {
      triviaBot.tally(msg)
    }

    if (content.toLowerCase().includes('named')) {
      if (this.namedHandler) {
        msg.channel.send({ embeds: [this.namedHandler.listMappings()] })
      } else {
        msg.channel.send({
          embeds: [
            new EmbedBuilder()
              // Set the title of the field.
              .setTitle('Named Pieces / Sets')
              .setDescription(
                'These are special tokens or sets of tokens that have been given a name by the community! Try them out here with `#<token/set> <project>`'
              )
              .addFields({
                name: 'No named tokens or sets!',
                value:
                  "I don't have any named tokens or sets for this project yet! [You can propose some here](https://github.com/ArtBlocks/artbot/issues/new/choose)",
              }),
          ],
        })
      }
      return
    }

    if (content.toLowerCase().includes('#floor')) {
      try {
        // Reservoir API collections are indexed like: 78000000:78999999
        const floorResponse = await axios.request<ReservoirCollectionResponse>({
          method: 'GET',
          url: `https://api.reservoir.tools/collections/v5?useNonFlaggedFloorAsk=true&id=${
            this.coreContract
          }%3A${this.projectNumber * ONE_MILLION}%3A${
            (this.projectNumber + 1) * ONE_MILLION - 1
          }`,
          headers: {
            accept: '*/*',
            'x-api-key': process.env.RESERVOIR_API_KEY,
          },
          timeout: 3000,
        })
        const floorToken =
          floorResponse.data.collections?.[0]?.floorAsk?.token?.tokenId ?? ''

        if (floorToken) {
          content = `#${parseInt(floorToken) % ONE_MILLION}`
        } else {
          msg.channel.send(
            `Sorry, looks like no ${this.projectName} tokens are for sale!`
          )
          return
        }
      } catch (e) {
        console.error('Error getting floor token for:', this.projectName, e)
        msg.channel.send(
          `Sorry, looks like there was an error retrieving the floor token for ${this.projectName}. Try again in a bit!`
        )
        return
      }
    }

    if (content.toLowerCase().includes('#explore')) {
      if (this.editionSize === this.maxEditionSize) {
        msg.channel.send(
          `Sorry, explore functionality for ${this.projectName} is disabled as the project is fully minted.`
        )
      } else {
        try {
          this.sendRandomOob(msg)
        } catch (e) {
          console.error('Error sending random OOB:', e)
          msg.channel.send(
            `Huh, looks like there was an error getting a random sample from ${this.projectName}. Try again in a bit!`
          )
        }
      }
      return
    }

    // decode any mappings
    if (this.namedHandler) {
      // because unless until #today feature -- convert '#today buu' to '#october15 buu'
      if (this.projectNumber === 472) {
        if (content.startsWith('#fiesta')) {
          content = `#${getMonthName()}${getDayOfMonth()} buu`
        } else if (content.startsWith('#today')) {
          content = `#${getDayName()} buu`
        }
      }

      content = this.namedHandler.transform(content)
    }

    const afterTheHash = content.substring(1)
    let pieceNumber
    if (afterTheHash[0] == '?') {
      pieceNumber = Math.floor(Math.random() * this.editionSize)
    } else {
      pieceNumber = parseInt(afterTheHash)
    }

    await this.checkEditionSize(pieceNumber)

    if (pieceNumber >= this.editionSize || pieceNumber < 0) {
      msg.channel.send(
        `Invalid #, only ${this.editionSize} pieces minted for ${this.projectName}.`
      )
      return
    }

    const tokenID = pieceNumber + this.projectNumber * 1e6

    this.sendMetaDataMessage(msg, tokenID.toString())
  }

  async handleTweet(tweetText: string): Promise<string> {
    const content = tweetText
    if (content.length <= 1) {
      throw new Error(
        `Invalid format, enter # followed by the piece number of interest.`
      )
    }
    const num = content.match(/#(\?|\d+)/) ?? ''
    if (!num) {
      throw new Error(`Regex not matched :(`)
    }
    const afterTheHash = num[0].substring(1)
    let pieceNumber
    if (afterTheHash[0] == '?') {
      pieceNumber = Math.floor(Math.random() * this.editionSize)
    } else {
      pieceNumber = parseInt(afterTheHash)
    }

    await this.checkEditionSize(pieceNumber)
    if (pieceNumber >= this.editionSize || pieceNumber < 0) {
      throw new Error(
        `Invalid #, only ${this.editionSize} pieces minted for ${this.projectName}.`
      )
    }

    const tokenID = pieceNumber + this.projectNumber * 1e6

    return tokenID.toString()
  }

  /**
   * Constructs and sends discord message
   * @param {*} msg
   * @param {*} tokenID
   * @param {*} detailsRequested
   */
  async sendMetaDataMessage(msg: Message, tokenID: string) {
    let tokenMetadata
    if (!msg.channel.isSendable()) {
      return
    }
    try {
      tokenMetadata = await getToken(`${this.coreContract}-${tokenID}`)
    } catch (e) {
      console.log(
        `Error getting token metadata for ${msg.content}: ${this.coreContract}-${tokenID}`,
        e
      )
      return
    }
    let external_url = tokenMetadata.contract?.token_base_url
      ? `${tokenMetadata.contract?.token_base_url}/${tokenID}`
      : ''
    if (tokenMetadata.contract?.name === 'Art Blocks x Pace') {
      external_url = ''
    }
    const tokenUrl = getTokenUrl(external_url, this.coreContract, tokenID)
    const titleLink = tokenUrl + PROJECTBOT_UTM

    let title = `${tokenMetadata.project.name} #${tokenMetadata.invocation} - ${tokenMetadata.project.artist_name}`

    // If Engine project, add Engine platform name to front
    if (
      tokenMetadata.contract?.name &&
      !tokenMetadata.contract?.name.includes('Art Blocks') &&
      !tokenMetadata.contract?.name.includes('artblocks')
    ) {
      let platform = tokenMetadata.contract?.name
      if (platform === 'MOMENT') {
        platform = 'Bright Moments'
      }

      title = platform + ' - ' + title
    }

    let ownerText = tokenMetadata.owner?.public_address
      ? await ensOrAddress(tokenMetadata.owner?.public_address)
      : ''
    if (ownerText.startsWith('0x') && !ownerText.endsWith('.eth')) {
      ownerText = ownerText.substring(0, 6) + '...' + ownerText.substring(38)
    }

    const assetUrl = await replaceVideoWithGIF(
      tokenMetadata.preview_asset_url ?? ''
    )

    const ownerProfileLink = tokenMetadata.owner?.public_address
      ? 'https://www.artblocks.io/user/' +
        tokenMetadata.owner?.public_address +
        PROJECTBOT_UTM
      : ''

    const embedContent = new EmbedBuilder()
      // Set the title of the field.
      .setTitle(title)
      // Add link to title.
      .setURL(titleLink)
      // Set the full image for embed.
      .setImage(assetUrl)

    if (ownerText) {
      embedContent.addFields({
        name: 'Owner',
        value: `[${ownerText}](${ownerProfileLink})`,
        inline: true,
      })
    }

    embedContent.addFields({
      name: 'Live Script',
      value: `[Generator](${tokenMetadata.live_view_url + PROJECTBOT_UTM})`,
      inline: true,
    })

    try {
      const response = await axios.request<ReservoirTokenResponse>({
        method: 'GET',
        url: `https://api.reservoir.tools/tokens/v7?tokens=${this.coreContract}%3A${tokenID}`,
        headers: { accept: '*/*', 'x-api-key': process.env.RESERVOIR_API_KEY },
        timeout: 3000,
      })

      if (
        response.data &&
        response.data.tokens &&
        response.data.tokens.length > 0
      ) {
        const price =
          response.data.tokens[0].market?.floorAsk?.price?.amount?.native
        const symbol =
          response.data.tokens[0].market?.floorAsk?.price?.currency?.symbol

        if (price && symbol) {
          embedContent.addFields({
            name: 'Buy Now',
            value: `[${price} ${symbol} on Art Blocks Marketplace](${
              tokenUrl + PROJECTBOT_BUY_UTM
            })`,
          })
        }
      }
    } catch (e) {
      console.error('Error getting price info for token:', tokenID, e)
    }
    msg.channel.send({ embeds: [embedContent] })
  }

  async sendBirthdayMessage(
    channels: Collection<string, Channel>,
    projectConfig: ProjectConfig,
    artistChannel: boolean
  ) {
    try {
      console.log('sending birthday message(s) for:', this.projectName)

      const artBlocksResponse = await axios.get(
        getTokenApiUrl(this.coreContract, `${this.projectNumber * ONE_MILLION}`)
      )
      const artBlocksData = await artBlocksResponse.data
      let assetUrl = artBlocksData?.preview_asset_url
      if (
        !artBlocksData ||
        !assetUrl ||
        !artBlocksData.collection_name ||
        !artBlocksData.artist
      ) {
        return
      }
      const title = `:tada:  Happy Birthday to ${artBlocksData.collection_name}!  :tada:`

      assetUrl = await replaceVideoWithGIF(assetUrl)

      const embedContent = new EmbedBuilder()
        .setColor('#9370DB')
        .setTitle(title)
        .setImage(assetUrl)
        .setDescription(
          `${
            this.projectName
          } was released on this day in ${this.startTime?.getFullYear()}! 
        
        What are your favorite outputs from ${this.projectName}?

        [Explore the full project here](${
          getProjectUrl(this.coreContract, this.projectNumber.toString()) +
          PROJECTBOT_UTM
        })
        `
        )
        .setFooter({
          text: artBlocksData.name,
        })

      // Send all birthdays to #block-talk
      let channel = channels.get(CHANNEL_BLOCK_TALK) as TextChannel
      channel?.send({ embeds: [embedContent] })

      if (
        artistChannel &&
        isCoreContract(this.coreContract) &&
        projectConfig.projectToChannel[this.projectNumber]
      ) {
        // Send in artist channel if one exists
        channel = channels.get(
          projectConfig.projectToChannel[this.projectNumber]
        ) as TextChannel
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

  async sendMintedOutMessage() {
    const blockTalk = discordClient.channels.cache.get(
      CHANNEL_BLOCK_TALK
    ) as TextChannel

    const artBlocksResponse = await axios.get(
      getTokenApiUrl(this.coreContract, `${this.projectNumber * ONE_MILLION}`)
    )
    const artBlocksData = await artBlocksResponse.data
    const assetUrl = artBlocksData?.preview_asset_url

    // Send congratulations message
    const title = `:tada: ${this.projectName} has minted out! Congratulations ${this.artistName}!  :tada:`
    const description = `Check out the whole collection [here](${
      getProjectUrl(this.coreContract, this.projectNumber.toString()) +
      PROJECTBOT_UTM
    })`
    const embedContent = new EmbedBuilder()
      .setColor('#9370DB')
      .setTitle(title)
      .setImage(assetUrl)
      .setDescription(description)
    if (blockTalk) {
      blockTalk.send({ embeds: [embedContent] })
    }
  }

  async handleUpcomingMessage(
    msg: Message,
    upcomingDetails: UpcomingProjectDetailFragment
  ) {
    if (!msg.channel.isSendable()) {
      return
    }
    const startTime = new Date(
      upcomingDetails.auction_start_time || upcomingDetails.start_datetime
    )

    const projectUrl = getProjectUrl(
      this.coreContract,
      this.projectNumber.toString()
    )
    const title = `${upcomingDetails.name} by ${upcomingDetails.artist_name}`

    const assetUrl = await replaceVideoWithGIF(
      upcomingDetails.tokens?.[0]?.preview_asset_url ?? ''
    )

    const embedContent = new EmbedBuilder()
      // Set the title of the field.
      .setTitle(title)
      // Add link to title.
      .setURL(projectUrl)
      // Set the full image for embed.
      .setImage(assetUrl)

    embedContent.addFields({
      name: 'Release Date',
      value: `<t:${startTime.getTime() / 1000}:F> Local Time`,
    })

    const minterType =
      upcomingDetails.minter_configuration?.minter?.minter_type ?? ''
    let dropMechanic = ''
    let startPrice = ''
    let restingPrice = ''
    if (minterType.includes('SetPrice')) {
      dropMechanic = `Fixed Price`
      startPrice = `${ethFromWeiString(
        upcomingDetails.minter_configuration?.base_price ?? ''
      )} Ξ`
    } else if (minterType.includes('DAExp')) {
      dropMechanic = `Exponential Dutch Auction`
      startPrice = `${ethFromWeiString(
        upcomingDetails.minter_configuration?.extra_minter_details.startPrice
      )} Ξ`
      restingPrice = `${ethFromWeiString(
        upcomingDetails.minter_configuration?.base_price ?? ''
      )} Ξ`
    } else if (minterType.includes('DALin')) {
      dropMechanic = `Linear Dutch Auction`
      startPrice = `${ethFromWeiString(
        upcomingDetails.minter_configuration?.extra_minter_details.startPrice ??
          ''
      )} Ξ`
      restingPrice = `${ethFromWeiString(
        upcomingDetails.minter_configuration?.base_price ?? ''
      )} Ξ`
    } else if (minterType.includes('Merkle')) {
      dropMechanic = `Allowlist`
      startPrice = `${ethFromWeiString(
        upcomingDetails.minter_configuration?.base_price ?? ''
      )} Ξ`
    } else {
      dropMechanic = `${minterType}`
    }

    embedContent.addFields({
      name: 'Drop Mechanic',
      value: dropMechanic,
      inline: true,
    })
    if (startPrice) {
      embedContent.addFields({
        name: 'Start Price',
        value: startPrice,
        inline: true,
      })
    }
    if (restingPrice) {
      embedContent.addFields({
        name: 'Resting Price',
        value: restingPrice,
        inline: true,
      })
    }

    msg.channel.send({ embeds: [embedContent] })
  }

  async sendRandomOob(msg: Message) {
    if (!msg.channel.isSendable()) {
      return
    }
    const projectUrl = getProjectUrl(
      this.coreContract,
      this.projectNumber.toString()
    )
    const titleLink = projectUrl + PROJECTBOT_EXPLORE_UTM
    const title = `${this.projectName} by ${this.artistName}`

    const oobToken = await getRandomOobForProject(this.id)

    const assetUrl = oobToken.media_url ?? ''

    const embedContent = new EmbedBuilder()
      // Set the title of the field.
      .setTitle(title)
      // Add link to title.
      .setURL(titleLink)
      // Set the full image for embed.
      .setImage(assetUrl)
      .setFooter({
        text: 'Algorithmic sample',
      })

    const now = new Date()
    if (this.startTime && now < this.startTime) {
      embedContent.addFields({
        name: 'Release Date',
        value: `<t:${this.startTime?.getTime() / 1000}:F>`,
      })
    }

    embedContent.addFields({
      name: 'Project Explorer',
      value: `[Explore possibilities](${
        projectUrl +
        '?section=explorer' +
        PROJECTBOT_EXPLORE_UTM.replace('?', '&')
      })`,
      inline: true,
    })

    embedContent.addFields({
      name: 'Live Script',
      value: `[Generator](${oobToken.live_view_url + PROJECTBOT_EXPLORE_UTM})`,
      inline: true,
    })

    msg.channel.send({ embeds: [embedContent] })
  }
}
