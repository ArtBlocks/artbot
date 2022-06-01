const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const Web3 = require('web3')
const { ProjectHandlerHelper } = require('./ProjectHandlerHelper')

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

const EMBED_COLOR = 0xff0000
const UNKNOWN_ADDRESS = 'unknown'
const UNKNOWN_USERNAME = 'unknown'

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
  }) {
    this.projectNumber = projectNumber
    this.coreContract = coreContract
    this.editionSize = editionSize
    this.projectName = projectName
    this.projectActive = projectActive
    this.namedMappings = namedMappings
      ? ProjectBot.getProjectHandlerHelper(namedMappings)
      : null
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
    // If the OpenSea API is available use their link for the title otherwise use an AB link
    const titleLink = openSeaData
      ? openSeaData.permalink
      : artBlocksData.external_url

    let title = artBlocksData.name + ' - ' + artBlocksData.artist

    // If PBAB project, add PBAB name to front
    if (
      artBlocksData.platform !== '' &&
      !artBlocksData.platform.includes('Art Blocks')
    ) {
      title = artBlocksData.platform + ' - ' + title
    }

    let moreDetailsText = `Add "?details" to your ArtBot command`
    if (artBlocksData.external_url !== '') {
      moreDetailsText += ` or [view on artblocks.io](${artBlocksData.external_url}).`
    }
    // If user did *not* request full details, return just a large image,
    // along with a link to the OpenSea page and ArtBlocks live script.
    if (!detailsRequested) {
      const imageContent = new MessageEmbed()
        // Set the title of the field.
        .setTitle(title)
        // Add link to title.
        .setURL(titleLink)
        .addField('Want More Info?', moreDetailsText)
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
    if (openSeaData) {
      embedContent
        // Add sale number details.
        .addField('Total Sales', this.parseNumSales(openSeaData.num_sales))
        // Add current owner info.
        .addFields(this.parseOwnerInfo(openSeaData.owner))
        // Add sale info.
        .addFields(this.parseSaleInfo(openSeaData.last_sale))
    } else {
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
}

module.exports.ProjectBot = ProjectBot
