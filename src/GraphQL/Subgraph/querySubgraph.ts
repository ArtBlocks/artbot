import * as dotenv from 'dotenv'
dotenv.config()
import { createClient } from 'urql/core'
import {
  GetEngineContractsDocument,
  GetProjectInvocationsDocument,
} from './generated/graphql'
import {
  GetContractProjectDocument,
  ProjectDetailFragment,
  GetAllProjectsDocument,
  GetContractOpenProjectsDocument,
  GetWalletTokensDocument,
  GetTokenOwnerDocument,
} from './generated/graphql'

const fetch = require('node-fetch')

const HOSTED_API_URL =
  'https://api.thegraph.com/subgraphs/name/artblocks/art-blocks'

const DECENTRALIZED_API_URL = `https://gateway.thegraph.com/api/${process.env.GRAPH_API_KEY}/subgraphs/id/5So3nipgHT3ks7pEPDQ6YgSFhfEmADrh481P9z1ZtcMA`

let API_URL = HOSTED_API_URL
if (process.env.GRAPH_API_KEY && process.env.USE_DECENTRALIZED_API === 'true') {
  API_URL = DECENTRALIZED_API_URL
}

const maxProjectsPerQuery = 1000
const CORE_CONTRACTS: {
  [id: string]: string
} = require('../../ProjectConfig/coreContracts.json')
const COLLAB_CONTRACTS: {
  [id: string]: string
} = require('../../ProjectConfig/collaborationContracts.json')
const EXPLORATION_CONTRACTS: {
  [id: string]: string
} = require('../../ProjectConfig/explorationsContracts.json')
const BLOCKED_ENGINE_CONTRACTS: {
  [id: string]: string
} = require('../../ProjectConfig/blockedEngineContracts.json')

const client = createClient({
  url: API_URL,
  fetch: fetch,
  fetchOptions: () => ({
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  }),
  requestPolicy: 'network-only',
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
        throw Error('No data returned from getAllProjects subgraph query')
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

export async function getEngineContracts() {
  const nonPBABContracts: string[] = Object.values(CORE_CONTRACTS)
    .concat(Object.values(COLLAB_CONTRACTS))
    .concat(Object.values(EXPLORATION_CONTRACTS))
    .concat(Object.values(BLOCKED_ENGINE_CONTRACTS))
  try {
    const { data } = await client
      .query(GetEngineContractsDocument, {
        ids: nonPBABContracts,
      })
      .toPromise()

    if (!data) {
      throw Error('No data returned from getEngineContracts subgraph query')
    }

    return data.contracts.map(({ id }) => id)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export async function getAllTokensInWallet(walletAddress: string) {
  const engineContracts = await getEngineContracts()
  const maxTokensPerQuery = 1000
  try {
    const allTokens: any[] = []
    let loop = true
    while (loop) {
      const { data } = await client
        .query(GetWalletTokensDocument, {
          wallet: walletAddress,
          contracts: Object.values(CORE_CONTRACTS)
            .concat(Object.values(COLLAB_CONTRACTS))
            .concat(Object.values(EXPLORATION_CONTRACTS))
            .concat(Object.values(engineContracts ?? [])),
          first: maxTokensPerQuery,
          skip: allTokens.length,
        })
        .toPromise()
      if (!data) {
        throw Error('No data returned from getAllTokensInWallet subgraph query')
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
          throw Error(
            'No data returned from getArtblocksOpenProjects subgraph query'
          )
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
    console.log(projectId, contractAddress, data)
    throw Error('No data returned from getContractProject subgraph query')
  }

  return data.contract?.projects[0]
}

export async function getTokenOwnerAddress(tokenId: string) {
  try {
    const { data, error } = await client
      .query(GetTokenOwnerDocument, {
        id: tokenId,
      })
      .toPromise()

    if (!data || !data.tokens?.length || !data.tokens[0]?.owner?.id) {
      console.log(error)
      console.log(data, tokenId)
      throw Error('No data returned from get token owner subgraph query')
    }

    return data.tokens[0]?.owner?.id
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export async function getProjectInvocations(projectId: string) {
  try {
    const { data } = await client
      .query(GetProjectInvocationsDocument, {
        id: projectId,
      })
      .toPromise()

    if (!data) {
      throw Error('No data returned from getProjectInvocations subgraph query')
    }
    return data.projects.length > 0 ? data.projects[0].invocations : null
  } catch (err) {
    console.error(err)
    return undefined
  }
}
