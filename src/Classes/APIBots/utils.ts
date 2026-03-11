import * as dotenv from 'dotenv'

import {
  COLLAB_CONTRACTS,
  ENGINE_CONTRACTS,
  STUDIO_CONTRACTS,
} from '../../index'
import { CollectionType } from '../MintBot'
import { AxiosError } from 'axios'
import { createPublicClient, http, fallback } from 'viem'
import { mainnet } from 'viem/chains'
dotenv.config()

import axios from 'axios'
import { logger } from '../../logger'

// Configure viem with multiple RPC providers for reliability
const publicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http('https://cloudflare-eth.com'),
    http('https://rpc.ankr.com/eth'),
    http('https://ethereum-rpc.publicnode.com'),
    http('https://1rpc.io/eth'),
    http('https://eth.llamarpc.com'),
    // Default public RPC as last resort
    http(),
  ]),
})

const EXPLORATIONS_CONTRACTS = require('../../ProjectConfig/explorationsContracts.json')

const CORE_CONTRACTS = require('../../ProjectConfig/coreContracts.json')

// ENS cache: stores resolved names ('' means no ENS name exists)
const ensAddressMap: { [id: string]: string } = {}
const ensResolvedMap: { [id: string]: string } = {}
// Tracks when a failed ENS lookup was cached so we can retry after TTL
const ensFailureTimestamps: { [id: string]: number } = {}
const ENS_FAILURE_TTL_MS = 5 * 60 * 1000 // 5 minutes

const osAddressMap: { [id: string]: { name: string; cachedAt: number } } = {}
const OS_CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
const MAX_OS_CACHE_SIZE = 1000
const MAX_ENS_CACHE_SIZE = 5000
const MAX_ENS_RETRIES = 3

// UTM for links so we can track traffic that comes through Artbot
const ARTBOT_UTM = 'utm_medium=artbot'
const DISCORD_UTM = `?utm_source=discord&${ARTBOT_UTM}`
const TWITTER_UTM = `?utm_source=twitter&${ARTBOT_UTM}`
export const LISTING_UTM = `${DISCORD_UTM}&utm_campaign=listing`
export const SALE_UTM = `${DISCORD_UTM}&utm_campaign=sale`
export const MINT_UTM = `${DISCORD_UTM}&utm_campaign=mint`
export const PROJECTBOT_UTM = `${DISCORD_UTM}&utm_campaign=projectbot`
export const PROJECTBOT_BUY_UTM = `${DISCORD_UTM}&utm_campaign=projectbot_buy`
export const PROJECTBOT_EXPLORE_UTM = `${DISCORD_UTM}&utm_campaign=projectbot_explore`
export const TWITTER_PROJECTBOT_UTM = `${TWITTER_UTM}&utm_campaign=projectbot`

async function getENSName(address: string): Promise<string> {
  // Check cache — but if it was a failed lookup, respect the TTL
  if (address in ensAddressMap) {
    const cachedValue = ensAddressMap[address]
    if (cachedValue !== '') {
      // Successful lookup — always use cache
      return cachedValue
    }
    // Failed lookup — check if TTL has expired
    const failedAt = ensFailureTimestamps[address]
    if (failedAt && Date.now() - failedAt < ENS_FAILURE_TTL_MS) {
      return ''
    }
    // TTL expired, fall through to retry
  }

  let retries = 0
  while (retries < MAX_ENS_RETRIES) {
    try {
      const ens = await publicClient.getEnsName({
        address: address as `0x${string}`,
      })
      // null means no ENS name — that's a valid result, not an error
      const name = ens ?? ''
      ensAddressMap[address] = name
      if (name !== '') {
        ensResolvedMap[name] = address
      }
      // Clear any previous failure timestamp on success
      delete ensFailureTimestamps[address]
      return name
    } catch (err) {
      retries++
      logger.warn(
        { err, address, attempt: retries, maxRetries: MAX_ENS_RETRIES },
        'ENS lookup error'
      )
      if (retries < MAX_ENS_RETRIES) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, retries - 1)))
      }
    }
  }

  // All retries exhausted — cache failure with a TTL so we don't keep hammering
  ensAddressMap[address] = ''
  ensFailureTimestamps[address] = Date.now()
  return ''
}

export async function resolveEnsName(ensName: string): Promise<string> {
  // Check cache — but if it was a failed lookup, respect the TTL
  if (ensName in ensResolvedMap) {
    const cachedValue = ensResolvedMap[ensName]
    if (cachedValue !== '') {
      return cachedValue
    }
    const failedAt = ensFailureTimestamps[ensName]
    if (failedAt && Date.now() - failedAt < ENS_FAILURE_TTL_MS) {
      return ''
    }
  }

  let retries = 0
  while (retries < MAX_ENS_RETRIES) {
    try {
      const resolvedAddress = await publicClient.getEnsAddress({
        name: ensName,
      })
      // null means name doesn't resolve — valid result, not an error
      const wallet = resolvedAddress ?? ''
      if (wallet !== '') {
        ensResolvedMap[ensName] = wallet
      }
      delete ensFailureTimestamps[ensName]
      return wallet
    } catch (err) {
      retries++
      logger.warn(
        { err, ensName, attempt: retries, maxRetries: MAX_ENS_RETRIES },
        'ENS resolve error'
      )
      if (retries < MAX_ENS_RETRIES) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, retries - 1)))
      }
    }
  }

  // All retries exhausted — cache failure with TTL
  ensResolvedMap[ensName] = ''
  ensFailureTimestamps[ensName] = Date.now()
  return ''
}

export async function ensOrAddress(address: string): Promise<string> {
  const ens = await getENSName(address)
  return ens !== '' ? ens : address
}

export async function getOSName(address: string): Promise<string> {
  let name = ''
  const cached = osAddressMap[address]
  if (cached && Date.now() - cached.cachedAt < OS_CACHE_TTL_MS) {
    name = cached.name
  } else {
    try {
      const response = await axios.get(
        `https://api.opensea.io/api/v2/accounts/${address}`,
        {
          headers: {
            Accept: 'application/json',
            'x-api-key': process.env.OPENSEA_API_KEY,
          },
        }
      )
      const responseBody = response?.data
      if (responseBody?.detail) {
        throw new Error(responseBody.detail)
      }
      name = responseBody?.username ?? ''
      osAddressMap[address] = { name, cachedAt: Date.now() }
      evictOldOSCacheEntries()
    } catch (err) {
      // Probably rate limited - return empty string but don't cache
      name = ''
      logger.warn({ err }, "Error getting user's OpenSea name")
    }
  }

  return name
}

/**
 * Evict oldest OS cache entries when exceeding max size
 */
function evictOldOSCacheEntries() {
  const keys = Object.keys(osAddressMap)
  if (keys.length > MAX_OS_CACHE_SIZE) {
    const entries = Object.entries(osAddressMap)
    entries
      .sort((a, b) => a[1].cachedAt - b[1].cachedAt)
      .slice(0, entries.length - MAX_OS_CACHE_SIZE)
      .forEach(([key]) => delete osAddressMap[key])
  }
}

/**
 * Evict oldest ENS cache entries when exceeding max size.
 * Called periodically to prevent unbounded growth of successful lookups.
 */
export function evictOldENSCacheEntries() {
  const ensKeys = Object.keys(ensAddressMap)
  if (ensKeys.length > MAX_ENS_CACHE_SIZE) {
    // Remove oldest half of entries (simple approach since we don't track timestamps for successful lookups)
    const toRemove = ensKeys.slice(0, ensKeys.length - MAX_ENS_CACHE_SIZE)
    toRemove.forEach((key) => {
      delete ensAddressMap[key]
      delete ensFailureTimestamps[key]
    })
  }

  const resolvedKeys = Object.keys(ensResolvedMap)
  if (resolvedKeys.length > MAX_ENS_CACHE_SIZE) {
    const toRemove = resolvedKeys.slice(
      0,
      resolvedKeys.length - MAX_ENS_CACHE_SIZE
    )
    toRemove.forEach((key) => {
      delete ensResolvedMap[key]
      delete ensFailureTimestamps[key]
    })
  }
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
  'factory',
  'playground',
  'studio',
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
  chainId: number,
  contractAddress: string,
  tokenId: string
): string {
  contractAddress = contractAddress.toLowerCase()
  return `https://token.artblocks.io/${chainId}/${contractAddress}/${tokenId}`
}

export function isExplorationsContract(contractAddress: string): boolean {
  return Object.values(EXPLORATIONS_CONTRACTS).includes(
    contractAddress.toLowerCase()
  )
}

export function isStudioContract(contractAddress: string): boolean {
  return STUDIO_CONTRACTS.includes(contractAddress.toLowerCase())
}

export function isEngineContract(contractAddress: string): boolean {
  return ENGINE_CONTRACTS.includes(contractAddress.toLowerCase())
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
  } else if (isStudioContract(contractAddress)) {
    return CollectionType.STUDIO
  }

  throw new Error('Unknown collection type')
}

export function getTokenUrl(
  external_url: string,
  chainId: number,
  contractAddr: string,
  tokenId: string
): string {
  if (external_url && !external_url.includes('generator.artblocks.io')) {
    return external_url
  }
  return buildArtBlocksTokenURL(chainId, contractAddr, tokenId)
}

export function getProjectSlugUrl(slug: string): string {
  return `https://www.artblocks.io/collection/${slug}`
}

export function buildArtBlocksTokenURL(
  chainId: number,
  contractAddr: string,
  tokenId: string
): string {
  return `https://www.artblocks.io/token/${chainId}/${contractAddr}/${tokenId}`
}

/**
 * Build generator (live script) URL from chain + contract + token.
 */
export function buildGeneratorUrl(
  chainId: number,
  contractAddress: string,
  tokenId: string
): string {
  contractAddress = contractAddress.toLowerCase()
  return `https://generator.artblocks.io/${chainId}/${contractAddress}/${tokenId}`
}

/**
 * Build media/preview image URL from chain + contract + token.
 */
export function buildMediaUrl(
  chainId: number,
  contractAddress: string,
  tokenId: string
): string {
  contractAddress = contractAddress.toLowerCase()
  return `https://media-proxy.artblocks.io/${chainId}/${contractAddress}/${tokenId}.png`
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

export function replaceToPNG(url: string): string {
  return url.replace(/\.(gif|mp4)$/i, '.png')
}

// defaulting our discord embeds to always send GIFs
export async function replaceVideoWithGIF(url: string) {
  if (url.includes('mp4')) {
    const gifURL = url.replace('mp4', 'gif')

    // some GIFs are not available, so we fallback to PNG
    try {
      const resp = await axios.get(gifURL)

      if (resp.headers['content-length'] === '0') {
        throw new Error('GIF size 0 for ' + gifURL)
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        logger.info('GIF not found, returning PNG')
      } else {
        logger.info({ err: e, gifURL }, 'Error on fetching token API for GIF')
      }
      return url.replace('mp4', 'png')
    }

    return gifURL
  }

  return url
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
export const waitForStudioContracts = async (): Promise<string[]> => {
  while (STUDIO_CONTRACTS.length === 0) {
    logger.info('Waiting for studio contracts to load')
    await delay(4000)
  }
  return STUDIO_CONTRACTS
}
export const waitForEngineContracts = async (): Promise<string[]> => {
  while (ENGINE_CONTRACTS.length === 0) {
    logger.info('Waiting for engine contracts to load')
    await delay(5000)
  }
  return ENGINE_CONTRACTS
}

export const ethFromWeiString = (wei: string): string => {
  return `${parseInt(wei) / 1e18}`
}

// ===== Shared constants for OpenSea bots =====

/** Tolerance for detecting duplicate price events */
export const IDENTICAL_TOLERANCE = 0.0001

/** Time-to-live for deduplication caches (24 hours) */
export const EVENT_DEDUP_TTL_MS = 24 * 60 * 60 * 1000

/** Interval for cleaning up old deduplication caches (1 hour) */
export const CLEANUP_INTERVAL_MS = 60 * 60 * 1000

// ===== Shared functions for OpenSea bots =====

/**
 * Parses an OpenSea NFT ID and extracts contract address and token ID
 * @param nftId - Format: "ethereum/0x2308742aa28cc460522ff855d24a365f99deba7b/7111"
 * @returns {contractAddress, tokenId} or null if invalid format
 */
const CHAIN_NAME_TO_ID: Record<string, number> = {
  ethereum: 1,
  arbitrum: 42161,
  base: 8453,
}

export function parseNftId(
  nftId: string
): { chainId: number; contractAddress: string; tokenId: string } | null {
  const parts = nftId.split('/')
  if (parts.length !== 3) {
    logger.warn({ nftId }, 'Invalid NFT ID format')
    return null
  }

  const chainId = CHAIN_NAME_TO_ID[parts[0]]
  if (chainId === undefined) {
    logger.warn({ chain: parts[0], nftId }, 'Unknown chain in NFT ID')
    return null
  }

  return {
    chainId,
    contractAddress: parts[1].toLowerCase(),
    tokenId: parts[2],
  }
}

/**
 * Determines the curation status string for display in embeds.
 * Shared between OpenSeaListBot and OpenSeaSaleBot.
 */
export function getCurationStatus(
  artBlocksData: ArtBlocksTokenData,
  contractAddress: string
): string {
  if (artBlocksData?.platform?.includes('Art Blocks x Pace')) {
    return 'AB x Pace'
  } else if (artBlocksData?.platform === 'Art Blocks × Bright Moments') {
    return 'AB x Bright Moments'
  } else if (isExplorationsContract(contractAddress)) {
    return 'Explorations'
  } else if (isStudioContract(contractAddress)) {
    return 'Studio'
  } else if (isEngineContract(contractAddress)) {
    return 'Engine'
  }

  if (artBlocksData?.curation_status) {
    return (
      artBlocksData.curation_status[0].toUpperCase() +
      artBlocksData.curation_status.slice(1).toLowerCase()
    )
  }

  return ''
}

/**
 * Builds the embed title, prepending the platform name for Engine projects.
 */
export function buildEmbedTitle(
  artBlocksData: ArtBlocksTokenData,
  contractAddress: string
): string {
  let title = `${artBlocksData.name} - ${artBlocksData.artist}`
  if (isEngineContract(contractAddress) && artBlocksData?.platform) {
    title = `${artBlocksData.platform} - ${title}`
  }
  return title
}

/** Minimal type for Art Blocks token API response data used in shared functions */
export interface ArtBlocksTokenData {
  name: string
  artist: string
  collection_name?: string
  curation_status?: string
  platform?: string
  external_url?: string
  preview_asset_url?: string
  project_id?: string
  generator_url?: string
}

/**
 * Cleanup entries older than ttlMs from a timestamp-keyed cache object.
 * Returns the number of entries removed.
 */
export function cleanupTimestampCache(
  cache: { [key: string]: { timestamp: number } },
  ttlMs: number
): number {
  const now = Date.now()
  let removed = 0
  for (const [key, value] of Object.entries(cache)) {
    if (now - value.timestamp > ttlMs) {
      delete cache[key]
      removed++
    }
  }
  return removed
}
