import * as dotenv from 'dotenv'
import { Client, createClient } from 'urql/core'
import {
  ProjectDetailFragment,
  GetAllProjectsDocument,
  GetEngineContractsDocument,
  GetWalletTokensDocument,
  GetOpenProjectsDocument,
  GetProjectDocument,
  GetContractProjectsDocument,
  GetProjectInvocationsDocument,
  GetProjectInContractsDocument,
  GetProjectFloorDocument,
  TokenDetailFragment,
  ProjectTokenDetailFragment,
  GetMostRecentMintedTokenByContractDocument,
  GetAllContractsDocument,
  ContractDetailFragment,
  GetMostRecentMintedFlagshipTokenDocument,
  GetTokenDocument,
} from './generated/graphql'
import { isArbitrumContract } from '../Classes/APIBots/utils'
import { ARBITRUM_CONTRACTS, ENGINE_CONTRACTS } from '..'

dotenv.config()
const fetch = require('node-fetch')

export const PUBLIC_HASURA_ENDPOINT = 'https://data.artblocks.io/v1/graphql'
export const PUBLIC_ARB_HASURA_ENDPOINT =
  'https://ab-prod-arbitrum.hasura.app/v1/graphql'
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
  fetchOptions: process.env.HASURA_GRAPHQL_ADMIN_SECRET
    ? () => ({
        headers: {
          'x-hasura-admin-secret':
            process.env.HASURA_GRAPHQL_ADMIN_SECRET ?? '',
        },
      })
    : undefined,
  requestPolicy: 'network-only',
})

const arbitrumClient = createClient({
  url: PUBLIC_ARB_HASURA_ENDPOINT,
  fetch: fetch,
  requestPolicy: 'network-only',
})

const getClientForContract = (contract: string) => {
  if (isArbitrumContract(contract)) {
    return arbitrumClient
  }
  return client
}

const maxProjectsPerQuery = 1000

export async function getAllProjectsForClient(
  hasuraClient: Client
): Promise<ProjectDetailFragment[]> {
  try {
    const allProjects: any[] = []
    let loop = true
    while (loop) {
      const { data } = await hasuraClient
        .query(GetAllProjectsDocument, {
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()
      if (!data) {
        throw Error('No data returned from getAllProjects Hasura query')
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

export async function getAllProjects(): Promise<ProjectDetailFragment[]> {
  try {
    const mainnet = await getAllProjectsForClient(client)
    const arb = await getAllProjectsForClient(arbitrumClient)
    return mainnet.concat(arb)
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getArbitrumContracts() {
  const nonPBABContracts: string[] = Object.values(CORE_CONTRACTS)
    .concat(Object.values(COLLAB_CONTRACTS))
    .concat(Object.values(EXPLORATION_CONTRACTS))
    .concat(Object.values(BLOCKED_ENGINE_CONTRACTS))
  try {
    const { data: arbData } = await arbitrumClient
      .query(GetEngineContractsDocument, {
        ids: nonPBABContracts,
      })
      .toPromise()

    if (!arbData) {
      throw Error('No data returned from getEngineContracts arbitrum query')
    }

    return arbData.contracts_metadata.map(({ address }) => address)
  } catch (err) {
    console.error(err)
    return undefined
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
      throw Error('No data returned from getEngineContracts Hasura query')
    }

    const arbContracts = await getArbitrumContracts()

    const allContracts = data.contracts_metadata
      .map(({ address }) => address)
      .concat(arbContracts ?? [])

    return allContracts
  } catch (err) {
    console.error(err)
    return undefined
  }
}

async function getAllWalletTokensClient(
  hasuraClient: Client,
  wallet: string,
  contracts: string[]
) {
  const maxTokensPerQuery = 1000
  try {
    const allTokens: TokenDetailFragment[] = []
    let loop = true
    while (loop) {
      const { data } = await hasuraClient
        .query(GetWalletTokensDocument, {
          wallet,
          contracts,
          first: maxTokensPerQuery,
          skip: allTokens.length,
        })
        .toPromise()
      if (!data) {
        throw Error('No data returned from getAllTokensInWallet Hasura query')
      }
      allTokens.push(...data.tokens_metadata)
      if (data.tokens_metadata.length !== maxTokensPerQuery) {
        loop = false
      }
    }
    return allTokens
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getAllTokensInWallet(walletAddress: string) {
  const engineContracts = ENGINE_CONTRACTS
  const arbContracts = ARBITRUM_CONTRACTS
  const addresses = Object.values(CORE_CONTRACTS)
    .concat(Object.values(COLLAB_CONTRACTS))
    .concat(Object.values(EXPLORATION_CONTRACTS))
    .concat(Object.values(engineContracts))
    .concat(Object.values(arbContracts))

  const mainnetTokens = await getAllWalletTokensClient(
    client,
    walletAddress,
    addresses
  )
  const arbTokens = await getAllWalletTokensClient(
    arbitrumClient,
    walletAddress,
    addresses
  )

  return mainnetTokens.concat(arbTokens)
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
          'No data returned from getArtblocksOpenProjects Hasura query'
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
  const hasuraClient = getClientForContract(contractAddress)
  const { data } = await hasuraClient
    .query(GetProjectDocument, {
      id: `${contractAddress}-${projectId}`,
    })
    .toPromise()

  if (!data || !data.projects_metadata || !data.projects_metadata[0]) {
    throw Error('No data returned from getProject Hasura query')
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
    throw Error('No data returned from getProject Hasura query')
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
  const hasuraClient = getClientForContract(contractAddress)
  const maxTokensPerQuery = 1000
  const allProjects: ProjectDetailFragment[] = []
  let loop = true
  while (loop) {
    const { data } = await hasuraClient
      .query(GetContractProjectsDocument, {
        contract: contractAddress,
        first: maxTokensPerQuery,
        skip: allProjects.length,
      })
      .toPromise()

    if (!data || !data.projects_metadata) {
      throw Error('No data returned from getContractProjects Hasura query')
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

export async function getProjectInvocations(projectId: string) {
  const hasuraClient = getClientForContract(projectId.split('-')[0])
  try {
    const { data } = await hasuraClient
      .query(GetProjectInvocationsDocument, {
        id: projectId,
      })
      .toPromise()

    if (!data) {
      throw Error('No data returned from getProjectInvocations Hasura query')
    }
    return data.projects_metadata.length > 0
      ? data.projects_metadata[0].invocations
      : null
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export async function getProjectFloor(projectId: string) {
  const hasuraClient = getClientForContract(projectId.split('-')[0])
  try {
    const { data } = await hasuraClient
      .query(GetProjectFloorDocument, {
        id: projectId,
      })
      .toPromise()

    if (!data) {
      throw Error('No data returned from getProjectFloor Hasura query')
    }
    return data.projects_metadata[0].tokens.find(
      (token) => !token.isFlaggedAsSuspicious
    )
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export async function getToken(tokenId: string): Promise<TokenDetailFragment> {
  const hasuraClient = getClientForContract(tokenId.split('-')[0])

  const { data, error } = await hasuraClient
    .query(GetTokenDocument, {
      token_id: tokenId,
    })
    .toPromise()

  if (error) {
    throw Error(error.message)
  }

  if (!data || !data.tokens_metadata?.length) {
    throw Error('No data returned from get token Hasura query')
  }

  return data.tokens_metadata[0]
}

export async function getMostRecentMintedTokenByContracts(
  contracts: string[]
): Promise<ProjectTokenDetailFragment> {
  const isArb = contracts.length > 0 && isArbitrumContract(contracts[0])
  const c = isArb ? arbitrumClient : client
  const { data } = await c
    .query(GetMostRecentMintedTokenByContractDocument, {
      contracts: contracts,
    })
    .toPromise()

  if (!data || !data.tokens_metadata.length) {
    throw Error(
      'No data returned from getMostRecentMintedTokenByContracts Hasura query'
    )
  }
  return data.tokens_metadata[0]
}

export async function getMostRecentMintedFlagshipToken(): Promise<ProjectTokenDetailFragment> {
  const { data } = await client
    .query(GetMostRecentMintedFlagshipTokenDocument, {})
    .toPromise()

  if (!data || !data.tokens_metadata.length) {
    throw Error(
      'No data returned from getMostRecentMintedFlagshipToken Hasura query'
    )
  }

  return data.tokens_metadata[0]
}

export async function getAllContracts(
  isArb: boolean
): Promise<ContractDetailFragment[]> {
  const c = isArb ? arbitrumClient : client
  const { data } = await c.query(GetAllContractsDocument, {}).toPromise()

  if (!data || !data.contracts_metadata.length) {
    throw Error('No data returned from getAllContracts Hasura query')
  }

  return data.contracts_metadata
}
