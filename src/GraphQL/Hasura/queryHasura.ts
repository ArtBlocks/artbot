import * as dotenv from 'dotenv'

dotenv.config()
const fetch = require('node-fetch')
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql/core'
import {
  retryExchange,
  RetryExchangeOptions,
} from '@urql/exchange-retry/dist/types/retryExchange'
import {
  GetAllProjectsCurationStatusDocument,
  GetProjectStartTimesDocument,
} from './generated/graphql'

const retryOptions: RetryExchangeOptions = {
  maxNumberAttempts: 3,
  retryIf: (error) => !!error,
}

const hasuraClient = createClient({
  url: process.env.HASURA_GRAPHQL_ENDPOINT ?? '',
  fetch: fetch,
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

/**
 * Queries Hasura to get start_datetime of all projects
 * @returns Map of "contractAddr-projectId"->start_datetime
 * Returns empty dict on error (namely, if Hasura not configured)
 */
export async function getProjectsBirthdays() {
  const maxProjectsPerQuery = 1000
  try {
    const allProjects = []
    let loop = true
    while (loop) {
      const result = hasuraClient
        .query(GetProjectStartTimesDocument, {
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()

      allProjects.push(...result.projects_metadata)
      if (result.projects_metadata.length !== maxProjectsPerQuery) {
        loop = false
      }
    }
    const bdayMapping: { [id: string]: string } = {}
    allProjects.forEach((proj) => {
      bdayMapping[proj.id] = proj.start_datetime
    })
    return bdayMapping
  } catch (err) {
    console.error(err)
    return {}
  }
}

export async function getProjectsCurationStatus() {
  const maxProjectsPerQuery = 1000
  try {
    const allProjects = []
    let loop = true
    while (loop) {
      const result = hasuraClient
        .query(GetAllProjectsCurationStatusDocument, {
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()

      allProjects.push(...result.projects_metadata)
      if (result.projects_metadata.length !== maxProjectsPerQuery) {
        loop = false
      }
    }
    const collectionMapping: { [id: string]: string } = {}
    const heritageStatuses: { [id: string]: string } = {}
    allProjects.forEach((proj) => {
      let collectionName = proj.vertical_name.toLowerCase()
      if (proj.vertical?.category_name?.toLowerCase() !== 'collections') {
        collectionName = proj.vertical?.category_name?.toLowerCase()
      }
      if (proj.heritage_curation_status) {
        heritageStatuses[proj.id] = proj.heritage_curation_status
      }
      collectionMapping[proj.id] = collectionName
    })
    return [collectionMapping, heritageStatuses]
  } catch (err) {
    console.error(err)
    return {}
  }
}
