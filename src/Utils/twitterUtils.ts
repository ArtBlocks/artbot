import { TwitterApi } from 'twitter-api-v2'
import { updateStatusRefreshToken } from '../Data/supabase'

let _codeVerifier = ''
let _state = ''

// NOTE: You'll need to update this callback URL to match your own ngrok thing
const CALLBACK_URL = process.env.TWITTER_CALLBACK_URL ?? ''

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

/**
 * Sanitizes a Twitter username by extracting handle from URLs and validating format
 * This function handles:
 * - Plain handles (with or without @)
 * - Twitter/X URLs
 * - Validates final handle format
 * @param twitterInput - Raw twitter username/URL from any source
 * @returns Clean Twitter handle without @ symbol, or null if invalid
 */
export function sanitizeTwitterHandle(twitterInput: string): string | null {
  if (!twitterInput || twitterInput.trim() === '') {
    return null
  }

  let handle = twitterInput.trim()

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
