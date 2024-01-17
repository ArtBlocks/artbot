import * as dotenv from 'dotenv'

import {
  ARBITRUM_CONTRACTS,
  COLLAB_CONTRACTS,
  ENGINE_CONTRACTS,
} from '../../index'
import { CollectionType } from '../MintBot'
import { AxiosError } from 'axios'
dotenv.config()

const axios = require('axios')
const ethers = require('ethers')

const provider = new ethers.providers.EtherscanProvider(
  'homestead',
  process.env.ETHERSCAN_API_KEY
)

const STAGING_CONTRACTS = require('../../ProjectConfig/stagingContracts.json')
const EXPLORATIONS_CONTRACTS = require('../../ProjectConfig/explorationsContracts.json')

const CORE_CONTRACTS = require('../../ProjectConfig/coreContracts.json')
// Runtime ENS cache just to limit queries
const ensAddressMap: { [id: string]: string } = {}
const ensResolvedMap: { [id: string]: string } = {}
const osAddressMap: { [id: string]: string } = {}
const MAX_ENS_RETRIES = 3

// UTM for links so we can track traffic that comes through Artbot
const ARTBOT_UTM = 'utm_medium=artbot'
const DISCORD_UTM = `?utm_medium=discord&${ARTBOT_UTM}`
const TWITTER_UTM = `?utm_medium=twitter&${ARTBOT_UTM}`
export const LISTING_UTM = `${DISCORD_UTM}&utm_campaign=listing`
export const SALE_UTM = `${DISCORD_UTM}&utm_campaign=sale`
export const MINT_UTM = `${DISCORD_UTM}&utm_campaign=mint`
export const PROJECTBOT_UTM = `${DISCORD_UTM}&utm_campaign=projectbot`
export const PROJECTBOT_BUY_UTM = `${DISCORD_UTM}&utm_campaign=projectbot_buy`
export const TWITTER_PROJECTBOT_UTM = `${TWITTER_UTM}&utm_campaign=projectbot`

async function getENSName(address: string): Promise<string> {
  let name = ''
  if (ensAddressMap[address]) {
    name = ensAddressMap[address]
  } else {
    let ens = ''
    let retries = 0
    while (ens === '' && retries < MAX_ENS_RETRIES) {
      try {
        ens = await provider.lookupAddress(address)
      } catch (err) {
        retries++
        console.warn(`ENS lookup error on ${address}`, err)
      }
    }

    name = ens ?? ''
    ensAddressMap[address] = name
    ensResolvedMap[name] = address
  }
  return name
}

export async function resolveEnsName(ensName: string): Promise<string> {
  let wallet = ''
  if (ensResolvedMap[ensName]) {
    wallet = ensResolvedMap[ensName]
  } else {
    let retries = 0

    while (wallet === '' && retries < MAX_ENS_RETRIES) {
      try {
        wallet = await provider.resolveName(ensName)
      } catch (err) {
        retries++
        console.warn(`ENS resolve error on ${ensName}`, err)
      }
    }

    if (wallet !== '') {
      ensResolvedMap[ensName] = wallet
    }
  }
  return wallet
}

export async function ensOrAddress(address: string): Promise<string> {
  const ens = await getENSName(address)
  return ens !== '' ? ens : address
}

export async function getOSName(address: string): Promise<string> {
  let name = ''
  if (osAddressMap[address]) {
    console.log('Cached!')
    name = osAddressMap[address]
  } else {
    try {
      const response = await axios.get(
        `https://api.opensea.io/api/v2/accounts/${address}`,
        {
          headers: {
            Accept: 'application/json',
            'X-API-KEY': process.env.OPENSEA_API_KEY,
          },
        }
      )
      const responseBody = response?.data
      if (responseBody?.detail) {
        throw new Error(responseBody.detail)
      }
      name = responseBody?.username ?? ''
      osAddressMap[address] = name
    } catch (err) {
      // Probably rate limited - return empty sting but don't cache
      name = ''
      console.log(err)
      console.log("Error getting user's OpenSea name")
    }
  }

  return name
}

export function isWallet(msg: string): boolean {
  return !!msg.match(/(0x[a-fA-F0-9]{40})|([a-zA-Z0-9.-]+\.eth)/g)
}

const acceptedVerticals = [
  'curated',
  'collabs',
  'collaborations',
  'explorations',
  'engine',
  'presents',
]
export function isVerticalName(msg: string): boolean {
  return acceptedVerticals.includes(msg)
}
export function getVerticalName(msg: string): string {
  switch (msg) {
    case 'collabs':
      return 'collaborations'
    default:
      return msg
  }
}

export function getTokenApiUrl(
  contractAddress: string,
  tokenId: string
): string {
  contractAddress = contractAddress.toLowerCase()
  if (
    Object.values(CORE_CONTRACTS).includes(contractAddress) ||
    contractAddress === ''
  ) {
    return `https://token.artblocks.io/${tokenId}`
  } else if (Object.values(STAGING_CONTRACTS).includes(contractAddress)) {
    return `https://token.staging.artblocks.io/${contractAddress}/${tokenId}`
  } else if (isArbitrumContract(contractAddress)) {
    return `https://token.arbitrum.artblocks.io/${contractAddress}/${tokenId}`
  } else {
    return `https://token.artblocks.io/${contractAddress}/${tokenId}`
  }
}

export function isExplorationsContract(contractAddress: string): boolean {
  return Object.values(EXPLORATIONS_CONTRACTS).includes(
    contractAddress.toLowerCase()
  )
}

export function isEngineContract(contractAddress: string): boolean {
  return ENGINE_CONTRACTS.includes(contractAddress.toLowerCase())
}

export function isArbitrumContract(contractAddress: string): boolean {
  return ARBITRUM_CONTRACTS.includes(contractAddress.toLowerCase())
}

export function isCoreContract(contractAddress: string): boolean {
  return Object.values(CORE_CONTRACTS).includes(contractAddress.toLowerCase())
}

export async function getCollectionType(
  contractAddress: string
): Promise<CollectionType> {
  if (isExplorationsContract(contractAddress)) {
    return CollectionType.EXPLORATIONS
  } else if (
    Object.values(CORE_CONTRACTS).includes(contractAddress.toLowerCase())
  ) {
    return CollectionType.CORE
  } else if (
    Object.values(COLLAB_CONTRACTS).includes(contractAddress.toLowerCase())
  ) {
    return CollectionType.COLLAB
  } else if (isEngineContract(contractAddress)) {
    return CollectionType.ENGINE
  }

  throw new Error('Unknown collection type')
}

export function getTokenUrl(
  external_url: string,
  contractAddr: string,
  tokenId: string
): string {
  if (external_url && !external_url.includes('generator.artblocks.io')) {
    return external_url
  }
  return buildArtBlocksTokenURL(contractAddr, tokenId)
}

export function getProjectUrl(contractAddr: string, projectId: string): string {
  return `https://www.artblocks.io/project/${contractAddr}-${projectId}`
}

function buildArtBlocksTokenURL(contractAddr: string, tokenId: string): string {
  return `https://www.artblocks.io/token/${contractAddr}-${tokenId}`
}

export function buildOpenseaURL(contractAddr: string, tokenId: string): string {
  return `https://opensea.io/assets/ethereum/${contractAddr}/${tokenId}`
}
export function buildLooksRareURL(
  contractAddr: string,
  tokenId: string
): string {
  return `https://looksrare.org/collections/${contractAddr}/${tokenId}`
}
export function buildX2Y2URL(contractAddr: string, tokenId: string): string {
  return `https://x2y2.io/eth/${contractAddr}/${tokenId}`
}

export function timeout(
  timeoutMs: number,
  failureMessage: string
): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(failureMessage), timeoutMs)
  })
}

// defaulting our discord embeds to always send GIFs
export async function replaceVideoWithGIF(url: string) {
  if (url.includes('mp4')) {
    const gifURL = url.replace('mp4', 'gif')

    // some GIFs are not available, so we fallback to PNG

    try {
      await axios.get(gifURL)
    } catch (e) {
      const axiosError = e as AxiosError
      if (axiosError && e.response?.status === 404) {
        console.log('GIF not found, returning PNG')
      }
      console.log(`Error on fetching token API for ${gifURL}`, e)
      return url.replace('mp4', 'png')
    }

    return gifURL
  }

  return url
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
export const waitForEngineContracts = async (): Promise<string[]> => {
  while (ENGINE_CONTRACTS.length === 0) {
    console.log('Waiting for engine contracts to load...')
    await delay(5000)
  }
  console.log('Engine contracts loaded')
  return ENGINE_CONTRACTS
}

export const ethFromWeiString = (wei: string): string => {
  return `${parseInt(wei) / 1e18}`
}
