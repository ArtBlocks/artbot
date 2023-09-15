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
import axios from 'axios'
import { artIndexerBot } from '..'
import sharp from 'sharp'
import {
  getLastTweetId,
  getStatusRefreshToken,
  updateLastTweetId,
  updateStatusRefreshToken,
} from '../Data/supabase'

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

export class TwitterBot {
  twitterClient: TwitterApi
  twitterStatusAccount?: TwitterApi
  lastTweetId: string

  constructor({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
    listener,
  }: {
    appKey: string
    appSecret: string
    accessToken: string
    accessSecret: string
    listener?: boolean
  }) {
    this.lastTweetId = ''
    if (listener && process.env.TWITTER_ENABLED === 'true') {
      console.log('Starting Twitter listener')
      this.startSearchAndReplyRoutine()
    }
    this.twitterClient = new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret,
    })
  }

  async startSearchAndReplyRoutine() {
    try {
      this.lastTweetId = await getLastTweetId(prod)
    } catch (e) {
      console.error('Error getting last tweet id:', e)
      console.log('Aborting Twitter listener')
      return
    }

    setInterval(() => {
      this.search()
    }, SEARCH_INTERVAL_MS)
  }

  async search() {
    let artbotTweets: any
    try {
      // Query breakdown:
      // to:${ARTBOT_TWITTER_HANDLE} = Original tweets that start with @artbotartbot or direct replies to @artbotartbot tweets
      // @${ARTBOT_TWITTER_HANDLE} = Mentions artbotartbot

      const query = `(to:${ARTBOT_TWITTER_HANDLE} OR @${ARTBOT_TWITTER_HANDLE}) -is:retweet -has:links has:mentions -from:${STATUS_TWITTER_HANDLE} -from:${ARTBOT_TWITTER_HANDLE}`
      const devQuery = `to:ArtbotTesting from:ArtbotTesting`
      artbotTweets = await this.twitterClient.v2.search({
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
        await this.twitterClient.v2.reply(tweetMessage, tweet.id, {
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
        const mediaId = await this.twitterClient.v1.uploadMedia(buff, {
          mimeType: this.getMimeType(assetUrl),
        })
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

  async tweetArtblock(artBlock: Mint) {
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

    const tweetRes = await this.twitterClient.v2.tweet(tweetText, {
      text: tweetText,
      media: { media_ids: [mediaId] },
    })

    return {
      tweetRes,
    }
  }

  async sendToTwitter(mint: Mint) {
    try {
      await this.tweetArtblock(mint)
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
}
