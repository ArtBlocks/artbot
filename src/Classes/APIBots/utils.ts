import * as dotenv from 'dotenv'
dotenv.config()

const axios = require('axios')
const ethers = require('ethers')

const provider = new ethers.providers.EtherscanProvider(
  'homestead',
  process.env.ETHERSCAN_API_KEY
)

// Runtime ENS cache just to limit queries
const ensAddressMap: { [id: string]: string } = {}
const ensResolvedMap: { [id: string]: string } = {}
const osAddressMap: { [id: string]: string } = {}
const MAX_ENS_RETRIES = 3

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

async function ensOrAddress(address: string): Promise<string> {
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

module.exports.ensOrAddress = ensOrAddress
module.exports.getOSName = getOSName
module.exports.resolveEnsName = resolveEnsName
module.exports.isWallet = isWallet
module.exports.isVerticalName = isVerticalName
module.exports.getVerticalName = getVerticalName
