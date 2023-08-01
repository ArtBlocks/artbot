import { createClient } from '@supabase/supabase-js'

const supabaseClient =
  process.env.SUPABASE_URL && process.env.SUPABASE_API_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
    : undefined

export const updateTriviaScore = async (username: string): Promise<number> => {
  if (!supabaseClient) {
    throw new Error('No Supabase client configured')
  }
  let score = 1
  const { data } = await supabaseClient
    .from(process.env.TRIVIA_TABLE ?? '')
    .select(`score`)
    .eq('user', `${username}`)

  if (data?.length) {
    score = parseInt(data[0].score) + 1
  }

  const { error } = await supabaseClient
    .from(process.env.TRIVIA_TABLE ?? '')
    .upsert({ user: `${username}`, score: score })

  if (error) {
    console.error('Error updating trivia score', error)
    throw new Error(error.message)
  }

  return score
}

type TriviaScore = {
  user: string
  score: number
}

export const getTriviaLeaderboard = async (): Promise<TriviaScore[] | null> => {
  if (!supabaseClient) {
    throw new Error('No Supabase client configured')
  }

  const { data } = await supabaseClient
    .from(process.env.TRIVIA_TABLE ?? '')
    .select(`user, score`)
    .order('score', { ascending: false })
    .limit(10)

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
