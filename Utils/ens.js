const namehash = require('@ensdomains/eth-ens-namehash')
const ethers = require('ethers')

const REGISTRY_ABI = ['function resolver(bytes32 node) view returns (address)']
const RESOLVER_ABI = [
  'function addr(bytes32 node) view returns (address)',
  'function name(bytes32 node) view returns (string)',
]

async function getResolver(provider, node) {
  const network = await provider.getNetwork()
  const registryAddress = network.ensAddress
  if (!registryAddress) return null
  const registry = new ethers.Contract(registryAddress, REGISTRY_ABI, provider)
  const resolverAddress = await registry.resolver(node).catch(() => null)
  if (resolverAddress == null) return null
  const resolver = new ethers.Contract(resolverAddress, RESOLVER_ABI, provider)
  return resolver
}

async function resolveName(provider, name) {
  const node = namehash.hash(name)
  const resolver = await getResolver(provider, node)
  if (resolver == null) return null
  return await resolver.addr(node).catch(() => null)
}

async function lookupAddress(provider, address) {
  address = ethers.utils.getAddress(address)
  const hex = address.toLowerCase().slice(2)
  const name = `${hex}.addr.reverse`
  const node = namehash.hash(name)
  const resolver = await getResolver(provider, node)
  if (resolver == null) return null
  const candidate = await resolver.name(node).catch(() => null)
  if (candidate == null) return null
  // Double-check forward resolution; reverse records may be set to anything.
  const forward = await resolveName(provider, candidate)
  if (forward !== address) return null
  return candidate
}

module.exports.getResolver = getResolver
module.exports.resolveName = resolveName
module.exports.lookupAddress = lookupAddress
