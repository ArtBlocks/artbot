import * as dotenv from 'dotenv'
dotenv.config()
import { EUploadMimeType, TweetV2, TwitterApi } from 'twitter-api-v2'
import { Mint } from './MintBot'
import { ensOrAddress, getTokenApiUrl, timeout } from './APIBots/utils'
import axios from 'axios'
import { artIndexerBot } from '..'

const TWITTER_TIMEOUT_MS = 14 * 1000

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

    this.lastTweetId = '1684599404534124544'
    if (listener) {
      this.startSearchAndReplyRoutine()
    }
  }

  async startSearchAndReplyRoutine() {
    setInterval(() => {
      this.search()
    }, 1 * 20000)
  }

  async search() {
    console.log(`Searching Twitter... (last tweet id: ${this.lastTweetId})`)
    const artbotTweets = await this.twitterClient.v2.search('@artbot_ab', {
      since_id: this.lastTweetId,
    })

    console.log(`Rate limit status: ${artbotTweets.rateLimit}`)
    if (artbotTweets.meta.result_count === 0) {
      console.log('No new tweets found')
      return
    }

    for await (const tweet of artbotTweets) {
      console.log(tweet)
      if (tweet.text.includes('#')) {
        this.replyToTweet(tweet)
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
    const fullTokenId = await projectBot.handleTweet(afterTheHash)

    if (!fullTokenId) {
      console.error(`No token found for ${projectKey}`)
      return
    }
    console.log('Full token id', fullTokenId)
    const artBlocksResponse = await axios.get(
      getTokenApiUrl(fullTokenId.split('-')[0], fullTokenId.split('-')[1])
    )
    const artBlocksData = artBlocksResponse.data
    const downStream = await axios({
      method: 'GET',
      responseType: 'arraybuffer',
      url: artBlocksData.preview_asset_url,
    })
    console.log('Uploading media...', artBlocksData.preview_asset_url)
    const media_id = await this.twitterClient.v1.uploadMedia(downStream.data, {
      mimeType: EUploadMimeType.Png,
    })
    console.log('Media', media_id)
    await this.twitterClient.v2.reply(artBlocksData.name, tweet.id, {
      media: {
        media_ids: [media_id],
      },
    })
  }

  async uploadTwitterImage(imgBinary: Buffer): Promise<string | undefined> {
    try {
      // use race function to timeout because twitter library doesn't timeout
      const uploadRes = await Promise.race([
        timeout(TWITTER_TIMEOUT_MS, 'Twitter post timed out'),
        this.twitterClient.v1.uploadMedia(imgBinary, { mimeType: 'png' }),
      ])
      return uploadRes
    } catch (e) {
      console.error(e)
      return undefined
    }
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

    const imgResp = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    })

    if (!imgResp || !imgResp.data) {
      console.error('No image binary returned', JSON.stringify(artBlock))
      return
    }
    const imgBinary = Buffer.from(imgResp.data, 'binary')
    const mediaId = await this.uploadTwitterImage(imgBinary)

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
