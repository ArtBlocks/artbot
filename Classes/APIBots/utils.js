require('dotenv').config()
const axios = require('axios')
const ethers = require('ethers')

let provider = new ethers.providers.EtherscanProvider(
  'homestead',
  process.env.ETHERSCAN_API_KEY
)

// Runtime ENS cache just to limit queries
let ensAddressMap = {}
let ensResolvedMap = {}
let osAddressMap = {}
const MAX_ENS_RETRIES = 3

async function getENSName(address) {
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

async function resolveEnsName(ensName) {
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

async function ensOrAddress(address) {
  let ens = await getENSName(address)
  return ens !== '' ? ens : address
}

async function getOSName(address) {
  let name = ''
  if (osAddressMap[address]) {
    console.log('Cached!')
    name = osAddressMap[address]
  } else {
    try {
      let response = await axios.get(`https://api.opensea.io/user/${address}`, {
        headers: {
          Accept: 'application/json',
          'X-API-KEY': process.env.OPENSEA_API_KEY,
        },
      })
      let responseBody = response?.data
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

function isWallet(msg) {
  return msg.startsWith('0x') || msg.endsWith('eth')
}

function isVerticalName(msg) {
  return (
    msg === 'curated' ||
    msg === 'presents' ||
    msg === 'collaborations' ||
    msg === 'collabs' ||
    msg === 'heritage'
  )
}
function getVerticalName(msg) {
  switch (msg) {
    case 'collabs':
      return 'collaborations'
    case 'collaborations':
    case 'heritage':
    case 'curated':
    case 'presents':
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
