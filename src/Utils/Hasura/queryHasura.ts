import {
  createClient,
  fetchExchange,
  cacheExchange,
  dedupExchange,
} from '@urql/core'
import * as dotenv from 'dotenv'
dotenv.config()

import {
  GetTokensImagesQuery,
  GetTokensImagesQueryVariables,
  GetTokensImagesDocument,
} from './generated/graphql'
const fetch = require('node-fetch')
import {
  retryExchange,
  RetryExchangeOptions,
} from '@urql/exchange-retry/dist/types/retryExchange'
import { DocumentNode } from 'graphql'

const retryOptions: RetryExchangeOptions = {
  maxNumberAttempts: 3,
  retryIf: (error) => !!error,
}

const hasuraClient = createClient({
  url: process.env.HASURA_GRAPHQL_ENDPOINT as string,
  fetch: fetch as any,
  exchanges: [
    dedupExchange,
    cacheExchange,
    retryExchange(retryOptions) as any,
    fetchExchange,
  ],
  fetchOptions: () => ({
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  }),
})

export async function getTokensImages(
  ids: string[]
): Promise<GetTokensImagesQuery> {
  const { data, error } = await hasuraClient
    .query<GetTokensImagesQuery, GetTokensImagesQueryVariables>(
      GetTokensImagesDocument as DocumentNode,
      {
        token_ids: ids,
      }
    )
    .toPromise()

  if (error) {
    console.error(error)
    throw error
  }
  if (!data) {
    throw new Error('No data returned')
  }
  return data
}
