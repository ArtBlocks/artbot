const ethers = require('ethers')
const fetch = require('node-fetch')

let provider = new ethers.providers.AlchemyProvider('homestead')

// Runtime ENS cache just to limit queries
let addressMap = {}

async function getENSName(address) {
  let name = ''
  if (addressMap[address]) {
    name = addressMap[address]
  } else {
    let ens = await provider.lookupAddress(address)
    name = ens ?? ''
    addressMap[address] = name
  }
  return name
}

async function ensOrAddress(address) {
  let ens = await getENSName(address)
  return ens !== '' ? ens : address
}

module.exports.ensOrAddress = ensOrAddress
