import * as dotenv from 'dotenv'
import { createClient } from 'urql/core'
import {
  ProjectDetailFragment,
  GetAllProjectsDocument,
  GetEngineContractsDocument,
  GetWalletTokensDocument,
  GetOpenProjectsDocument,
  GetProjectDocument,
  GetContractProjectsDocument,
  GetTokenOwnerDocument,
  GetProjectInvocationsDocument,
  GetProjectInContractsDocument,
} from './generated/graphql'

dotenv.config()
const fetch = require('node-fetch')

export const PUBLIC_HASURA_ENDPOINT = 'https://data.artblocks.io/v1/graphql'
const CORE_CONTRACTS: {
  [id: string]: string
} = require('../ProjectConfig/coreContracts.json')
const COLLAB_CONTRACTS: {
  [id: string]: string
} = require('../ProjectConfig/collaborationContracts.json')
const EXPLORATION_CONTRACTS: {
  [id: string]: string
} = require('../ProjectConfig/explorationsContracts.json')
const BLOCKED_ENGINE_CONTRACTS: {
  [id: string]: string
} = require('../ProjectConfig/blockedEngineContracts.json')

const client = createClient({
  url: PUBLIC_HASURA_ENDPOINT,
  fetch: fetch,
  requestPolicy: 'network-only',
})

const maxProjectsPerQuery = 1000

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

    return data.contracts_metadata.map(({ address }) => address)
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
      allTokens.push(...data.tokens_metadata)
      if (data.tokens_metadata.length !== maxTokensPerQuery) {
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

    let loop = true
    while (loop) {
      const { data } = await client
        .query(GetOpenProjectsDocument, {
          first: maxProjectsPerQuery,
          skip: projects.length,
          contracts: Object.values(CORE_CONTRACTS),
        })
        .toPromise()
      if (!data || !data.projects_metadata) {
        throw Error(
          'No data returned from getArtblocksOpenProjects subgraph query'
        )
      }

      data.projects_metadata.forEach((project: ProjectDetailFragment) => {
        projects.push(project)
      })
      if (data.projects_metadata?.length !== maxProjectsPerQuery) {
        loop = false
      }
    }

    return projects
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getArtBlocksXPaceProjects() {
  return await getContractsProjects([
    COLLAB_CONTRACTS.AB_X_PACE,
    COLLAB_CONTRACTS.AB_X_PACE_V3,
  ])
}

export async function getArtBlocksXBMProjects(): Promise<
  ProjectDetailFragment[]
> {
  return await getContractsProjects([COLLAB_CONTRACTS.AB_X_BM])
}

export async function getEngineProjects(): Promise<ProjectDetailFragment[]> {
  const contractsToGet = (await getEngineContracts()) ?? []
  return await getContractsProjects(contractsToGet)
}

export async function getContractProject(
  projectId: number,
  contractAddress: string
): Promise<ProjectDetailFragment> {
  const { data } = await client
    .query(GetProjectDocument, {
      id: `${contractAddress}-${projectId}`,
    })
    .toPromise()

  if (!data || !data.projects_metadata || !data.projects_metadata[0]) {
    throw Error('No data returned from getProject subgraph query')
  }

  return data.projects_metadata[0]
}

export async function getProjectInContracts(
  projectId: number,
  contracts: string[]
): Promise<ProjectDetailFragment> {
  const { data } = await client
    .query(GetProjectInContractsDocument, {
      contracts: contracts,
      projectId: projectId.toString(),
    })
    .toPromise()

  if (!data || !data.projects_metadata.length) {
    throw Error('No data returned from getProject subgraph query')
  }

  return data.projects_metadata[0]
}

export async function getArtBlocksProject(
  projectId: number
): Promise<ProjectDetailFragment> {
  const contractsToGet = Object.values(CORE_CONTRACTS)
  return await getProjectInContracts(projectId, contractsToGet)
}

export async function getProject(
  projectId: number,
  contractAddress?: string
): Promise<ProjectDetailFragment> {
  if (contractAddress) {
    return getContractProject(projectId, contractAddress)
  } else {
    return getArtBlocksProject(projectId)
  }
}

async function getContractProjects(
  contractAddress: string
): Promise<ProjectDetailFragment[]> {
  const maxTokensPerQuery = 1000

  const allProjects: ProjectDetailFragment[] = []
  let loop = true
  while (loop) {
    const { data } = await client
      .query(GetContractProjectsDocument, {
        contract: contractAddress,
        first: maxTokensPerQuery,
        skip: allProjects.length,
      })
      .toPromise()

    if (!data || !data.projects_metadata) {
      throw Error('No data returned from getContractProjects subgraph query')
    }

    allProjects.push(...data.projects_metadata)
    if (data.projects_metadata.length !== maxTokensPerQuery) {
      loop = false
    }
  }
  return allProjects
}

async function getContractsProjects(
  contractsToGet: string[]
): Promise<ProjectDetailFragment[]> {
  try {
    const allArrays = await Promise.all([
      ...contractsToGet.map(getContractProjects),
    ])
    return allArrays.flat()
  } catch (err) {
    throw new Error(err)
  }
}

export async function getTokenOwnerAddress(tokenId: string) {
  try {
    const { data, error } = await client
      .query(GetTokenOwnerDocument, {
        id: tokenId,
      })
      .toPromise()

    if (
      !data ||
      !data.tokens_metadata?.length ||
      !data.tokens_metadata[0]?.owner?.public_address
    ) {
      console.log(error)
      console.log(data, tokenId)
      throw Error('No data returned from get token owner subgraph query')
    }

    return data.tokens_metadata[0]?.owner?.public_address
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
    return data.projects_metadata.length > 0
      ? data.projects_metadata[0].invocations
      : null
  } catch (err) {
    console.error(err)
    return undefined
  }
}
