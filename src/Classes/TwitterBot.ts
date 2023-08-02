import * as dotenv from 'dotenv'
dotenv.config()
import { EUploadMimeType, TweetV2, TwitterApi } from 'twitter-api-v2'
import { Mint } from './MintBot'
import {
  TWITTER_PROJECTBOT_UTM,
  ensOrAddress,
  getTokenApiUrl,
  getTokenUrl,
} from './APIBots/utils'
import axios from 'axios'
import { artIndexerBot } from '..'
import sharp from 'sharp'
import { getLastTweetId, updateLastTweetId } from '../Data/supabase'

const TWITTER_MEDIA_BYTE_LIMIT = 5242880
// Search rate limit is 60 queries per 15 minutes - shortest interval is 15 secs (though we should keep it a bit longer)
const SEARCH_INTERVAL_MS = 20000
const NUM_RETRIES = 3
const prod = process.env.ARTBOT_IS_PROD
  ? process.env.ARTBOT_IS_PROD.toLowerCase() === 'true'
  : false

export class TwitterBot {
  twitterClient: TwitterApi
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
    this.twitterClient = new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret,
    })

    this.lastTweetId = ''
    if (listener) {
      console.log('Starting Twitter listener')
      // TODO: Uncomment this when we're ready to start listening!
      // this.startSearchAndReplyRoutine()
    }
  }

  async startSearchAndReplyRoutine() {
    this.lastTweetId = await getLastTweetId(prod)
    setInterval(() => {
      this.search()
    }, SEARCH_INTERVAL_MS)
  }

  async search() {
    console.log(`Searching Twitter... (last tweet id: ${this.lastTweetId})`)
    const artbotTweets = await this.twitterClient.v2.search('@artbot_ab', {
      since_id: this.lastTweetId,
    })

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
    const cleanedTweet = tweet.text.replaceAll(/@\w+/g, '') // Regex to remove all mentions
    if (!tweet.text.includes('#')) {
      console.warn(`Tweet '${tweet.text}' is not a supported action`)
      return
    }

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
    const media_id = await this.uploadMedia(assetUrl)

    if (!media_id) {
      console.error(`no media id returned for ${assetUrl} - not tweeting`)
      return
    }

    const tokenUrl = getTokenUrl(
      artBlocksData.external_url,
      projectBot.coreContract,
      tokenId
    )

    const tweetMessage = `${artBlocksData.name} by ${artBlocksData.artist} \n\n${tokenUrl}`

    console.log(`Replying to ${tweet.id} with ${artBlocksData.name}`)
    for (let i = 0; i < NUM_RETRIES; i++) {
      try {
        await this.twitterClient.v2.reply(tweetMessage, tweet.id, {
          media: {
            media_ids: [media_id],
          },
        })
        return
      } catch (err) {
        console.log(`Error replying to ${tweet.id}:`, err)
        console.log(`Retrying (attempt ${i} of ${NUM_RETRIES})...`)
      }
    }
  }

  async uploadMedia(assetUrl: string): Promise<string | undefined> {
    const downStream = await axios({
      method: 'GET',
      responseType: 'arraybuffer',
      url: assetUrl,
    })

    let imageBuff: Buffer = downStream.data as Buffer
    if (imageBuff.length > TWITTER_MEDIA_BYTE_LIMIT) {
      console.log('Resizing...')
      const ratio = TWITTER_MEDIA_BYTE_LIMIT / imageBuff.length
      const metadata = await sharp(imageBuff).metadata()
      imageBuff = await sharp(imageBuff)
        .resize({ width: Math.floor((metadata.width ?? 0) * ratio) })
        .toBuffer()
    }

    console.log('Uploading media...', assetUrl)
    return await this.twitterClient.v1.uploadMedia(imageBuff, {
      mimeType: this.getMimeType(assetUrl),
    })
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
}
