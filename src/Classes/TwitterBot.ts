import * as dotenv from 'dotenv'
dotenv.config()
import { EUploadMimeType, TweetV2, TwitterApi } from 'twitter-api-v2'
import { Mint } from './MintBot'
import { ensOrAddress, getTokenApiUrl, getTokenUrl } from './APIBots/utils'
import axios from 'axios'
import { artIndexerBot } from '..'
import sharp from 'sharp'

const TWITTER_MEDIA_BYTE_LIMIT = 5242880
const SEARCH_INTERVAL_MS = 20000
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

    this.lastTweetId = '1684979000714592256'
    if (listener) {
      console.log('Starting Twitter listener')
      // TODO: Uncomment this when we're ready to start listening!
      // this.startSearchAndReplyRoutine()
    }
  }

  async startSearchAndReplyRoutine() {
    setInterval(() => {
      this.search()
    }, SEARCH_INTERVAL_MS)
  }

  async search() {
    console.log(`Searching Twitter... (last tweet id: ${this.lastTweetId})`)
    const artbotTweets = await this.twitterClient.v2.search('@artbot_ab', {
      since_id: this.lastTweetId,
    })

    const rateLimitReset = new Date(artbotTweets.rateLimit.reset * 1000)
    const now = new Date()
    const diffSeconds = (rateLimitReset.getTime() - now.getTime()) / 1000
    console.log(
      `Search rate limit status: \nLimit: ${
        artbotTweets.rateLimit.limit
      } \nRemaining: ${artbotTweets.rateLimit.remaining} \nReset: ${new Date(
        artbotTweets.rateLimit.reset * 1000
      ).toISOString()} (${diffSeconds / 60} mins from now)\n`
    )
    if (artbotTweets.meta.result_count === 0) {
      console.log('No new tweets found')
      return
    }

    for await (const tweet of artbotTweets) {
      if (tweet.text.includes('#')) {
        try {
          this.replyToTweet(tweet)
        } catch (e) {
          console.error(`Error responding to ${tweet.text}:`, e)
        }
      }
    }
    this.lastTweetId = artbotTweets.meta.newest_id
  }
  async replyToTweet(tweet: TweetV2) {
    const afterTheHash = tweet.text.replace('@artbot_ab', '')

    const projectKey = artIndexerBot.toProjectKey(
      afterTheHash.replace(/#(\?|\d+)/, '')
    )

    if (!artIndexerBot.projects[projectKey]) {
      console.error(`No project found for ${projectKey}`)
      return
    }

    const projectBot = artIndexerBot.projects[projectKey]
    const tokenId = await projectBot.handleTweet(afterTheHash)

    if (!tokenId) {
      console.error(`No token found for ${projectKey}`)
      return
    }

    const { data: artBlocksData } = await axios.get(
      getTokenApiUrl(projectBot.coreContract, tokenId)
    )

    // TODO: support gifs
    const imageUrl = artBlocksData.image
      .replace('gif', 'png')
      .replace('mp4', 'png')
    const media_id = await this.uploadMedia(imageUrl)

    if (!media_id) {
      console.error(`no media id returned for ${imageUrl} - not tweeting`)
      return
    }

    const tokenUrl = getTokenUrl(
      artBlocksData.external_url,
      projectBot.coreContract,
      tokenId
    )

    const tweetMessage = `${artBlocksData.name} by ${artBlocksData.artist} \n\n${tokenUrl}`

    console.log(`Replying to ${tweet.id} with ${artBlocksData.name}`)
    await this.twitterClient.v2.reply(tweetMessage, tweet.id, {
      media: {
        media_ids: [media_id],
      },
    })
  }

  async uploadMedia(imageUrl: string): Promise<string | undefined> {
    const downStream = await axios({
      method: 'GET',
      responseType: 'arraybuffer',
      url: imageUrl,
    })

    let imageBuff: Buffer = downStream.data as Buffer

    if (imageBuff.length > TWITTER_MEDIA_BYTE_LIMIT) {
      console.log('Resizing image...')
      const ratio = TWITTER_MEDIA_BYTE_LIMIT / imageBuff.length
      const metadata = await sharp(imageBuff).metadata()
      imageBuff = await sharp(imageBuff)
        .resize({ width: Math.floor((metadata.width ?? 0) * ratio) })
        .toBuffer()
    }

    console.log('Uploading media...', imageUrl)
    return await this.twitterClient.v1.uploadMedia(imageBuff, {
      mimeType: EUploadMimeType.Png,
    })
  }

  async tweetArtblock(artBlock: Mint) {
    const imageUrl = artBlock.image
    if (!artBlock.image) {
      console.error('No artblock image defined', JSON.stringify(artBlock))
      return
    }
    // now that we support animated projects with GIF/MP4 outputs this logic's needed to make sure we only post GIF to Discord/Twitter
    // TODO: mint tweets aren't posting right now. Need to fix this and handle .gif extensions in uploadTwitterImage()
    // artBlocksData.image = replaceVideoWithGIF(artBlock.image)

    const mediaId = await this.uploadMedia(imageUrl)

    if (!mediaId) {
      console.error('no media id returned, not tweeting')
      return
    }

    const ownerText = await ensOrAddress(artBlock.owner)

    const tweetText = `${artBlock.tokenName} minted${
      ownerText ? ` by ${ownerText}` : ''
    }. \n\n${artBlock.artblocksUrl}`
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
