import * as dotenv from 'dotenv'
dotenv.config()
import { TwitterApi } from 'twitter-api-v2'
import { Mint, CollectionType } from './MintBot'
import {
  ensOrAddress,
  getCollectionType,
  timeout,
  replaceVideoWithGIF,
} from './APIBots/utils'
import axios from 'axios'

const TWITTER_TIMEOUT_MS = 14 * 1000

export class TwitterBot {
  abTwitterClient: TwitterApi
  constructor() {
    this.abTwitterClient = new TwitterApi({
      appKey: process.env.AB_TWITTER_API_KEY ?? '',
      appSecret: process.env.AB_TWITTER_API_SECRET ?? '',
      accessToken: process.env.AB_TWITTER_OAUTH_TOKEN ?? '',
      accessSecret: process.env.AB_TWITTER_OAUTH_SECRET ?? '',
    })
  }

  async uploadTwitterImage(imgBinary: Buffer): Promise<string | undefined> {
    try {
      // use race function to timeout because twitter library doesn't timeout
      const uploadRes = await Promise.race([
        timeout(TWITTER_TIMEOUT_MS, 'Twitter post timed out'),
        this.abTwitterClient.v1.uploadMedia(imgBinary, { mimeType: 'png' }),
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
    // replaceVideoWithGIF(artBlock.image)

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

    const tweetRes = await this.abTwitterClient.v2.tweet(tweetText, {
      text: tweetText,
      media: { media_ids: [mediaId] },
    })

    return {
      tweetRes,
      tweetUrl: `https://twitter.com/artblockmints/status/${tweetRes.data.id}`,
    }
  }

  async sendToTwitter(mint: Mint) {
    const collectionType = await getCollectionType(mint.contractAddress)
    if (
      collectionType === CollectionType.ENGINE ||
      collectionType === CollectionType.STAGING
    ) {
      // Do not tweet from AB mint account if PBAB or staging mint event
      // TODO: handle Engine mints
      return
    }

    try {
      await this.tweetArtblock(mint)
    } catch (e) {
      console.error('[ERROR]: ', e)
    }
  }
}
