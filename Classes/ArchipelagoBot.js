const fetch = require('node-fetch')
const WebSocket = require('ws')
const { MessageEmbed } = require('discord.js')

const {
  sendEmbedToSaleChannels,
  sendEmbedToListChannels,
  BAN_ADDRESSES,
} = require('../Utils/activityTriager')

const WEB_SOCKET_URL = 'wss://api.archipelago.art/ws'
const COLLECTIONS_API = 'https://api.archipelago.art/v1/market/collections'
const HEADERS = { 'User-Agent': 'artbot/1.0' }
const ONE_MILLION = 1000000
const ASK_COLOR = '#CD8A1C'

class ArchipelagoBot {
  constructor(discordClient) {
    this.discordClient = discordClient
  }

  async activate() {
    await this.refreshCollections()
    this.client = new WebSocket(WEB_SOCKET_URL)
    const subscribe = () =>
      this.client.send(
        JSON.stringify({ type: 'SUBSCRIBE_TOPIC', topic: 'ALL_COLLECTIONS' })
      )
    this.client.on('open', () => subscribe())
    this.client.on('message', (message) => this.onMessage(message))
  }

  async refreshCollections() {
    this.slugToCollections = new Map()
    const collectionsResponse = await fetch(COLLECTIONS_API, {
      headers: HEADERS,
    })
    const collections = await collectionsResponse.json()
    for (const collection of collections) {
      this.slugToCollections.set(collection.slug, collection)
    }
  }

  async getCollection(slug) {
    let collection = this.slugToCollections.get(slug)
    if (collection == null) {
      console.log(
        `Archipelago: can't find collection ${slug}, attempting refresh`
      )
      await this.refreshCollections()
      collection = this.slugToCollections.get(slug)
    }
    return collection
  }

  async getArtBlocksData(slug, tokenIndex) {
    const collection = await this.getCollection(slug)
    if (collection == null) {
      return null
    }
    const offset = collection.artblocksProjectIndex * ONE_MILLION
    const tokenId = offset + tokenIndex
    const artBlocksResponse = await fetch(
      `https://token.artblocks.io/${tokenId}`
    )
    const artBlocksData = await artBlocksResponse.json()
    if (artBlocksData.message === 'Token Not Found') {
      return null
    }
    return artBlocksData
  }

  async sendAskEmbed(seller, price, slug, tokenIndex) {
    const artBlocksData = await this.getArtBlocksData(slug, tokenIndex)
    if (artBlocksData == null) {
      console.warn(`Unable to get ArtBlocks data for ${slug} #${tokenIndex}`)
      return
    }
    if (BAN_ADDRESSES.has(seller)) {
      console.log(`Skipping banned seller ${seller} for ${slug} #${tokenIndex}`)
      return
    }
    const archipelagoUrl = `https://archipelago.art/collections/${slug}/${tokenIndex}`
    const embed = new MessageEmbed()
    const sellerUrl = `https://archipelago.art/address/${seller}`
    embed.addField('Seller (Archipelago)', `[${seller}](${sellerUrl})`)
    embed.addField('List Price', priceToString(price) + ' ETH')
    embed.setColor(ASK_COLOR)
    embed.setThumbnail(artBlocksData.image)
    embed.addField(
      'Live Script',
      `[view on artblocks.io](${artBlocksData.external_url})`,
      true
    )
    embed.author = null
    embed.setTitle(`${artBlocksData.name} - ${artBlocksData.artist}`)
    embed.setURL(archipelagoUrl)
    sendEmbedToListChannels(this.discordClient, embed, artBlocksData)
  }

  onMessage(msg) {
    const message = JSON.parse(msg)
    switch (message.type) {
      case 'ASK_PLACED':
        if (message.data.venue !== 'ARCHIPELAGO') {
          break // we include opensea data, redundant for artbot
        }
        const { asker, price, tokenId, slug, tokenIndex } = message.data
        this.sendAskEmbed(asker, price, slug, tokenIndex)
        break
      case 'TOKEN_TRADED':
        // sales not yet supported.
        break
      default:
        break
    }
  }
}

// Copied from Archipelago UI codebase.
const priceToString = (
  price,
  { decimals = 18, maximumFractionDigits, precisionAdjustment = 0 } = {}
) => {
  // Babel polyfill for BigInt (exponentiation with ** doesn't work!)
  let divisor = 10n
  for (let i = 0; i < decimals - 6 - 1; i++) {
    divisor = divisor * 10n
  }
  const amount = Number(BigInt(price) / divisor) / 1e6
  let parsedFractionDigits
  if (maximumFractionDigits == null) {
    parsedFractionDigits =
      amount < 0.0001
        ? 7
        : amount < 0.01
        ? 6
        : amount < 0.01
        ? 5
        : amount < 0.1
        ? 4
        : amount < 1
        ? 3
        : amount < 100
        ? 2
        : amount < 1000
        ? 1
        : 0
  }
  return amount.toLocaleString(undefined, {
    maximumFractionDigits:
      (maximumFractionDigits || parsedFractionDigits) + precisionAdjustment,
  })
}

module.exports.ArchipelagoBot = ArchipelagoBot
