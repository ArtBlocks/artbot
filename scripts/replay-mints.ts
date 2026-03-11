/**
 * replay-mints.ts
 *
 * Replays missed mint posts for a specific project to a Discord channel.
 *
 * Usage:
 *   ts-node scripts/replay-mints.ts --project-id <project_id> [options]
 *
 * Required:
 *   --project-id   Hasura project ID (format: <contractAddress>-<projectNumber>)
 *                  e.g. 0x13aae6f9599880edbb7d144bb13f1212cee99533-0
 *
 * Options:
 *   --channel      Discord channel name to replay into (default: studio-mints)
 *   --rate         Max posts per minute (default: 200, ~100 req/10s limit)
 *   --dry-run      Print what would be posted without actually posting
 *   --prod         Use production channels.json (default: dev channels)
 *   --limit        Only replay up to this many mints (default: unlimited)
 */

import * as dotenv from 'dotenv'
import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  TextChannel,
} from 'discord.js'
import fetch from 'node-fetch'
import * as path from 'path'
import * as fs from 'fs'

dotenv.config()

// ─── Config ─────────────────────────────────────────────────────────────────

const HASURA_ENDPOINT = 'https://data.artblocks.io/v1/graphql'
const MINT_UTM = '?utm_source=discord&utm_medium=artbot&utm_campaign=mint'
const BASE_AB_PROFILE = 'https://www.artblocks.io/user/'

// ─── Arg parsing ────────────────────────────────────────────────────────────

function parseArgs(): {
  projectId: string
  channelName: string
  ratePerMinute: number
  dryRun: boolean
  prod: boolean
  limit: number | null
} {
  const args = process.argv.slice(2)
  let projectId = ''
  let channelName = 'studio-mints'
  let ratePerMinute = 200
  let dryRun = false
  let prod = process.env.ARTBOT_IS_PROD === 'true'
  let limit: number | null = null

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--project-id':
        projectId = args[++i]
        break
      case '--channel':
        channelName = args[++i]
        break
      case '--rate':
        ratePerMinute = parseInt(args[++i], 10)
        break
      case '--dry-run':
        dryRun = true
        break
      case '--prod':
        prod = true
        break
      case '--limit':
        limit = parseInt(args[++i], 10)
        break
      default:
        console.warn(`Unknown argument: ${args[i]}`)
    }
  }

  if (!projectId) {
    console.error('Error: --project-id is required')
    console.error(
      'Example: ts-node scripts/replay-mints.ts --project-id 0x13aae6f9599880edbb7d144bb13f1212cee99533-0'
    )
    process.exit(1)
  }

  return { projectId, channelName, ratePerMinute, dryRun, prod, limit }
}

// ─── Channel ID lookup ───────────────────────────────────────────────────────

function getChannelId(channelName: string, prod: boolean): string {
  const channelsFile = prod
    ? path.join(__dirname, '../src/ProjectConfig/channels.json')
    : path.join(__dirname, '../src/ProjectConfig/channels_dev.json')

  let channels: Record<string, { name: string }>
  try {
    channels = JSON.parse(fs.readFileSync(channelsFile, 'utf8'))
  } catch {
    // Fall back to production channels if dev file doesn't exist
    channels = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../src/ProjectConfig/channels.json'),
        'utf8'
      )
    )
  }

  const entry = Object.entries(channels).find(([, v]) => v.name === channelName)
  if (!entry) {
    throw new Error(`Channel "${channelName}" not found in channels config`)
  }
  return entry[0]
}

// ─── Hasura query ────────────────────────────────────────────────────────────

interface TokenRow {
  token_id: string
  invocation: number
  owner_address: string
  project: {
    name: string
    contract_address: string
    contract: {
      default_vertical?: {
        vertical?: {
          name?: string
        }
      }
    }
  }
}

async function fetchProjectTokens(projectId: string): Promise<TokenRow[]> {
  const query = `
    query GetProjectTokensForReplay($project_id: String!) {
      tokens_metadata(
        where: { project_id: { _eq: $project_id } }
        order_by: { invocation: asc }
      ) {
        token_id
        invocation
        owner_address
        project {
          name
          contract_address
          contract {
            default_vertical {
              vertical {
                name
              }
            }
          }
        }
      }
    }
  `

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (process.env.HASURA_GRAPHQL_ADMIN_SECRET) {
    headers['x-hasura-admin-secret'] = process.env.HASURA_GRAPHQL_ADMIN_SECRET
  }

  const response = await fetch(HASURA_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables: { project_id: projectId } }),
  })

  const json = (await response.json()) as {
    data?: { tokens_metadata: TokenRow[] }
    errors?: { message: string }[]
  }

  if (json.errors) {
    throw new Error(
      `Hasura error: ${json.errors.map((e) => e.message).join(', ')}`
    )
  }
  if (!json.data) {
    throw new Error('No data returned from Hasura')
  }

  return json.data.tokens_metadata
}

// ─── URL builders ────────────────────────────────────────────────────────────

function buildMediaUrl(
  chainId: number,
  contractAddress: string,
  tokenId: string
): string {
  return `https://media-proxy.artblocks.io/${chainId}/${contractAddress.toLowerCase()}/${tokenId}.png`
}

function buildGeneratorUrl(
  chainId: number,
  contractAddress: string,
  tokenId: string
): string {
  return `https://generator.artblocks.io/${chainId}/${contractAddress.toLowerCase()}/${tokenId}`
}

function buildArtBlocksTokenUrl(
  chainId: number,
  contractAddress: string,
  tokenId: string
): string {
  return `https://www.artblocks.io/token/${chainId}/${contractAddress}/${tokenId}`
}

// ─── Discord channel history reader ──────────────────────────────────────────

/**
 * Fetches all messages from a Discord channel and returns the set of
 * invocation numbers that have already been posted for the given project name.
 *
 * The embed title format is: "Minted: {projectName} #{invocation}"
 */
async function fetchPostedInvocations(
  channel: TextChannel,
  projectName: string
): Promise<Set<number>> {
  const posted = new Set<number>()
  const titlePrefix = `Minted: ${projectName} #`

  console.log(
    `\nScanning last 100 messages in #${channel.name} for previously posted "${projectName}" mints...`
  )

  const messages = await channel.messages.fetch({ limit: 100 })
  for (const msg of messages.values()) {
    for (const embed of msg.embeds) {
      const title = embed.title ?? ''
      if (title.startsWith(titlePrefix)) {
        const invocationStr = title.slice(titlePrefix.length)
        const invocation = parseInt(invocationStr, 10)
        if (!isNaN(invocation)) {
          posted.add(invocation)
        }
      }
    }
  }

  console.log(`  Scanned ${messages.size} messages. Found ${posted.size} already-posted invocations.`)
  return posted
}

// ─── ENS / address display ───────────────────────────────────────────────────

function shortAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { projectId, channelName, ratePerMinute, dryRun, prod, limit } =
    parseArgs()

  const msPerPost = Math.ceil((60 / ratePerMinute) * 1000)

  console.log('─'.repeat(60))
  console.log(`  Replay Mints Script`)
  console.log('─'.repeat(60))
  console.log(`  Project ID : ${projectId}`)
  console.log(`  Channel    : ${channelName}`)
  console.log(
    `  Rate       : ${ratePerMinute} posts/min (~${msPerPost}ms between posts)`
  )
  console.log(
    `  Mode       : ${dryRun ? 'DRY RUN (no posts will be made)' : 'LIVE'}`
  )
  console.log(`  Channels   : ${prod ? 'production' : 'dev'}`)
  if (limit) console.log(`  Limit      : ${limit} mints`)
  console.log('─'.repeat(60))

  // Resolve channel ID
  let channelId: string
  try {
    channelId = getChannelId(channelName, prod)
  } catch (err) {
    console.error(`\nError: ${(err as Error).message}`)
    process.exit(1)
  }
  console.log(`\nTarget channel ID: ${channelId}`)

  // Fetch tokens from Hasura
  console.log(`\nFetching tokens for project "${projectId}" from Hasura...`)
  let tokens: TokenRow[]
  try {
    tokens = await fetchProjectTokens(projectId)
  } catch (err) {
    console.error(`\nFailed to fetch tokens: ${(err as Error).message}`)
    process.exit(1)
  }

  if (tokens.length === 0) {
    console.log(
      '\nNo tokens found for this project. Double-check the project ID.'
    )
    process.exit(0)
  }

  const firstToken = tokens[0]
  const projectName = firstToken.project.name
  const contractAddress = firstToken.project.contract_address
  console.log(`\nProject: "${projectName}" — ${tokens.length} total tokens`)
  console.log(`Contract: ${contractAddress}`)

  console.log(process.env.DISCORD_TOKEN)
  // Connect to Discord
  if (!process.env.DISCORD_TOKEN) {
    console.error('\nError: DISCORD_TOKEN environment variable is not set.')
    process.exit(1)
  }

  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  })

  await new Promise<void>((resolve, reject) => {
    client.once('ready', () => {
      console.log(`\nDiscord bot connected as: ${client.user?.tag}`)
      resolve()
    })
    client.once('error', reject)
    client.login(process.env.DISCORD_TOKEN)
  })

  const discordChannel = client.channels.cache.get(channelId) as
    | TextChannel
    | undefined
  if (!discordChannel) {
    console.error(
      `\nError: Channel ${channelId} (${channelName}) not found or bot lacks access.`
    )
    await client.destroy()
    process.exit(1)
  }

  // Read existing posts to determine which invocations are already covered
  const alreadyPosted = await fetchPostedInvocations(
    discordChannel,
    projectName
  )

  // Determine which tokens need to be replayed
  const toReplay = tokens.filter((t) => !alreadyPosted.has(t.invocation))

  console.log(
    `\n${toReplay.length} mints need to be replayed (out of ${tokens.length} total)`
  )

  if (toReplay.length === 0) {
    console.log('Nothing to do — all mints already posted!')
    await client.destroy()
    process.exit(0)
  }

  // Apply optional limit
  const batch = limit != null ? toReplay.slice(0, limit) : toReplay

  if (limit != null && toReplay.length > limit) {
    console.log(
      `Limiting replay to first ${limit} mints (${
        toReplay.length - limit
      } will be skipped)`
    )
  }

  // Infer chain ID — mainnet (1) is the default; expand this if needed
  // The Hasura token_id for mainnet looks like: "0xcontract-tokenId"
  // For now we default to chain 1 (mainnet) since studio contracts are mainnet
  const CHAIN_ID = 1

  if (dryRun) {
    console.log('\n[DRY RUN] Would replay the following invocations:')
    batch.forEach((t) =>
      console.log(
        `  • ${projectName} #${t.invocation} (token ${
          t.token_id
        }, owner ${shortAddress(t.owner_address)})`
      )
    )
    await client.destroy()
    process.exit(0)
  }

  // Post mints with rate limiting
  console.log(
    `\nStarting replay... (posting ${batch.length} mints at ${ratePerMinute}/min)\n`
  )

  for (let i = 0; i < batch.length; i++) {
    const token = batch[i]
    const tokenName = `${projectName} #${token.invocation}`
    const imageUrl = buildMediaUrl(CHAIN_ID, contractAddress, token.token_id)
    const generatorUrl = buildGeneratorUrl(
      CHAIN_ID,
      contractAddress,
      token.token_id
    )
    const artblocksUrl = buildArtBlocksTokenUrl(
      CHAIN_ID,
      contractAddress,
      token.token_id
    )
    const ownerProfile = `${BASE_AB_PROFILE}${token.owner_address}${MINT_UTM}`

    const embed = new EmbedBuilder()
      .setTitle(`Minted: ${tokenName}`)
      .setURL(artblocksUrl + MINT_UTM)
      .setImage(imageUrl)
      .setColor('#c9fdc9')
      .addFields(
        {
          name: 'Minted by',
          value: `[${shortAddress(token.owner_address)}](${ownerProfile})`,
          inline: true,
        },
        {
          name: 'Live Script',
          value: `[Generator](${generatorUrl + MINT_UTM})`,
          inline: true,
        }
      )

    try {
      await discordChannel.send({ embeds: [embed] })
      console.log(`  [${i + 1}/${batch.length}] Posted: ${tokenName}`)
    } catch (err) {
      console.error(
        `  [${i + 1}/${batch.length}] Failed to post ${tokenName}: ${
          (err as Error).message
        }`
      )
    }

    // Rate limit: wait between posts (skip delay after the last one)
    if (i < batch.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, msPerPost))
    }
  }

  console.log(`\nDone! Replayed ${batch.length} mints to #${channelName}.`)
  await client.destroy()
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
