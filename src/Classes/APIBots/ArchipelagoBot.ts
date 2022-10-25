import { Client } from "discord.js"

const fetch = require('node-fetch')
const ReconnectingWebsocket = require('reconnecting-websocket')
const WS = require('ws')
const { MessageEmbed } = require('discord.js')
const CORE_CONTRACTS = require('../../ProjectConfig/coreContracts.json')
const { ensOrAddress } = require('./utils')

const {
  sendEmbedToSaleChannels,
  sendEmbedToListChannels,
  BAN_ADDRESSES,
} = require('../../Utils/activityTriager')

const WEB_SOCKET_URL = 'wss://api.archipelago.art/ws'
const COLLECTIONS_API = 'https://api.archipelago.art/v1/market/collections'
const HEADERS = { 'User-Agent': 'artbot/1.0' }
const ONE_MILLION = 1000000
const MIN_TRADE_PRICE = 1e16 // 0.01 ETH
const ARCHIPELAGO_GOLD = '#9C814B'

class ArchipelagoBot {
  discordClient: Client
  client: any
  slugToCollections: Map<string, any> 
  constructor(discordClient: Client) {
    this.discordClient = discordClient
    this.slugToCollections = new Map()
  }

  async activate() {
    await this.refreshCollections()
    this.client = new ReconnectingWebsocket(WEB_SOCKET_URL, [], {
      WebSocket: WS,
    })
    const subscribe = () =>
      this.client.send(
        JSON.stringify({ type: 'SUBSCRIBE_TOPIC', topic: 'ALL_COLLECTIONS' })
      )
    this.client.addEventListener('open', () => subscribe())
    this.client.addEventListener('message', (ev: any) => this.onMessage(ev.data))
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

  async getCollection(slug: string) {
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

  async getArtBlocksData(slug: string, tokenIndex: number) {
    const collection = await this.getCollection(slug)
    if (collection == null) {
      return null
    }
    if (
      collection.tokenContract.toLowerCase() !== CORE_CONTRACTS.OG &&
      collection.tokenContract.toLowerCase() !== CORE_CONTRACTS.V2
    ) {
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

  async sendAskEmbed({ asker: seller, price, slug, tokenIndex }: any) {
    const artBlocksData = await this.getArtBlocksData(slug, tokenIndex)
    if (artBlocksData == null) {
      console.log(`Unable to get ArtBlocks data for ${slug} #${tokenIndex}`)
      return
    }
    if (BAN_ADDRESSES.has(seller)) {
      console.log(`Skipping banned seller ${seller} for ${slug} #${tokenIndex}`)
      return
    }
    let sellerText = await ensOrAddress(seller)
    const archipelagoUrl = `https://archipelago.art/collections/${slug}/${tokenIndex}`
    const embed = new MessageEmbed()
    const sellerUrl = `https://archipelago.art/address/${seller}`
    embed.addField('Seller (Archipelago)', `[${sellerText}](${sellerUrl})`)
    embed.addField('List Price', priceToString(price) + ' ETH')
    embed.setColor(ARCHIPELAGO_GOLD)
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

  async sendTradeEmbed({ buyer, seller, price, slug, tokenIndex }: any) {
    const artBlocksData = await this.getArtBlocksData(slug, tokenIndex)
    if (artBlocksData == null) {
      console.warn(`Unable to get ArtBlocks data for ${slug} #${tokenIndex}`)
      return
    }
    if (BAN_ADDRESSES.has(seller)) {
      console.log(`Skipping banned seller ${seller} for ${slug} #${tokenIndex}`)
      return
    }
    if (BAN_ADDRESSES.has(buyer)) {
      console.log(`Skipping banned buyer ${buyer} for ${slug} #${tokenIndex}`)
      return
    }
    const archipelagoUrl = `https://archipelago.art/collections/${slug}/${tokenIndex}`
    const embed = new MessageEmbed()

    const sellerText = await ensOrAddress(seller)
    const buyerText = await ensOrAddress(buyer)

    const sellerUrl = `https://archipelago.art/address/${seller}`
    embed.addField('Seller (Archipelago)', `[${sellerText}](${sellerUrl})`)
    const buyerUrl = `https://archipelago.art/address/${buyer}`
    embed.addField('Buyer', `[${buyerText}](${buyerUrl})`)
    embed.addField('Price', priceToString(price) + ' ETH')
    embed.setColor(ARCHIPELAGO_GOLD)
    embed.setThumbnail(artBlocksData.image)
    embed.addField(
      'Live Script',
      `[view on artblocks.io](${artBlocksData.external_url})`,
      true
    )
    embed.author = null
    embed.setTitle(`${artBlocksData.name} - ${artBlocksData.artist}`)
    embed.setURL(archipelagoUrl)
    sendEmbedToSaleChannels(this.discordClient, embed, artBlocksData)
  }

  onMessage(msg: any) {
    const message = JSON.parse(msg)
    switch (message.type) {
      case 'ASK_PLACED':
        if (message.data.venue !== 'ARCHIPELAGO') {
          break // we include opensea data, redundant for artbot
        }
        this.sendAskEmbed(message.data)
        break
      case 'TOKEN_TRADED':
        if (
          message.data.venue != null &&
          message.data.venue !== 'ARCHIPELAGO'
        ) {
          break // if venue specified, must be archipelago
        }
        if (BigInt(message.data.price) < MIN_TRADE_PRICE) {
          break // don't report negligible trades (likely to be testing)
        }
        this.sendTradeEmbed(message.data)
        break
      default:
        break
    }
  }
}

// Copied from Archipelago UI codebase.
const priceToString = (
  price: any,
  { decimals = 18, maximumFractionDigits, precisionAdjustment = 0 }: any = {}
) => {
  // Babel polyfill for BigInt (exponentiation with ** doesn't work!)
  let divisor = 10
  for (let i = 0; i < decimals - 6 - 1; i++) {
    divisor = divisor * 10
  }
  const amount = Number(BigInt(price) / BigInt(divisor)) / 1e6
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
