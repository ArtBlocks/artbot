import * as dotenv from 'dotenv'
import { COLLAB_CONTRACTS, ENGINE_CONTRACTS } from '../../index'
import { CollectionType } from '../MintBot'
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
const ARTBOT_UTM = '?utm_source=artbot&utm_medium=discord'
export const LISTING_UTM = ARTBOT_UTM + '&utm_campaign=listing'
export const SALE_UTM = ARTBOT_UTM + '&utm_campaign=sale'
export const MINT_UTM = ARTBOT_UTM + '&utm_campaign=mint'
export const PROJECTBOT_UTM = ARTBOT_UTM + '&utm_campaign=projectbot'

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

async function resolveEnsName(ensName: string): Promise<string> {
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

async function getOSName(address: string): Promise<string> {
  let name = ''
  if (osAddressMap[address]) {
    console.log('Cached!')
    name = osAddressMap[address]
  } else {
    try {
      const response = await axios.get(
        `https://api.opensea.io/user/${address}`,
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
    }
  }

  return name
}

function isWallet(msg: string): boolean {
  return msg.startsWith('0x') || msg.endsWith('eth')
}

function isVerticalName(msg: string): boolean {
  return (
    msg === 'curated' ||
    msg === 'presents' ||
    msg === 'collaborations' ||
    msg === 'collabs' ||
    msg === 'heritage' ||
    msg === 'factory' ||
    msg === 'playground' ||
    msg === 'explorations' ||
    msg === 'engine' ||
    msg.startsWith('curatedseries')
  )
}
function getVerticalName(msg: string): string {
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
  } else {
    return `https://token.artblocks.io/${contractAddress}/${tokenId}`
  }
}

export function isExplorationsContract(contractAddress: string): boolean {
  return Object.values(EXPLORATIONS_CONTRACTS).includes(
    contractAddress.toLowerCase()
  )
}

export async function isEngineContract(
  contractAddress: string
): Promise<boolean> {
  return (await ENGINE_CONTRACTS).includes(contractAddress.toLowerCase())
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
  } else if (await isEngineContract(contractAddress)) {
    return CollectionType.ENGINE
  }

  throw new Error('Unknown collection type')
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
export function replaceVideoWithGIF(videoURL: string) {
  if (videoURL.includes('mp4')) {
    videoURL.replace('mp4', 'gif')
  }
}

module.exports.ensOrAddress = ensOrAddress
module.exports.getOSName = getOSName
module.exports.resolveEnsName = resolveEnsName
module.exports.isWallet = isWallet
module.exports.isVerticalName = isVerticalName
module.exports.getVerticalName = getVerticalName
