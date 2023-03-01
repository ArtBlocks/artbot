/* eslint-disable no-constant-condition */
require('dotenv').config()
const fetch = require('node-fetch')
const { createClient, gql } = require('@urql/core')

const HOSTED_API_URL =
  'https://api.thegraph.com/subgraphs/name/artblocks/art-blocks'

const DECENTRALIZED_API_URL = `https://gateway.thegraph.com/api/${process.env.GRAPH_API_KEY}/subgraphs/id/5So3nipgHT3ks7pEPDQ6YgSFhfEmADrh481P9z1ZtcMA`

let API_URL = HOSTED_API_URL
if (process.env.GRAPH_API_KEY && process.env.USE_DECENTRALIZED_API === 'true') {
  API_URL = DECENTRALIZED_API_URL
}

// core contract addresses to include during initilization
const CORE_CONTRACTS = require('../ProjectConfig/coreContracts.json')
const COLLAB_CONTRACTS = require('../ProjectConfig/collaborationContracts.json')
const EXPLORATION_CONTRACTS = require('../ProjectConfig/explorationsContracts.json')

const client = createClient({
  url: API_URL,
  fetch: fetch,
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  requestPolicy: 'network-only',
})

const projectsStartTimes = gql`
  query getProjectStartTimes($first: Int!, $skip: Int) {
    projects_metadata(limit: $first, offset: $skip) {
      id
      start_datetime
    }
  }
`

const getAllProjectsCurationStatus = gql`
  query getAllProjectsCurationStatus($first: Int!, $skip: Int) {
    projects_metadata(limit: $first, offset: $skip) {
      id
      vertical_name
      heritage_curation_status
      vertical {
        category_name
      }
    }
  }
`

const projectInvocations = gql`
  query getProjectInvocations($id: ID!) {
    projects(where: { id: $id }) {
      invocations
    }
  }
`

const contractProjectsMinimal = gql`
  query getContractProjectsMinimal($id: ID!, $first: Int!, $skip: Int) {
    contract(id: $id) {
      projects(first: $first, skip: $skip, orderBy: projectId) {
        projectId
      }
    }
  }
`

const contractProjects = gql`
  query getContractProjects($id: ID!, $first: Int!, $skip: Int) {
    contract(id: $id) {
      projects(first: $first, skip: $skip, orderBy: projectId) {
        id
        projectId
        name
        invocations
        maxInvocations
        curationStatus
        active
        artistName
        contract {
          id
        }
      }
    }
  }
`

const contractOpenProjects = gql`
  query getContractOpenProjects($id: ID!, $first: Int!, $skip: Int) {
    contract(id: $id) {
      projects(
        first: $first
        skip: $skip
        orderBy: projectId
        where: { paused: false, active: true, complete: false }
      ) {
        projectId
        name
        invocations
        maxInvocations
        curationStatus
        active
        contract {
          id
        }
      }
    }
  }
`

const contractProject = gql`
  query getContractProject($id: ID!, $projectId: Int!) {
    contract(id: $id) {
      projects(where: { projectId: $projectId }) {
        id
        name
        invocations
        maxInvocations
        active
        curationStatus
        artistName
        contract {
          id
        }
      }
    }
  }
`

const contractProjectsWithCurationStatus = gql`
  query getContractProjectsWithCurationStatus(
    $id: ID!
    $first: Int!
    $skip: Int
    $curationStatus: String
  ) {
    contract(id: $id) {
      projects(
        where: { curationStatus: $curationStatus, active: true }
        first: $first
        skip: $skip
        orderBy: projectId
      ) {
        projectId
        name
        invocations
        maxInvocations
        active
        curationStatus
        contract {
          id
        }
      }
    }
  }
`

const getPBABContracts = gql`
  query getPBABContracts($ids: [ID]!) {
    contracts(where: { id_not_in: $ids }) {
      id
    }
  }
`

const getWalletTokens = gql`
  query getWalletTokens(
    $wallet: String!
    $contracts: [ID!]!
    $first: Int!
    $skip: Int
  ) {
    tokens(
      first: $first
      skip: $skip
      where: { owner: $wallet, contract_in: $contracts }
    ) {
      invocation
      project {
        name
      }
    }
  }
`

/*
 * helper function to get project count of a single
 * art blocks contract (uses pagination)
 */
async function _getContractProjectCount(contractId) {
  // max returned projects in a single query
  const maxProjectsPerQuery = 1000
  try {
    let totalProjects = 0
    while (true) {
      const result = await client
        .query(contractProjectsMinimal, {
          id: contractId,
          first: maxProjectsPerQuery,
          skip: totalProjects,
        })
        .toPromise()
      const numResults = result.data.contract.projects.length
      totalProjects += numResults
      if (numResults !== maxProjectsPerQuery) {
        break
      }
    }
    return totalProjects
  } catch (err) {
    console.error(err)
    return undefined
  }
}

/*
 * get count of all artblocks projects
 */
async function getArtBlocksProjectCount() {
  try {
    const contractsToGet = Object.values(CORE_CONTRACTS)
    const promises = contractsToGet.map(_getContractProjectCount)
    const numProjects = await Promise.all(promises)
    return numProjects.reduce((sum, _projects) => sum + _projects)
  } catch (err) {
    console.error(err)
  }
  return undefined
}

/*
 * helper function to get project by project number on
 * an art blocks contract.
 * Returns null if project doesn't exist on this contract.
 * Returns undefined if error is encountered.
 */
async function _getContractProject(projectId, contractId) {
  try {
    const result = await client
      .query(contractProject, {
        id: contractId,
        projectId: projectId,
      })
      .toPromise()
    return result.data.contract.projects.length > 0
      ? result.data.contract.projects[0]
      : null
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export async function getProjectInvocations(id) {
  try {
    const result = await client
      .query(projectInvocations, {
        id: id,
      })
      .toPromise()
    return result.data.projects.length > 0
      ? result.data.projects[0].invocations
      : null
  } catch (err) {
    console.error(err)
    return undefined
  }
}

/*
 * This function takes a projectId and contractId and returns a corresponding
 * project. If the contractId is null it will default to the Art Blocks
 * contracts otherwise it will use the passed contractId when contacting the
 * subgraph.
 */
async function getContractProject(projectId, contractId) {
  return !contractId
    ? getArtBlocksProject(projectId)
    : _getContractProject(projectId, contractId)
}

/**
 * get data for a flagship artblocks project
 * Returns undefined if no project found (errors or DNE).
 * If project found, returns object with:
 *   - curationStatus
 *   - invocations
 *   - maxInvocations
 *   - active
 *   - name
 *   - projectId
 *   - contract
 *     - id: string Contract Address
 * @param {*} projectNumber
 */
async function getArtBlocksProject(projectNumber) {
  try {
    const contractsToGet = Object.values(CORE_CONTRACTS)
    const promises = contractsToGet.map(
      _getContractProject.bind(null, projectNumber)
    )
    const project = await Promise.all(promises)
    // return the element that is not null and not undefined
    return project.find((el) => el !== null && el !== undefined)
  } catch (err) {
    console.error(err)
  }
  return undefined
}

/**
 * helper function to get factory projects of a single
 * art blocks contract (uses pagination)
 * @param {*} contractId
 */
async function _getContractFactoryProjects(contractId) {
  // max returned projects in a single query
  const maxProjectsPerQuery = 1000
  try {
    const factoryProjects = []
    while (true) {
      const result = await client
        .query(contractProjectsWithCurationStatus, {
          id: contractId,
          first: maxProjectsPerQuery,
          skip: factoryProjects.length,
          curationStatus: 'factory',
        })
        .toPromise()
      factoryProjects.push(...result.data.contract.projects)
      if (result.data.contract.projects.length !== maxProjectsPerQuery) {
        break
      }
    }
    return factoryProjects
  } catch (err) {
    console.error(err)
    return undefined
  }
}

/**
 * helper function to gets all projects of a single
 * art blocks contract (uses pagination)
 * @param {*} contractId
 */
async function _getContractProjects(contractId) {
  // max returned projects in a single query
  const maxProjectsPerQuery = 1000
  try {
    const allProjects = []
    while (true) {
      const result = await client
        .query(contractProjects, {
          id: contractId,
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()
      allProjects.push(...result.data.contract.projects)
      if (result.data.contract.projects.length !== maxProjectsPerQuery) {
        break
      }
    }
    return allProjects
  } catch (err) {
    console.error(err)
    return undefined
  }
}

async function _getContractOpenProjects(contractId) {
  // max returned projects in a single query
  const maxProjectsPerQuery = 1000
  try {
    const allProjects = []
    while (true) {
      const result = await client
        .query(contractOpenProjects, {
          id: contractId,
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()
      allProjects.push(...result.data.contract.projects)
      if (result.data.contract.projects.length !== maxProjectsPerQuery) {
        break
      }
    }
    return allProjects
  } catch (err) {
    console.error(err)
    return undefined
  }
}

/*
 * the AB subgraph curation status is null for recent projects and is slow to update
 * workaround by querying AB api for curation status
 */
const AB_TOKEN_API_URL = 'https://token.artblocks.io/'
const curationStatusCache = {}
async function _getContractNullFactoryProjects(contractId) {
  // max returned projects in a single query
  const maxProjectsPerQuery = 1000
  try {
    const nullProjects = []
    while (true) {
      const result = await client
        .query(contractProjectsWithCurationStatus, {
          id: contractId,
          first: maxProjectsPerQuery,
          skip: nullProjects.length,
          curationStatus: null,
        })
        .toPromise()
      nullProjects.push(...result.data.contract.projects)
      if (result.data.contract.projects.length !== maxProjectsPerQuery) {
        break
      }
    }
    const curationStatus = await Promise.all(
      nullProjects.map(async (nullProject) => {
        if (nullProject.projectId in curationStatusCache) {
          return curationStatusCache[nullProject.projectId]
        }

        const tokenResponse = await fetch(
          AB_TOKEN_API_URL + nullProject.projectId * 1e6
        )
        const token = await tokenResponse.json()

        curationStatusCache[nullProject.projectId] = token.curation_status
        return token.curation_status
      })
    )
    const nullFactoryProjects = nullProjects.filter(
      (_, i) => curationStatus[i] === 'factory'
    )
    return nullFactoryProjects
  } catch (err) {
    console.error(err)
    return undefined
  }
}

/**
 * get data for all flagship artblocks factory projects
 * Returns undefined if errors encountered while fetching.
 * If project found, returns array of project objects with:
 *   - invocations
 *   - maxInvocations
 *   - active
 *   - name
 *   - projectId
 *   - contract
 *     - id: string Contract Address
 */
async function getArtBlocksFactoryProjects() {
  try {
    const contractsToGet = Object.values(CORE_CONTRACTS)
    const allArrays = await Promise.all([
      ...contractsToGet.map(_getContractFactoryProjects),
      ...contractsToGet.map(_getContractNullFactoryProjects),
    ])
    return allArrays.flat()
  } catch (err) {
    console.error(err)
  }
  return undefined
}

/**
 * get data for all projects in specified contracts
 * Returns undefined if errors encountered while fetching.
 * If project found, returns array of project objects with:
 *   - invocations
 *   - maxInvocations
 *   - active
 *   - name
 *   - projectId
 *   - contract
 *     - id: string Contract Address
 */
async function getContractsProjects(contractsToGet) {
  try {
    const allArrays = await Promise.all([
      ...contractsToGet.map(_getContractProjects),
    ])
    return allArrays.flat()
  } catch (err) {
    console.error(err)
  }
  return undefined
}

async function getContractsOpenProjects(contractsToGet) {
  try {
    const allArrays = await Promise.all([
      ...contractsToGet.map(_getContractOpenProjects),
    ])
    return allArrays.flat()
  } catch (err) {
    console.error(err)
  }
  return undefined
}

/**
 * get data for all artblocks projects
 * Returns undefined if errors encountered while fetching.
 * If project found, returns array of project objects with:
 *   - invocations
 *   - maxInvocations
 *   - active
 *   - name
 *   - projectId
 *   - contract
 *     - id: string Contract Address
 */
async function getArtBlocksProjects() {
  return await getContractsProjects(Object.values(CORE_CONTRACTS))
}

async function getArtBlocksOpenProjects() {
  return await getContractsOpenProjects(Object.values(CORE_CONTRACTS))
}

async function getAllProjects() {
  const engineContracts = await getEngineContracts()
  return await getContractsProjects(
    Object.values(CORE_CONTRACTS)
      .concat(Object.values(COLLAB_CONTRACTS))
      .concat(Object.values(EXPLORATION_CONTRACTS))
      .concat(Object.values(engineContracts))
  )
}
async function getArtBlocksAndCollabProjects() {
  return await getContractsProjects(
    Object.values(CORE_CONTRACTS)
      .concat(Object.values(COLLAB_CONTRACTS))
      .concat(Object.values(EXPLORATION_CONTRACTS))
  )
}

/**
 * get data for all AB x Pace projects
 * Returns undefined if errors encountered while fetching.
 * If project found, returns array of project objects with:
 *   - invocations
 *   - maxInvocations
 *   - active
 *   - name
 *   - projectId
 *   - contract
 *     - id: string Contract Address
 */
async function getArtBlocksXPaceProjects() {
  return await getContractsProjects([COLLAB_CONTRACTS.AB_X_PACE])
}

/**
 * get data for all AB x BM projects
 * Returns undefined if errors encountered while fetching.
 * If project found, returns array of project objects with:
 *   - invocations
 *   - maxInvocations
 *   - active
 *   - name
 *   - projectId
 *   - contract
 *     - id: string Contract Address
 */
async function getArtBlocksXBMProjects() {
  return await getContractsProjects([COLLAB_CONTRACTS.AB_X_BM])
}

/**
 * gets all PBAB Contracts from Hasura
 *
 */
export async function getEngineContracts() {
  const nonPBABContracts = Object.values(CORE_CONTRACTS)
    .concat(Object.values(COLLAB_CONTRACTS))
    .concat(Object.values(EXPLORATION_CONTRACTS))
  try {
    const result = await client
      .query(getPBABContracts, {
        ids: nonPBABContracts,
      })
      .toPromise()
    return result.data.contracts.map(({ id }) => id)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

/**
 * Queries Hasura to get start_datetime of all projects
 * @returns Map of "contractAddr-projectId"->start_datetime
 * Returns empty dict on error (namely, if Hasura not configured)
 */
async function getProjectsBirthdays() {
  const maxProjectsPerQuery = 1000
  try {
    const hasuraClient = createClient({
      url: process.env.HASURA_GRAPHQL_ENDPOINT,
      fetch: fetch,
      fetchOptions: () => ({
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      }),
    })
    const allProjects = []
    while (true) {
      const result = await hasuraClient
        .query(projectsStartTimes, {
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()

      allProjects.push(...result.data.projects_metadata)
      if (result.data.projects_metadata.length !== maxProjectsPerQuery) {
        break
      }
    }
    const bdayMapping = {}
    allProjects.forEach((proj) => {
      bdayMapping[proj.id] = proj.start_datetime
    })
    return bdayMapping
  } catch (err) {
    console.error(err)
    return {}
  }
}

async function getProjectsCurationStatus() {
  const maxProjectsPerQuery = 1000
  try {
    const hasuraClient = createClient({
      url: process.env.HASURA_GRAPHQL_ENDPOINT,
      fetch: fetch,
      fetchOptions: () => ({
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      }),
    })
    const allProjects = []
    while (true) {
      const result = await hasuraClient
        .query(getAllProjectsCurationStatus, {
          first: maxProjectsPerQuery,
          skip: allProjects.length,
        })
        .toPromise()

      allProjects.push(...result.data.projects_metadata)
      if (result.data.projects_metadata.length !== maxProjectsPerQuery) {
        break
      }
    }
    const collectionMapping = {}
    const heritageStatuses = {}
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

/**
 * get data for all PBAB Projects
 * Returns undefined if errors encountered while fetching.
 * If project found, returns array of project objects with:
 *   - invocations
 *   - maxInvocations
 *   - active
 *   - name
 *   - projectId
 *   - contract
 *     - id: string Contract Address
 */
async function getPBABProjects() {
  const contractsToGet = await getEngineContracts()
  return getContractsProjects(contractsToGet)
}

async function getAllWalletTokens(walletAddress) {
  const engineContracts = await getEngineContracts()
  const maxTokensPerQuery = 1000
  try {
    const allTokens = []
    while (true) {
      const result = await client
        .query(getWalletTokens, {
          wallet: walletAddress,
          contracts: Object.values(CORE_CONTRACTS)
            .concat(Object.values(COLLAB_CONTRACTS))
            .concat(Object.values(EXPLORATION_CONTRACTS))
            .concat(Object.values(engineContracts)),
          first: maxTokensPerQuery,
          skip: allTokens.length,
        })
        .toPromise()

      allTokens.push(...result.data.tokens)
      if (result.data.tokens.length !== maxTokensPerQuery) {
        break
      }
    }
    return allTokens
  } catch (err) {
    console.error(err)
    return undefined
  }
}

module.exports.getArtBlocksProject = getArtBlocksProject
module.exports.getAllProjects = getAllProjects
module.exports.getArtBlocksAndCollabProjects = getArtBlocksAndCollabProjects
module.exports.getArtBlocksFactoryProjects = getArtBlocksFactoryProjects
module.exports.getArtBlocksProjects = getArtBlocksProjects
module.exports.getArtBlocksOpenProjects = getArtBlocksOpenProjects
module.exports.getPBABProjects = getPBABProjects
module.exports.getArtBlocksXPaceProjects = getArtBlocksXPaceProjects
module.exports.getArtBlocksXBMProjects = getArtBlocksXBMProjects
module.exports.getArtBlocksProjectCount = getArtBlocksProjectCount
module.exports.getContractProject = getContractProject
module.exports.getProjectsBirthdays = getProjectsBirthdays
module.exports.getProjectsCurationStatus = getProjectsCurationStatus
module.exports.getAllWalletTokens = getAllWalletTokens
