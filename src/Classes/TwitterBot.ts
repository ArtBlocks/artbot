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
  TWITTER_PROJECTBOT_UTM,
  delay,
  ensOrAddress,
  getTokenApiUrl,
  getTokenUrl,
} from './APIBots/utils'
import { lookupUserByAddress } from '../Data/queryGraphQL'
import axios from 'axios'
import { artIndexerBot, ARTIST_TWITTER_HANDLES } from '..'
import sharp from 'sharp'
import {
  getLastTweetId,
  getStatusRefreshToken,
  updateLastTweetId,
  updateStatusRefreshToken,
} from '../Data/supabase'

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

    if (!appKey || !appSecret || !accessToken || !accessSecret) {
      console.warn(
        'Twitter credentials are missing - not initializing TwitterBot'
      )
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
      console.log('Starting Twitter listener')
      this.startSearchAndReplyRoutine()
    } else {
      console.log(
        'Twitter listener disabled via TWITTER_LISTENING_ENABLED constant'
      )
    }
  }

  async startSearchAndReplyRoutine() {
    try {
      this.lastTweetId = await getLastTweetId(prod)
    } catch (e) {
      console.error('Error getting last tweet id:', e)
      console.log('Aborting Twitter listener')
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

  /**
   * Sanitizes a Twitter username by extracting handle from URLs and validating format
   * @param twitterUsername - Raw twitter username from database
   * @returns Clean Twitter handle without @ symbol, or null if invalid
   */
  private sanitizeTwitterUsername(twitterUsername: string): string | null {
    if (!twitterUsername || twitterUsername.trim() === '') {
      return null
    }

    let handle = twitterUsername.trim()

    // Remove @ symbol if present
    if (handle.startsWith('@')) {
      handle = handle.substring(1)
    }

    // Extract handle from Twitter URLs
    if (handle.includes('twitter.com/') || handle.includes('x.com/')) {
      try {
        const url = new URL(
          handle.startsWith('http') ? handle : `https://${handle}`
        )
        if (url.hostname === 'twitter.com' || url.hostname === 'x.com') {
          const pathSegments = url.pathname
            .split('/')
            .filter((segment) => segment !== '')
          if (pathSegments.length > 0) {
            handle = pathSegments[0]
          }
        }
      } catch (error) {
        // If URL parsing fails, try to extract manually
        const match = handle.match(/(?:twitter\.com\/|x\.com\/)([^/\s?]+)/)
        if (match && match[1]) {
          handle = match[1]
        } else {
          return null
        }
      }
    }

    // Validate Twitter handle format
    // Twitter handles can only contain letters, numbers, and underscores
    // Must be 1-15 characters long
    const twitterHandleRegex = /^[a-zA-Z0-9_]{1,15}$/
    if (!twitterHandleRegex.test(handle)) {
      return null
    }

    return handle
  }

  async search() {
    let artbotTweets: any
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
    } catch (error) {
      if (
        error instanceof ApiResponseError &&
        error.rateLimitError &&
        error.rateLimit
      ) {
        console.log(
          `Search rate limit hit! Limit will reset at timestamp ${error.rateLimit.reset}`
        )
      } else if (
        error?.code === 400 &&
        error.errors[0] &&
        error.errors[0]?.message &&
        error.errors[0]?.message.includes('since_id')
      ) {
        const messageSplit = error.errors[0]?.message.split(' ')
        const lastId = BigInt(messageSplit[messageSplit.length - 1])
        const adjustedLastId = (lastId + BigInt('100000000000')).toString()
        console.log(
          'TwitterBot since_id is invalid - setting to',
          adjustedLastId
        )
        this.lastTweetId = adjustedLastId
      } else {
        console.error('Error searching Twitter:', error)
      }
      return
    }

    console.log('artbotTweets', artbotTweets?.meta?.result_count)

    if (artbotTweets.meta.result_count === 0) {
      console.log('No new tweets found')
      return
    }

    for await (const tweet of artbotTweets) {
      try {
        this.replyToTweet(tweet)
      } catch (e) {
        console.error(`Error responding to ${tweet.text}:`, e)
      }
    }
    this.updateLastTweetId(artbotTweets.meta.newest_id)
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
      console.warn(`Tweet '${tweet.text}' is not a supported action`)
      return
    }
    console.log(`Handling tweet ${tweet.id}: ${cleanedTweet}`)

    let projectBot
    let tokenId
    try {
      const { projectBot: p, tokenId: t } =
        await artIndexerBot.handleNumberTweet(cleanedTweet)

      projectBot = p
      tokenId = t
    } catch (e) {
      console.error(e)
      return
    }

    const { data: artBlocksData } = await axios.get(
      getTokenApiUrl(projectBot.coreContract, tokenId)
    )

    const assetUrl = artBlocksData.preview_asset_url

    let media_id: string
    try {
      media_id = await this.uploadMedia(assetUrl)
    } catch (error) {
      console.error(`Error uploading media for ${assetUrl}:`, error)
      return
    }

    const tokenUrl =
      getTokenUrl(
        artBlocksData.external_url,
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

    console.log(`Replying to ${tweet.id} with ${artBlocksData.name}`)
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
          console.log(
            `Rate limit hit on tweet sending: \nLimit: ${error.rateLimit.limit}\nRemaining: ${error.rateLimit.remaining}\nReset: ${error.rateLimit.reset}`
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
            console.error('Error sending status message:', e)
          }
          return
        } else {
          console.log(`Error replying to ${tweet.id}:`, error)
          console.log(`Retrying (attempt ${i} of ${NUM_RETRIES})...`)
          await delay(RETRY_DELAY_MS)
        }
      }
    }
    console.error('Retry attempts failed :( - dropping tweet')
  }

  async uploadMedia(assetUrl: string): Promise<string> {
    const downStream = await axios({
      method: 'GET',
      responseType: 'arraybuffer',
      url: assetUrl,
    })

    let buff = downStream.data as Buffer

    while (buff.length > TWITTER_MEDIA_BYTE_LIMIT) {
      if (assetUrl.includes('.mp4')) {
        // Can't resize videos, so try again with the png
        return await this.uploadMedia(assetUrl.replace('.mp4', '.png'))
      }
      console.log('Resizing...')
      const ratio = TWITTER_MEDIA_BYTE_LIMIT / buff.length
      const metadata = await sharp(buff).metadata()
      buff = await sharp(buff)
        .resize({ width: Math.floor((metadata.width ?? 0) * ratio) })
        .toBuffer()
    }

    console.log('Uploading media to twitter...', assetUrl)
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
        console.log(`Error uploading ${assetUrl}:`, err)
        console.log(`Retrying (attempt ${i} of ${NUM_RETRIES})...`)
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
    // Check if Twitter mint posting is enabled
    if (!TWITTER_MINT_POSTING_ENABLED) {
      console.log(
        'Twitter mint posting disabled via TWITTER_MINT_POSTING_ENABLED constant'
      )
      return
    }

    const assetUrl = artBlock.image
    if (!artBlock.image) {
      console.error('No artblock image defined', JSON.stringify(artBlock))
      return
    }

    const mediaId = await this.uploadMedia(assetUrl)

    if (!mediaId) {
      console.error('no media id returned, not tweeting')
      return
    }

    const ownerText = await ensOrAddress(artBlock.owner)

    const tweetText = `${artBlock.tokenName} minted${
      ownerText ? ` by ${ownerText}` : ''
    }. \n\n${artBlock.artblocksUrl + TWITTER_PROJECTBOT_UTM}`
    console.log(`Tweeting ${tweetText}`)

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
      console.error('Error posting to Twitter: ', e)
    }
  }

  // Have to log in with OAuth2 to access status account
  // Refresh token is stored in supabase
  async signIntoStatusAccount() {
    console.log('Signing in to status account')
    const token = await getStatusRefreshToken()
    const API = new TwitterApi({
      clientId: process.env.AB_TWITTER_CLIENT_ID ?? '',
      clientSecret: process.env.AB_TWITTER_CLIENT_SECRET ?? '',
    })
    console.log('Connecting with', token)
    const { client: refreshedClient, refreshToken: newRefreshToken } =
      await API.refreshOAuth2Token(token)
    console.log('Connected to status account! New token:', newRefreshToken)
    await updateStatusRefreshToken(newRefreshToken ?? '')
    console.log('Saved new refresh token')
    this.twitterStatusAccount = refreshedClient
  }

  async sendStatusMessage(message: string, replyId?: string) {
    // Check if Twitter listening is enabled (status messages are mainly for user interactions)
    if (!TWITTER_LISTENING_ENABLED) {
      console.log(
        'Twitter status messaging disabled via TWITTER_LISTENING_ENABLED constant'
      )
      return
    }

    if (!this.twitterStatusAccount) {
      await this.signIntoStatusAccount()
    }

    console.log(`Sending status message ${replyId ? `to ${replyId}` : ''}`)

    if (replyId) {
      await this.twitterStatusAccount?.v2.reply(message, replyId)
      return
    }
    await this.twitterStatusAccount?.v2.tweet(message)
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
        const sanitizedHandle = this.sanitizeTwitterUsername(
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
      console.log(`No user profile found for address ${address}, trying ENS`)
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
    // Check if Twitter sale posting is enabled
    if (!TWITTER_SALE_POSTING_ENABLED) {
      console.log(
        'Twitter sale posting disabled via TWITTER_SALE_POSTING_ENABLED constant'
      )
      return
    }

    try {
      console.log(`Tweeting sale for ${saleData.tokenName}`)

      // Upload the token image to Twitter
      let media_id: string
      try {
        media_id = await this.uploadMedia(saleData.assetUrl)
      } catch (error) {
        console.error(`Error uploading media for sale tweet:`, error)
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

      // Add artist line if we have a valid artist name
      if (artistDisplayName) {
        tweetMessage += `\nby ${artistDisplayName}`
      }

      // Add empty line
      tweetMessage += '\n'

      // Add collector line if we have a valid collector name
      if (collectorDisplayName) {
        tweetMessage += `\nacquired by ${collectorDisplayName}`
        tweetMessage += `\nfor ${
          saleData.salePrice
        } ${displayCurrency} ($${saleData.usdPrice.toFixed(2)})`
      } else {
        tweetMessage += `\nacquired for ${
          saleData.salePrice
        } ${displayCurrency} ($${saleData.usdPrice.toFixed(2)})`
      }

      // Add view link
      tweetMessage += `\n\nview: ${saleData.tokenUrl + TWITTER_PROJECTBOT_UTM}`

      console.log(`Posting sale tweet: ${saleData.tokenName}`)

      // Post the tweet with retry logic
      for (let i = 0; i < NUM_RETRIES; i++) {
        try {
          await this.twitterClient?.v2.tweet(tweetMessage, {
            media: {
              media_ids: [media_id],
            },
          })
          console.log(`Successfully tweeted sale for ${saleData.tokenName}`)
          return
        } catch (error) {
          if (error instanceof ApiResponseError && error.rateLimit) {
            console.log(
              `Rate limit hit on sale tweet: \nLimit: ${error.rateLimit.limit}\nRemaining: ${error.rateLimit.remaining}\nReset: ${error.rateLimit.reset}`
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
              console.error('Error sending rate limit status message:', e)
            }
            return
          } else {
            console.log(`Error posting sale tweet:`, error)
            console.log(`Retrying (attempt ${i + 1} of ${NUM_RETRIES})...`)
            await delay(RETRY_DELAY_MS)
          }
        }
      }
      console.error('Failed to post sale tweet after all retry attempts')
    } catch (error) {
      console.error('Error in tweetSale:', error)
    }
  }
}
