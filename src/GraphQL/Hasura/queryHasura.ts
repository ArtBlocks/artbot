import * as dotenv from 'dotenv'
import { createClient } from 'urql/core'
import {
  GetAllProjectsHasuraDetailsDocument,
  ProjectsMetadataDetailsFragment,
} from './generated/graphql'

dotenv.config()
const fetch = require('node-fetch')

const hasuraClient = createClient({
  url: process.env.HASURA_GRAPHQL_ENDPOINT ?? '',
  fetch: fetch,
  fetchOptions: () => ({
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  }),
  requestPolicy: 'network-only',
})

const maxProjectsPerQuery = 1000

/**
 * Queries Hasura to get Hasura-specific project details
 * (namely project's birthday and up to date curation status)
 */
export async function getProjectsHasuraDetails(): Promise<
  ProjectsMetadataDetailsFragment[]
> {
  try {
    const allProjects: ProjectsMetadataDetailsFragment[] = []
    let loop = true
    while (loop) {
      const { data } = await hasuraClient
        .query(GetAllProjectsHasuraDetailsDocument, {
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()
      if (!data) {
        throw Error('No data returned from birthday Hasura query')
      }
      allProjects.push(...data.projects_metadata)
      if (data.projects_metadata.length !== maxProjectsPerQuery) {
        loop = false
      }
    }

    return allProjects
  } catch (err) {
    console.error(err)
    return []
  }
}
