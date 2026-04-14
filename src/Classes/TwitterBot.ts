import * as dotenv from 'dotenv'
dotenv.config()
import {
  ApiResponseError,
  EUploadMimeType,
  TweetV2,
  TwitterApi,
} from 'twitter-api-v2'
import { Mint } from './MintBot'
import {
  ArtBlocksTokenData,
  TWITTER_PROJECTBOT_UTM,
  delay,
  ensOrAddress,
  getTokenApiUrl,
  getTokenUrl,
} from './APIBots/utils'
import { lookupUserByAddress } from '../Data/queryGraphQL'
import { artIndexerBot, ARTIST_TWITTER_HANDLES } from '..'
import sharp from 'sharp'
import { formatNumberWithCommas } from '../Utils/common'
import { sanitizeTwitterHandle } from '../Utils/twitterUtils'
import {
  getLastTweetId,
  getStatusRefreshToken,
  updateLastTweetId,
  updateStatusRefreshToken,
} from '../Data/supabase'
import { logger } from '../logger'

// Twitter Bot Feature Toggles - Modify these to enable/disable functionality
const TWITTER_LISTENING_ENABLED = false // Enables listening and responding to tweet mentions
const TWITTER_SALE_POSTING_ENABLED = true // Enables posting sale tweets
const TWITTER_MINT_POSTING_ENABLED = false // Enables posting mint tweets

const TWITTER_MEDIA_BYTE_LIMIT = 5242880
// Search rate limit is 60 queries per 15 minutes - shortest interval is 15 secs (though we should keep it a bit longer)
const SEARCH_INTERVAL_MS = 20000
const NUM_RETRIES = 5
const RETRY_DELAY_MS = 5000
const prod = process.env.ARTBOT_IS_PROD
  ? process.env.ARTBOT_IS_PROD.toLowerCase() === 'true'
  : false

// Global Twitter enable/disable flag
const isTwitterGloballyEnabled =
  process.env.TWITTER_ENABLED?.toLowerCase() === 'true'

const ARTBOT_TWITTER_HANDLE = 'artbotartbot'
const STATUS_TWITTER_HANDLE = 'ArtbotStatus'

/**
 * TwitterBot handles Twitter API interactions for posting tweets and listening/responding to mentions
 *
 * Feature Toggles (constants at top of file):
 * - TWITTER_LISTENING_ENABLED: Controls whether the bot listens for and responds to tweets (default: false)
 * - TWITTER_SALE_POSTING_ENABLED: Controls whether the bot posts sale tweets (default: false)
 * - TWITTER_MINT_POSTING_ENABLED: Controls whether the bot posts mint tweets (default: false)
 *
 * The bot can be used for posting functionality (sales, mints, etc.) even when listener is disabled
 */
export class TwitterBot {
  twitterClient?: TwitterApi
  twitterStatusAccount?: TwitterApi
  lastTweetId?: string
  intervalId?: NodeJS.Timeout

  constructor({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  }: {
    appKey: string
    appSecret: string
    accessToken: string
    accessSecret: string
  }) {
    this.lastTweetId = ''

    // Check if Twitter is globally disabled
    if (!isTwitterGloballyEnabled) {
      logger.info(
        'TwitterBot instantiated but Twitter is globally disabled via TWITTER_ENABLED environment variable'
      )
      return
    }

    if (!appKey || !appSecret || !accessToken || !accessSecret) {
      logger.warn('Twitter credentials are missing - not initializing TwitterBot')
      return
    }

    // Initialize Twitter client for posting capabilities
    this.twitterClient = new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret,
    })

    // Only start listener if enabled via constant
    if (TWITTER_LISTENING_ENABLED) {
      logger.info('Starting Twitter listener')
      this.startSearchAndReplyRoutine()
    } else {
      logger.info('Twitter listener disabled via TWITTER_LISTENING_ENABLED constant')
    }
  }

  async startSearchAndReplyRoutine() {
    // Check if Twitter is globally disabled
    if (!isTwitterGloballyEnabled) {
      logger.info('Twitter listener disabled via TWITTER_ENABLED environment variable')
      return
    }

    try {
      this.lastTweetId = await getLastTweetId(prod)
    } catch (e) {
      logger.error({ err: e }, 'Error getting last tweet id')
      logger.info('Aborting Twitter listener')
      return
    }

    this.intervalId = setInterval(() => {
      this.search()
    }, SEARCH_INTERVAL_MS)
  }

  /**
   * Cleanup method to be called when the bot is being destroyed
   */
  cleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }

  async search() {
    let artbotTweets:
      | Awaited<ReturnType<TwitterApi['v2']['search']>>
      | undefined
    try {
      // Query breakdown:
      // to:${ARTBOT_TWITTER_HANDLE} = Original tweets that start with @artbotartbot or direct replies to @artbotartbot tweets
      // @${ARTBOT_TWITTER_HANDLE} = Mentions artbotartbot

      const query = `(to:${ARTBOT_TWITTER_HANDLE} OR @${ARTBOT_TWITTER_HANDLE}) -is:retweet -has:links has:mentions -from:${STATUS_TWITTER_HANDLE} -from:${ARTBOT_TWITTER_HANDLE}`
      const devQuery = `to:ArtbotTesting from:ArtbotTesting`
      artbotTweets = await this.twitterClient?.v2.search({
        query: prod ? query : devQuery,
        since_id: this.lastTweetId,
      })
    } catch (error: unknown) {
      if (
        error instanceof ApiResponseError &&
        error.rateLimitError &&
        error.rateLimit
      ) {
        logger.info({ resetTimestamp: error.rateLimit.reset }, 'Search rate limit hit')
      } else if (
        error instanceof ApiResponseError &&
        error.code === 400 &&
        error.errors?.[0] &&
        'message' in error.errors[0] &&
        typeof (error.errors[0] as { message?: string }).message === 'string' &&
        (error.errors[0] as { message: string }).message.includes('since_id')
      ) {
        const messageSplit = (
          error.errors[0] as { message: string }
        ).message.split(' ')
        const lastId = BigInt(messageSplit[messageSplit.length - 1])
        const adjustedLastId = (lastId + BigInt('100000000000')).toString()
        logger.info({ adjustedLastId }, 'TwitterBot since_id is invalid - setting to new value')
        this.lastTweetId = adjustedLastId
      } else {
        logger.error({ err: error }, 'Error searching Twitter')
      }
      return
    }

    if (!artbotTweets) {
      logger.info('No response from Twitter search')
      return
    }

    logger.info({ resultCount: artbotTweets?.meta?.result_count }, 'artbotTweets search result')

    if (artbotTweets.meta.result_count === 0) {
      logger.info('No new tweets found')
      return
    }

    for await (const tweet of artbotTweets) {
      try {
        this.replyToTweet(tweet)
      } catch (e) {
        logger.error({ err: e, tweetText: tweet.text }, 'Error responding to tweet')
      }
    }
    if (artbotTweets.meta.newest_id) {
      this.updateLastTweetId(artbotTweets.meta.newest_id)
    }
  }

  async updateLastTweetId(tweetId: string) {
    if (tweetId === this.lastTweetId) {
      return
    }
    this.lastTweetId = tweetId
    await updateLastTweetId(tweetId, prod)
  }
  async replyToTweet(tweet: TweetV2) {
    const cleanedTweet = tweet.text
      .replaceAll(/@\w+/g, '') // Remove all mentions
      .match(/#(\?|\d*).+/g)?.[0] // Fetch the first hashtag and everything after it (until a newline)
      ?.trim()
    if (!cleanedTweet) {
      logger.warn({ tweetText: tweet.text }, 'Tweet is not a supported action')
      return
    }
    logger.info({ tweetId: tweet.id, cleanedTweet }, 'Handling tweet')

    let projectBot
    let tokenId
    try {
      const { projectBot: p, tokenId: t } =
        await artIndexerBot.handleNumberTweet(cleanedTweet)

      projectBot = p
      tokenId = t
    } catch (e) {
      logger.error({ err: e }, 'Error handling tweet number')
      return
    }

    const artBlocksData = await fetch(
      getTokenApiUrl(projectBot.chainId, projectBot.coreContract, tokenId)
    ).then((r) => r.json()) as ArtBlocksTokenData

    const assetUrl = artBlocksData.preview_asset_url ?? ''

    let media_id: string
    try {
      media_id = await this.uploadMedia(assetUrl)
    } catch (error) {
      logger.error({ err: error, assetUrl }, 'Error uploading media')
      return
    }

    const tokenUrl =
      getTokenUrl(
        artBlocksData.external_url ?? '',
        projectBot.chainId,
        projectBot.coreContract,
        tokenId
      ) + TWITTER_PROJECTBOT_UTM

    let platform = ''
    // If Engine project, add Engine platform name
    if (
      artBlocksData.platform &&
      artBlocksData.platform !== '' &&
      !artBlocksData.platform.includes('Art Blocks')
    ) {
      if (artBlocksData.platform === 'MOMENT') {
        artBlocksData.platform = 'Bright Moments'
      }

      platform = `on ${artBlocksData.platform} (Art Blocks Engine)`
    }

    const tweetMessage = `${artBlocksData.name} by ${artBlocksData.artist} ${platform}\n\n${tokenUrl}`

    logger.info({ tweetId: tweet.id, name: artBlocksData.name }, 'Replying to tweet')
    for (let i = 0; i < NUM_RETRIES; i++) {
      try {
        await this.twitterClient?.v2.reply(tweetMessage, tweet.id, {
          media: {
            media_ids: [media_id],
          },
        })
        return
      } catch (error) {
        if (error instanceof ApiResponseError && error.rateLimit) {
          logger.info(
            { limit: error.rateLimit.limit, remaining: error.rateLimit.remaining, reset: error.rateLimit.reset },
            'Rate limit hit on tweet sending'
          )
          const reset = new Date(error.rateLimit.reset * 1000)
          const now = new Date()
          const diff = reset.getTime() - now.getTime()
          const diffMinutes = Math.ceil(diff / 60000)
          try {
            await this.sendStatusMessage(
              `@${ARTBOT_TWITTER_HANDLE} has been rate limited by Twitter :( Please try again in ${diffMinutes} minutes`,
              tweet.id
            )
          } catch (e) {
            logger.error({ err: e }, 'Error sending status message')
          }
          return
        } else {
          logger.info({ tweetId: tweet.id, err: error }, 'Error replying to tweet')
          logger.info({ attempt: i, numRetries: NUM_RETRIES }, 'Retrying tweet reply')
          await delay(RETRY_DELAY_MS)
        }
      }
    }
    logger.error('Retry attempts failed - dropping tweet')
  }

  async uploadMedia(assetUrl: string): Promise<string> {
    const res = await fetch(assetUrl)
    let buff = Buffer.from(await res.arrayBuffer() as ArrayBuffer)

    while (buff.length > TWITTER_MEDIA_BYTE_LIMIT) {
      if (assetUrl.includes('.mp4')) {
        // Can't resize videos, so try again with the png
        return await this.uploadMedia(assetUrl.replace('.mp4', '.png'))
      }
      logger.info('Resizing media')
      const ratio = TWITTER_MEDIA_BYTE_LIMIT / buff.length
      const metadata = await sharp(buff).metadata()
      buff = await sharp(buff)
        .resize({ width: Math.floor((metadata.width ?? 0) * ratio) })
        .toBuffer()
    }

    logger.info({ assetUrl }, 'Uploading media to Twitter')
    for (let i = 0; i < NUM_RETRIES; i++) {
      try {
        const mediaId = await this.twitterClient?.v2.uploadMedia(buff, {
          media_type: this.getMimeType(assetUrl),
        })
        if (!mediaId) {
          throw new Error('No media id returned')
        }
        return mediaId
      } catch (err) {
        logger.info({ err, assetUrl }, 'Error uploading media')
        logger.info({ attempt: i, numRetries: NUM_RETRIES }, 'Retrying media upload')
        await delay(RETRY_DELAY_MS)
      }
    }
    throw new Error("Couldn't upload media - dropping tweet")
  }

  getMimeType(assetUrl: string): EUploadMimeType {
    if (assetUrl.includes('.gif')) {
      return EUploadMimeType.Gif
    } else if (assetUrl.includes('.mp4')) {
      return EUploadMimeType.Mp4
    } else {
      return EUploadMimeType.Png
    }
  }

  async _tweetMint(artBlock: Mint) {
    // Check if Twitter is globally disabled
    if (!isTwitterGloballyEnabled) {
      logger.info('Twitter mint posting disabled via TWITTER_ENABLED environment variable')
      return
    }

    // Check if Twitter mint posting is enabled
    if (!TWITTER_MINT_POSTING_ENABLED) {
      logger.info('Twitter mint posting disabled via TWITTER_MINT_POSTING_ENABLED constant')
      return
    }

    const assetUrl = artBlock.image
    if (!artBlock.image) {
      logger.error({ artBlock: JSON.stringify(artBlock) }, 'No artblock image defined')
      return
    }

    const mediaId = await this.uploadMedia(assetUrl)

    if (!mediaId) {
      logger.error('no media id returned, not tweeting')
      return
    }

    const ownerText = await ensOrAddress(artBlock.owner)

    const tweetText = `${artBlock.tokenName} minted${
      ownerText ? ` by ${ownerText}` : ''
    }. \n\n${artBlock.artblocksUrl + TWITTER_PROJECTBOT_UTM}`
    logger.info({ tweetText }, 'Tweeting mint')

    const tweetRes = await this.twitterClient?.v2.tweet(tweetText, {
      text: tweetText,
      media: { media_ids: [mediaId] },
    })

    return {
      tweetRes,
    }
  }

  async tweetMint(mint: Mint) {
    try {
      await this._tweetMint(mint)
    } catch (e) {
      logger.error({ err: e }, 'Error posting to Twitter')
    }
  }

  // Have to log in with OAuth2 to access status account
  // Refresh token is stored in supabase
  async signIntoStatusAccount() {
    logger.info('Signing in to status account')
    const token = await getStatusRefreshToken()
    const API = new TwitterApi({
      clientId: process.env.AB_TWITTER_CLIENT_ID ?? '',
      clientSecret: process.env.AB_TWITTER_CLIENT_SECRET ?? '',
    })
    logger.info({ token }, 'Connecting with token')
    const { client: refreshedClient, refreshToken: newRefreshToken } =
      await API.refreshOAuth2Token(token)
    logger.info({ newRefreshToken }, 'Connected to status account')
    await updateStatusRefreshToken(newRefreshToken ?? '')
    logger.info('Saved new refresh token')
    this.twitterStatusAccount = refreshedClient
  }

  async sendStatusMessage(message: string, replyId?: string) {
    // Check if Twitter is globally disabled
    if (!isTwitterGloballyEnabled) {
      logger.info('Twitter status messaging disabled via TWITTER_ENABLED environment variable')
      return
    }

    // Check if Twitter listening is enabled (status messages are mainly for user interactions)
    if (!TWITTER_LISTENING_ENABLED) {
      logger.info('Twitter status messaging disabled via TWITTER_LISTENING_ENABLED constant')
      return
    }

    if (!this.twitterStatusAccount) {
      await this.signIntoStatusAccount()
    }

    logger.info({ replyId }, 'Sending status message')

    if (replyId) {
      await this.twitterStatusAccount?.v2.reply(message, replyId)
      return
    }
    await this.twitterStatusAccount?.v2.tweet(message)
  }

  /**
   * Get current ETH to USD exchange rate from CoinGecko API
   * Returns the USD price of 1 ETH
   * Throws an error if the API call fails
   */
  private async getEthToUsdRate(): Promise<number> {
    const data = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    ).then((r) => r.json()) as { ethereum: { usd: number } }
    return data.ethereum.usd
  }

  /**
   * Convert ETH amount to USD using current exchange rate
   * @param ethAmount The amount in ETH (as a number)
   * @returns The equivalent USD value
   */
  private async convertEthToUsd(ethAmount: number): Promise<number> {
    const ethToUsdRate = await this.getEthToUsdRate()
    return ethAmount * ethToUsdRate
  }

  /**
   * Get artist display name following fallback rules:
   * 1. @twitterHandle
   * 2. Artist Name (AB DB)
   * Returns null if no valid name is found
   */
  private async getArtistDisplayName(
    artistName: string
  ): Promise<string | null> {
    // 1. Try Twitter handle first
    const artistTwitterHandle = ARTIST_TWITTER_HANDLES.get(artistName)
    if (artistTwitterHandle) {
      return `@${artistTwitterHandle}`
    }

    // 2. Use Artist Name from AB DB if it exists and isn't an address
    if (artistName && artistName !== 'unknown artist') {
      return artistName
    }

    return null
  }

  /**
   * Get collector display name following fallback rules:
   * 1. @twitterHandle
   * 2. name
   * 3. username
   * 4. ENS
   * Returns null if no valid name is found (avoids ethereum addresses)
   */
  private async getCollectorDisplayName(
    address: string
  ): Promise<string | null> {
    try {
      // Try to lookup user profile by address
      const userProfile = await lookupUserByAddress(address)

      // 1. Try Twitter handle first
      if (userProfile.twitter_username) {
        const sanitizedHandle = sanitizeTwitterHandle(
          userProfile.twitter_username
        )
        if (sanitizedHandle) {
          return `@${sanitizedHandle}`
        }
      }

      // 2. Try name
      if (userProfile.name) {
        return userProfile.name
      }

      // 3. Try username (Art Blocks username)
      if (userProfile.username) {
        return userProfile.username
      }
    } catch (error) {
      // User profile not found, continue to ENS fallback
      logger.info({ address }, 'No user profile found for address, trying ENS')
    }

    // 4. Try ENS
    const ensName = await ensOrAddress(address)
    if (ensName && !ensName.startsWith('0x')) {
      return ensName
    }

    return null
  }

  async tweetSale(saleData: {
    tokenName: string
    projectName: string
    artist: string
    salePrice: number
    usdPrice: number
    currency: string
    buyer: string
    seller: string
    assetUrl: string
    tokenUrl: string
    platform?: string
  }) {
    // Check if Twitter is globally disabled
    if (!isTwitterGloballyEnabled) {
      logger.info('Twitter sale posting disabled via TWITTER_ENABLED environment variable')
      return
    }

    // Check if Twitter sale posting is enabled
    if (!TWITTER_SALE_POSTING_ENABLED) {
      logger.info('Twitter sale posting disabled via TWITTER_SALE_POSTING_ENABLED constant')
      return
    }

    try {
      logger.info({ tokenName: saleData.tokenName }, 'Tweeting sale')

      // Upload the token image to Twitter
      let media_id: string
      try {
        media_id = await this.uploadMedia(saleData.assetUrl)
      } catch (error) {
        logger.error({ err: error }, 'Error uploading media for sale tweet')
        return
      }

      // Get display names with fallback logic
      const artistDisplayName = await this.getArtistDisplayName(saleData.artist)
      const collectorDisplayName = await this.getCollectorDisplayName(
        saleData.buyer
      )

      // Build the tweet message according to the new format
      let tweetMessage = saleData.tokenName

      // Replace WETH with ETH for display purposes
      const displayCurrency =
        saleData.currency === 'WETH' ? 'ETH' : saleData.currency

      // Calculate USD price - use our own conversion for ETH/WETH, otherwise use API data
      let usdPrice = saleData.usdPrice
      if (saleData.currency === 'ETH' || saleData.currency === 'WETH') {
        try {
          usdPrice = await this.convertEthToUsd(saleData.salePrice)
          logger.info(
            { salePrice: saleData.salePrice, currency: saleData.currency, usdPrice: usdPrice.toFixed(2) },
            'Converted ETH to USD using CoinGecko rate'
          )
        } catch (error) {
          logger.error(
            { err: error, fallbackUsdPrice: saleData.usdPrice },
            'CoinGecko API failed, using original API USD price as fallback'
          )
          // Keep using the original API usdPrice as fallback (more accurate than hardcoded guess)
          usdPrice = saleData.usdPrice
        }
      }

      // Add artist line if we have a valid artist name
      if (artistDisplayName) {
        tweetMessage += `\nby ${artistDisplayName}`
      }

      // Add empty line
      tweetMessage += '\n'

      // Add collector line if we have a valid collector name
      if (collectorDisplayName) {
        tweetMessage += `\nacquired by ${collectorDisplayName}`
        tweetMessage += `\nfor ${saleData.salePrice} ${displayCurrency}`
        // Don't show USD price if currency is already USDC
        if (displayCurrency !== 'USDC' && usdPrice !== 0) {
          tweetMessage += ` ($${formatNumberWithCommas(usdPrice)})`
        }
      } else {
        tweetMessage += `\nacquired for ${saleData.salePrice} ${displayCurrency}`
        // Don't show USD price if currency is already USDC
        if (displayCurrency !== 'USDC' && usdPrice !== 0) {
          tweetMessage += ` ($${formatNumberWithCommas(usdPrice)})`
        }
      }

      // Add view link
      tweetMessage += `\n\nview: ${saleData.tokenUrl + TWITTER_PROJECTBOT_UTM}`

        logger.info({ tokenName: saleData.tokenName }, 'Posting sale tweet')

      // Post the tweet with retry logic
      for (let i = 0; i < NUM_RETRIES; i++) {
        try {
          await this.twitterClient?.v2.tweet(tweetMessage, {
            media: {
              media_ids: [media_id],
            },
          })
          logger.info({ tokenName: saleData.tokenName }, 'Successfully tweeted sale')
          return
        } catch (error) {
          if (error instanceof ApiResponseError && error.rateLimit) {
            logger.info(
              { limit: error.rateLimit.limit, remaining: error.rateLimit.remaining, reset: error.rateLimit.reset },
              'Rate limit hit on sale tweet'
            )
            const reset = new Date(error.rateLimit.reset * 1000)
            const now = new Date()
            const diff = reset.getTime() - now.getTime()
            const diffMinutes = Math.ceil(diff / 60000)
            try {
              await this.sendStatusMessage(
                `Sale tweet rate limited :( Will retry in ${diffMinutes} minutes`
              )
            } catch (e) {
              logger.error({ err: e }, 'Error sending rate limit status message')
            }
            return
          } else {
            logger.info({ err: error }, 'Error posting sale tweet')
            logger.info({ attempt: i + 1, numRetries: NUM_RETRIES }, 'Retrying sale tweet')
            await delay(RETRY_DELAY_MS)
          }
        }
      }
      logger.error('Failed to post sale tweet after all retry attempts')
    } catch (error) {
      logger.error({ err: error }, 'Error in tweetSale')
    }
  }
}
