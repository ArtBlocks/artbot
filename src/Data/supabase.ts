import { createClient } from '@supabase/supabase-js'
import { CURRENT_SEASON } from '../Classes/TriviaBot'

const supabaseClient =
  process.env.SUPABASE_URL && process.env.SUPABASE_API_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
    : undefined

export const updateTriviaScore = async (username: string): Promise<number> => {
  if (!supabaseClient) {
    throw new Error('No Supabase client configured')
  }
  let totalScore = 1
  let seasonScore = 1

  const { data } = await supabaseClient
    .from(process.env.TRIVIA_TABLE ?? '')
    .select('*')
    .eq('user', `${username}`)

  if (data?.length) {
    totalScore = parseInt(data[0].score ?? 0) + 1
    seasonScore = parseInt(data[0][CURRENT_SEASON] ?? 0) + 1
  }

  // NOTE: When changing seasons, we have to manually change the upsert column here. Super annoying I know.
  const { error } = await supabaseClient
    .from(process.env.TRIVIA_TABLE ?? '')
    .upsert({
      user: `${username}`,
      score: totalScore,
      season_three: seasonScore,
    })

  if (error) {
    console.error('Error updating trivia score', error)
    throw new Error(error.message)
  }

  return seasonScore
}

export const getAllTriviaScores = async (): Promise<any[] | null> => {
  if (!supabaseClient) {
    throw new Error('No Supabase client configured')
  }

  const { data } = await supabaseClient
    .from(process.env.TRIVIA_TABLE ?? '')
    .select(`*`)

  return data
}

export const getLastTweetId = async (prod: boolean): Promise<string> => {
  if (!supabaseClient) {
    throw new Error('No Supabase client configured')
  }

  const { data } = await supabaseClient
    .from('twitter')
    .select(`lastTweetId`)
    .eq('production', prod)
    .limit(1)

  if (!data?.length) {
    throw new Error('No last tweet id found')
  }

  return data[0].lastTweetId
}

export const updateLastTweetId = async (tweetId: string, prod: boolean) => {
  if (!supabaseClient) {
    throw new Error('No Supabase client configured')
  }
  const { error } = await supabaseClient
    .from('twitter')
    .upsert({ lastTweetId: tweetId, production: prod })

  if (error) {
    throw new Error(`Error updating last tweet id ${error}`)
  }
}

export const getStatusRefreshToken = async () => {
  if (!supabaseClient) {
    throw new Error('No Supabase client configured')
  }
  const { data } = await supabaseClient
    .from('twitter_tokens')
    .select(`token`)
    .eq('id', 'statusRefresh')
    .limit(1)

  if (!data?.length) {
    throw new Error('No last tweet id found')
  }

  return data[0].token
}

export const updateStatusRefreshToken = async (token: string) => {
  if (!supabaseClient) {
    throw new Error('No Supabase client configured')
  }
  const { error } = await supabaseClient
    .from('twitter_tokens')
    .upsert({ id: 'statusRefresh', token: token })

  if (error) {
    throw new Error(`Error updating status token ${error}`)
  }
}
