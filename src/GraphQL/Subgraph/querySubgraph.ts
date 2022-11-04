import * as dotenv from 'dotenv'
dotenv.config()
import { createClient } from 'urql/core'
import {
  GetContractProjectDocument,
  ProjectDetailFragment,
  GetAllProjectsDocument,
  GetContractOpenProjectsDocument,
  GetWalletTokensDocument,
} from './generated/graphql'

const fetch = require('node-fetch')

const API_URL = 'https://api.thegraph.com/subgraphs/name/artblocks/art-blocks'
const maxProjectsPerQuery = 1000
const CORE_CONTRACTS: {
  [id: string]: string
} = require('../../ProjectConfig/coreContracts.json')

const client = createClient({
  url: API_URL,
  fetch: fetch,
  fetchOptions: () => ({
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  }),
})

export async function getAllProjects(): Promise<ProjectDetailFragment[]> {
  try {
    const allProjects: any[] = []
    let loop = true
    while (loop) {
      const { data } = await client
        .query(GetAllProjectsDocument, {
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()
      if (!data) {
        throw Error('No data returned from birthday Hasura query')
      }
      allProjects.push(...data.projects)
      if (data.projects.length !== maxProjectsPerQuery) {
        loop = false
      }
    }
    return allProjects
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getAllTokensInWallet(walletAddress: string) {
  const maxTokensPerQuery = 1000
  try {
    const allTokens: any[] = []
    let loop = true
    while (loop) {
      const { data } = await client
        .query(GetWalletTokensDocument, {
          wallet: walletAddress,
          first: maxTokensPerQuery,
          skip: allTokens.length,
        })
        .toPromise()
      if (!data) {
        throw Error('No data returned from birthday Hasura query')
      }
      allTokens.push(...data.tokens)
      if (data.tokens.length !== maxTokensPerQuery) {
        loop = false
      }
    }
    return allTokens
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export async function getArtblocksOpenProjects(): Promise<
  ProjectDetailFragment[]
> {
  try {
    const projects: ProjectDetailFragment[] = []

    Object.values(CORE_CONTRACTS).forEach(async (contract: string) => {
      let loop = true
      while (loop) {
        const { data } = await client
          .query(GetContractOpenProjectsDocument, {
            first: maxProjectsPerQuery,
            skip: projects.length,
            contract: contract,
          })
          .toPromise()
        if (!data || !data.contract?.projects) {
          throw Error('No data returned from birthday Hasura query')
        }

        data.contract?.projects.forEach((project: ProjectDetailFragment) => {
          projects.push(project)
        })
        if (data.contract?.projects?.length !== maxProjectsPerQuery) {
          loop = false
        }
      }
    })

    return projects
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getContractProject(
  projectId: number,
  contractAddress: string
): Promise<ProjectDetailFragment> {
  const { data } = await client
    .query(GetContractProjectDocument, {
      first: maxProjectsPerQuery,
      projectId: projectId,
      contract: contractAddress,
    })
    .toPromise()

  if (!data || !data.contract?.projects || !data.contract?.projects[0]) {
    throw Error('No data returned from birthday Hasura query')
  }

  return data.contract?.projects[0]
}
