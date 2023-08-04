import * as dotenv from 'dotenv'
dotenv.config()
import {
  ApiResponseError,
  EUploadMimeType,
  TweetV2,
  TwitterApi,
  TwitterApiReadWrite,
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
import { getLastTweetId, updateLastTweetId } from '../Data/supabase'

const TWITTER_MEDIA_BYTE_LIMIT = 5242880
// Search rate limit is 60 queries per 15 minutes - shortest interval is 15 secs (though we should keep it a bit longer)
const SEARCH_INTERVAL_MS = 20000
const NUM_RETRIES = 5
const RETRY_DELAY_MS = 5000
const prod = process.env.ARTBOT_IS_PROD
  ? process.env.ARTBOT_IS_PROD.toLowerCase() === 'true'
  : false

const ARTBOT_TWITTER_HANDLE = '@artbotartbot'

export class TwitterBot {
  twitterClient: TwitterApi
  twitterRW?: TwitterApiReadWrite

  lastTweetId: string
  codeVerifier?: any
  state?: any
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

      this.twitterClient = new TwitterApi({
        appKey,
        appSecret,
        accessToken,
        accessSecret,
      })
      // const API = new TwitterApi({
      //   clientId: 'MjA3VFNwMjRLcWNPTk5UemxjSF86MTpjaQ',
      //   clientSecret: 'tAhZe4IoMPfaW0QdurJWKV-_gvASKnCxLmEWm_9zzudYQ6om1V',
      // })
      // API.refreshOAuth2Token(
      //   'dmVQeVNsR1lkblF4RTc0SWhvWTROa0ttZ2plNkM5RTFta3BZZ0RHbENuaGl0OjE2OTEwODExNDE3ODA6MTowOnJ0OjE'
      //   // 'aVozQUFUMEs4UDFWaVhRREIzeF83N3VIeWh5ZzFKek0zc0g3TEV0ZkdpS2t6OjE2OTEwODAxMzY3Mjg6MTowOnJ0OjE'
      // ).then((res) => {
      //   const { client: refreshedClient, refreshToken: newRefreshToken } = res

      //   console.log('newRefreshToken', newRefreshToken)
      //   this.twitterRW = refreshedClient
      // })
      // const { url, codeVerifier, state } = API.generateOAuth2AuthLink(
      //   'https://b4f8-2601-581-c300-5400-a547-e430-b205-e9c0.ngrok-free.app/callback',
      //   { scope: ['offline.access', 'tweet.write', 'tweet.read', 'users.read'] }
      // )
      // this.codeVerifier = codeVerifier
      // this.state = state

      // console.log(url)
    } else {
      this.twitterClient = new TwitterApi({
        appKey,
        appSecret,
        accessToken,
        accessSecret,
      })
    }
  }

  verify(res: any, req: any) {
    console.log('req.query', req.query)
    console.log('req.session', req.session)

    const { state, code } = req.query
    // Get the saved codeVerifier from session
    const codeVerifier = this.codeVerifier
    const sessionState = this.state

    if (!codeVerifier || !state || !sessionState || !code) {
      return res.status(400).send('You denied the app or your session expired!')
    }
    if (state !== sessionState) {
      return res.status(400).send('Stored tokens didnt match!')
    }
    // Obtain access token
    const client = new TwitterApi({
      clientId: 'MjA3VFNwMjRLcWNPTk5UemxjSF86MTpjaQ',
      clientSecret: 'tAhZe4IoMPfaW0QdurJWKV-_gvASKnCxLmEWm_9zzudYQ6om1V',
    })

    client
      .loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri:
          'https://b4f8-2601-581-c300-5400-a547-e430-b205-e9c0.ngrok-free.app/callback',
      })
      .then(async ({ refreshToken }) => {
        // {loggedClient} is an authenticated client in behalf of some user
        // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
        // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)

        console.log('\nrefresh:', refreshToken)
        // Example request
      })
      .catch(() => res.status(403).send('Invalid verifier or access tokens!'))
  }

  async startSearchAndReplyRoutine() {
    this.lastTweetId = await getLastTweetId(prod)
    setInterval(() => {
      this.search()
    }, SEARCH_INTERVAL_MS)
  }

  async search() {
    console.log(`Searching Twitter... (last tweet id: ${this.lastTweetId})`)
    let artbotTweets: any
    let artbotReplies: any
    try {
      // to:${ARTBOT_TWITTER_HANDLE} = Original tweets that start with @artbotartbot or direct replies to @artbotartbot tweets
      // ("@${ARTBOT_TWITTER_HANDLE} @${ARTBOT_TWITTER_HANDLE}") gets mentions in other people's threads (e.g. I tweet "@artbot #?", then you respond to my tweet saying "@artbot #?"")
      // @${ARTBOT_TWITTER_HANDLE} -is:reply = Original that don't start with @artbotartbot
      artbotTweets = await this.twitterClient.v2.search({
        query: `has:mentions (to:${ARTBOT_TWITTER_HANDLE} OR ("@${ARTBOT_TWITTER_HANDLE} @${ARTBOT_TWITTER_HANDLE}") OR (@${ARTBOT_TWITTER_HANDLE} -is:reply)) -is:retweet -is:quote -has:links`,
        since_id: this.lastTweetId,
      })
      artbotReplies = await this.twitterClient.v2.search({
        query: `"${ARTBOT_TWITTER_HANDLE} ${ARTBOT_TWITTER_HANDLE}" is:reply -has:links -is:retweet`,
        since_id: this.lastTweetId,
      })
    } catch (error) {
      if (
        error instanceof ApiResponseError &&
        error.rateLimitError &&
        error.rateLimit
      ) {
        console.log(
          `You just hit the rate limit! Limit for this endpoint is ${error.rateLimit.limit} requests!`
        )
        console.log(
          `Request counter will reset at timestamp ${error.rateLimit.reset}.`
        )
        return
      } else {
        console.error('Error searching Twitter:', error)
        throw error
      }
    }

    console.log('artbotTweets', artbotTweets?.meta?.result_count)
    console.log('artbotReplies', artbotReplies?.meta?.result_count)

    // const tweets = artbotTweets.tweets //
    const tweets = [...artbotTweets.tweets, ...artbotReplies.tweets]

    let latestId = ''
    // if (artbotTweets.meta.result_count === 0) {
    //   console.log('No new tweets found')
    //   return
    // }
    // latestId = artbotTweets.meta.newest_id
    if (
      artbotTweets.meta.result_count === 0 &&
      artbotReplies.meta.result_count === 0
    ) {
      console.log('No new tweets found')
      return
    } else if (
      artbotTweets.meta.result_count === 0 &&
      artbotReplies.meta.result_count !== 0
    ) {
      latestId = artbotReplies.meta.newest_id
    } else if (
      artbotTweets.meta.result_count !== 0 &&
      artbotReplies.meta.result_count === 0
    ) {
      latestId = artbotTweets.meta.newest_id
    } else {
      latestId = Math.max(
        parseInt(artbotTweets.meta.newest_id ?? '0'),
        parseInt(artbotReplies.meta.newest_id ?? '0')
      ).toString()
    }
    for await (const tweet of tweets) {
      try {
        this.replyToTweet(tweet)
      } catch (e) {
        console.error(`Error responding to ${tweet.text}:`, e)
      }
    }
    this.updateLastTweetId(latestId)
  }
  async updateLastTweetId(tweetId: string) {
    if (tweetId === this.lastTweetId) {
      return
    }
    this.lastTweetId = tweetId
    await updateLastTweetId(tweetId, prod)
  }
  async replyToTweet(tweet: TweetV2) {
    const cleanedTweet = tweet.text.replaceAll(/@\w+/g, '').trim() // Regex to remove all mentions
    if (!tweet.text.includes('#')) {
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
        // console.log(this.twitterRW)
        // const currentRateLimitForMe =
        //   await this.rateLimitPlugin?.v2.getRateLimit('2/tweets')
        // console.log(currentRateLimitForMe?.limit) // 75
        // console.log(currentRateLimitForMe?.remaining) // 74
        // console.log(currentRateLimitForMe?.reset) // 74

        try {
          // Get a single tweet
          await this.twitterClient.v2.reply(tweetMessage, tweet.id, {
            media: {
              media_ids: [media_id],
            },
          })
        } catch (error) {
          if (
            error instanceof ApiResponseError &&
            error.rateLimitError &&
            error.rateLimit
          ) {
            console.log(
              `You just hit the rate limit! Limit for this endpoint is ${error.rateLimit.limit} requests!`
            )
            console.log(
              `Request counter will reset at timestamp ${error.rateLimit.reset}.`
            )
          }
        }

        // await this.twitterRW?.v2.reply(tweetMessage, tweet.id, {
        //   media: {
        //     media_ids: [media_id],
        //   },
        // })
        return
      } catch (err) {
        console.log(`Error replying to ${tweet.id}:`, err)
        console.log(`Retrying (attempt ${i} of ${NUM_RETRIES})...`)
        await delay(RETRY_DELAY_MS)
      }
    }
  }

  async uploadMedia(assetUrl: string): Promise<string> {
    const downStream = await axios({
      method: 'GET',
      responseType: 'arraybuffer',
      url: assetUrl,
    })

    let imageBuff: Buffer = downStream.data as Buffer

    while (imageBuff.length > TWITTER_MEDIA_BYTE_LIMIT) {
      console.log('Resizing...')
      const ratio = TWITTER_MEDIA_BYTE_LIMIT / imageBuff.length
      const metadata = await sharp(imageBuff).metadata()
      imageBuff = await sharp(imageBuff)
        .resize({ width: Math.floor((metadata.width ?? 0) * ratio) })
        .toBuffer()
    }

    console.log('Uploading media to twitter...', assetUrl)
    for (let i = 0; i < NUM_RETRIES; i++) {
      try {
        const mediaId = await this.twitterClient.v1.uploadMedia(imageBuff, {
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
}
