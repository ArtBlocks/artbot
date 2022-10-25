const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
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
class ProjectBot {
  constructor({
    projectNumber,
    coreContract,
    editionSize,
    projectName,
    projectActive,
    namedMappings,
    artistName = '',
    curationStatus = null,
    heritageStatus = null,
    startTime = null,
  }) {
    this.projectNumber = projectNumber
    this.coreContract = coreContract
    this.editionSize = editionSize
    this.projectName = projectName
    this.projectActive = projectActive
    this.namedMappings = namedMappings
      ? ProjectBot.getProjectHandlerHelper(namedMappings)
      : null
    this.artistName = artistName
    this.curationStatus = curationStatus
    this.heritageStatus = heritageStatus
    this.startTime = startTime
  }

  static getProjectHandlerHelper({ singles, sets }) {
    const singlesMap = singles ? require(`../NamedMappings/${singles}`) : null
    const setsMap = sets ? require(`../NamedMappings/${sets}`) : null
    return new ProjectHandlerHelper(singlesMap, setsMap)
  }

  async handleNumberMessage(msg) {
    let content = msg.content
    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      )
      return
    }

    if (content.toLowerCase().includes('named')) {
      if (this.namedMappings) {
        msg.channel.send(this.namedMappings.listMappings())
      } else {
        msg.channel.send(
          new MessageEmbed()
            // Set the title of the field.
            .setTitle('Named Pieces / Sets')
            .setDescription(
              'These are special tokens or sets of tokens that have been given a name by the community! Try them out here with `#<token>` or `#? <set>`'
            )
            .addField(
              'No named tokens or sets!',
              "I don't have any named tokens or sets for this project yet! [You can propose some here](https://github.com/ArtBlocks/artbot/issues/new/choose)"
            )
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
      pieceNumber = parseInt(Math.random() * this.editionSize)
    } else {
      pieceNumber = parseInt(afterTheHash)
    }

    if (pieceNumber >= this.editionSize || pieceNumber < 0) {
      msg.channel.send(
        `Invalid #, only ${this.editionSize} pieces minted for ${this.projectName}.`
      )
      return
    }

    const tokenID = pieceNumber + this.projectNumber * 1e6
    const openSeaURL = `https://api.opensea.io/api/v1/asset/${this.coreContract}/${tokenID}/`

    await fetch(openSeaURL, {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((openSeaData) => {
        this.sendMetaDataMessage(openSeaData, msg, tokenID, detailsRequested)
      })
      .catch((err) => {
        console.warn(
          `MetaData message is being sent in a degraded manner. Is OpenSea's API down? https://status.opensea.io/`
        )
        this.sendMetaDataMessage(null, msg, tokenID, detailsRequested)
      })
  }

  /**
   * Constructs and sends discord message
   * @param {*} openSeaData
   * @param {*} msg
   * @param {*} tokenID
   * @param {*} detailsRequested
   */
  async sendMetaDataMessage(openSeaData, msg, tokenID, detailsRequested) {
    const artBlocksResponse = await fetch(
      `https://token.artblocks.io/${this.coreContract}/${tokenID}`
    )
    const artBlocksData = await artBlocksResponse.json()

    const titleLink =
      artBlocksData.external_url !== ''
        ? artBlocksData.external_url
        : openSeaData.permalink

    let title = artBlocksData.name + ' - ' + artBlocksData.artist

    // If PBAB project, add PBAB name to front
    if (
      artBlocksData.platform &&
      artBlocksData.platform !== '' &&
      !artBlocksData.platform.includes('Art Blocks')
    ) {
      title = artBlocksData.platform + ' - ' + title
    }

    let moreDetailsText = `Add "?details" to your command!`

    // If user did *not* request full details, return just a large image,
    // along with a link to the OpenSea page and ArtBlocks live script.
    if (!detailsRequested) {
      const imageContent = new MessageEmbed()
        // Set the title of the field.
        .setTitle(title)
        // Add link to title.
        .setURL(titleLink)
        .addField(
          'Live Script',
          `[Generator](${artBlocksData.generator_url})`,
          true
        )
        .addField('Want More Info?', moreDetailsText, true)
        // Set the full image for embed.
        .setImage(artBlocksData.image)
      msg.channel.send(imageContent)
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
    const embedContent = new MessageEmbed()
      // Set the title of the field.
      .setTitle(title)
      // Add link to title.
      .setURL(titleLink)
      // Set the color of the embed.
      .setColor(EMBED_COLOR)
      // Set the main content of the embed
      .setThumbnail(artBlocksData.image)
      // Add "Live Script" field.
      .addField(
        'Live Script',
        `[view on artblocks.io](${artBlocksData.external_url})`
      )
      // Add "Features" field.
      .addField('Features', assetFeatures)

    // If OpenSea data is available add it otherwise say we are operating in a degraded mode
    try {
      if (!openSeaData) {
        throw new Error('OpenSea data is not available')
      }
      embedContent
        // Add sale number details.
        .addField('Total Sales', this.parseNumSales(openSeaData.num_sales))
        // Add current owner info.
        .addFields(this.parseOwnerInfo(openSeaData.owner))
        // Add sale info.
        .addFields(this.parseSaleInfo(openSeaData.last_sale))
    } catch (e) {
      embedContent.addField(
        'Sales Info',
        'It seems there is a problem with the OpenSea API. Check status [here](https://status.opensea.io/).'
      )
    }

    msg.channel.send(embedContent)
  }

  parseOwnerInfo(ownerAccount) {
    const address = ownerAccount.address
    const addressPreview =
      address !== null ? address.slice(0, 8) : UNKNOWN_ADDRESS
    const addressOpenSeaURL = `https://opensea.io/accounts/${address}`
    let ownerUsername =
      ownerAccount.user !== null ? ownerAccount.user.username : UNKNOWN_USERNAME
    if (ownerUsername === null) {
      ownerUsername = UNKNOWN_USERNAME
    }

    return {
      name: 'Owner',
      value: `[${addressPreview}](${addressOpenSeaURL}) (${ownerUsername})`,
      inline: true,
    }
  }

  parseSaleInfo(saleInfo) {
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

  parseNumSales(numSales) {
    if (numSales == 0) {
      return 'None'
    }
    return `${numSales}`
  }

  async sendBirthdayMessage(channels, projectConfig) {
    try {
      console.log('sending birthday message(s) for:', this.projectName)

      let msg = {}
      const artBlocksResponse = await fetch(
        `https://token.artblocks.io/${this.coreContract}/${
          this.projectNumber * ONE_MILLION
        }`
      )
      const artBlocksData = await artBlocksResponse.json()
      if (
        !artBlocksData ||
        !artBlocksData.image ||
        !artBlocksData.collection_name ||
        !artBlocksData.artist
      ) {
        return
      }
      let title = `:tada:  Happy Birthday to ${artBlocksData.collection_name}!  :tada:`

      const embedContent = new MessageEmbed()
        .setColor('#9370DB')
        .setTitle(title)
        .setImage(artBlocksData.image)
        .setDescription(
          `${
            this.projectName
          } was released on this day in ${this.startTime.getFullYear()}! 
        
        What are your favorite outputs from ${this.projectName}?

        [Explore the full project here](${artBlocksData.external_url})
        `
        )
        .setFooter(`${artBlocksData.name}`)

      // Send all birthdays to #block-talk
      msg.channel = channels.get(projectConfig.chIdByName['block-talk'])
      msg.channel.send(embedContent)

      if (projectConfig.projectToChannel[this.projectNumber]) {
        // Send in artist channel if one exists
        msg.channel = channels.get(
          projectConfig.projectToChannel[this.projectNumber]
        )
        msg.channel.send(embedContent)
      } else {
        // Otherwise send in #factory-projects
        msg.channel = channels.get(projectConfig.chIdByName['factory-projects'])
        msg.channel.send(embedContent)
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

module.exports.ProjectBot = ProjectBot
