const ethers = require('ethers')

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

module.exports.getENSName = getENSName
