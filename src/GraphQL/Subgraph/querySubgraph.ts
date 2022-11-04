import * as dotenv from 'dotenv'
dotenv.config()
const fetch = require('node-fetch')
const { createClient } = require('@urql/core')

const API_URL = 'https://api.thegraph.com/subgraphs/name/artblocks/art-blocks'

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
})

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
  const engineContracts = await _getPBABContracts()
  return await getContractsProjects(
    Object.values(CORE_CONTRACTS)
      .concat(Object.values(COLLAB_CONTRACTS))
      .concat(Object.values(EXPLORATION_CONTRACTS))
      .concat(Object.values(engineContracts))
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
 * gets all PBAB Contracts from Hasura
 *
 */
async function _getPBABContracts() {
  const nonPBABContracts = Object.values(CORE_CONTRACTS).concat(
    Object.values(COLLAB_CONTRACTS)
  )
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
  const contractsToGet = await _getPBABContracts()
  return getContractsProjects(contractsToGet)
}

async function getAllWalletTokens(walletAddress) {
  const maxTokensPerQuery = 1000
  try {
    const allTokens = []
    while (true) {
      const result = await client
        .query(getWalletTokens, {
          wallet: walletAddress,
          contracts: Object.values(CORE_CONTRACTS),
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
<<<<<<< HEAD:src/GraphQL/Subgraph/querySubgraph.ts
=======

module.exports.getArtBlocksProject = getArtBlocksProject
module.exports.getAllProjects = getAllProjects
module.exports.getArtBlocksFactoryProjects = getArtBlocksFactoryProjects
module.exports.getArtBlocksProjects = getArtBlocksProjects
module.exports.getArtBlocksOpenProjects = getArtBlocksOpenProjects
module.exports.getPBABProjects = getPBABProjects
module.exports.getArtBlocksXPaceProjects = getArtBlocksXPaceProjects
module.exports.getArtBlocksProjectCount = getArtBlocksProjectCount
module.exports.getContractProject = getContractProject
module.exports.getProjectsBirthdays = getProjectsBirthdays
module.exports.getProjectsCurationStatus = getProjectsCurationStatus
module.exports.getAllWalletTokens = getAllWalletTokens
>>>>>>> ad3aad1cc32dbcf87d7cd36446c60c8f1cce7e67:src/Utils/parseArtBlocksAPI.js
