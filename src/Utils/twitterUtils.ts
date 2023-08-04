import { TwitterApi } from 'twitter-api-v2'
import { updateStatusRefreshToken } from '../Data/supabase'

let _codeVerifier = ''
let _state = ''

// NOTE: You'll need to update this callback URL to match your own ngrok thing
const CALLBACK_URL =
  'https://b4f8-2601-581-c300-5400-a547-e430-b205-e9c0.ngrok-free.app/callback'

// Use these two functions if we need to regenerate the status account tokens
export function start() {
  const API = new TwitterApi({
    clientId: process.env.AB_TWITTER_CLIENT_ID ?? '',
    clientSecret: process.env.AB_TWITTER_CLIENT_SECRET ?? '',
  })

  const { url, codeVerifier, state } = API.generateOAuth2AuthLink(
    CALLBACK_URL,
    {
      scope: ['offline.access', 'tweet.write', 'tweet.read', 'users.read'],
    }
  )
  _codeVerifier = codeVerifier
  _state = state

  console.log(url)
}

export function verifyTwitter(res: any, req: any) {
  const { state, code } = req.query
  const codeVerifier = _codeVerifier
  const sessionState = _state

  if (!codeVerifier || !state || !sessionState || !code) {
    return res.status(400).send('You denied the app or your session expired!')
  }
  if (state !== sessionState) {
    return res.status(400).send('Stored tokens didnt match!')
  }
  // Obtain access token
  const client = new TwitterApi({
    clientId: process.env.AB_TWITTER_CLIENT_ID ?? '',
    clientSecret: process.env.AB_TWITTER_CLIENT_SECRET ?? '',
  })

  client
    .loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: CALLBACK_URL,
    })
    .then(async ({ refreshToken }) => {
      console.log('\nrefresh:', refreshToken)
      updateStatusRefreshToken(refreshToken ?? '')
    })
    .catch(() => res.status(403).send('Invalid verifier or access tokens!'))
}
