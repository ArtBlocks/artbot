import * as dotenv from 'dotenv'
import { PineconeClient } from '@pinecone-database/pinecone'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch'
const fetch = require('node-fetch')
dotenv.config()

// NOTE: This file is an active work-in-progress and currently intended to be run as a script.
//       Currently, this script can be run by calling `npx ts-node src/Utils/ArtGPT/dataIngestor.ts`
//       from the root of the repo.
// TODOs:
// - [ ] Add additional TODOs
// - [X] Add support for passing in a repo URL as a command line argument
// - [X] Update this script to be run in both CLI mode and as a module
// - [ ] Experiment with different chunk sizes and overlaps

// Default GH repos to ingest if not explicitly specified
const GH_API_BASE_URI = 'https://api.github.com/repos/'
const GH_REPOS = ['ArtBlocks/artblocks-docs', 'ArtBlocks/artblocks-contracts']
const GH_FILETYPES = ['.sol', '.md']
const GH_REQ_OPTIONS = {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
}
// Data chunking parameters
const CHUNK_SIZE = 4000
const CHUNK_OVERLAP = 200

async function fetchAndProcessGHFiles(
  urls: string,
  pineconeIndex: VectorOperationsApi
) {
  for (const url of urls) {
    const response = await fetch(url, GH_REQ_OPTIONS)
    const data = await response.json()

    const buff = Buffer.from(data.content, 'base64')
    const text = buff.toString('utf-8')

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    })

    const docs = await splitter.createDocuments([text])

    // this actually hits openai embeddings api under the hood to generate embeddings
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
    })
    console.log(`Done embedding and storing ${url} in Pinecone`)
  }
}

function getStartRepoUrl(repo: string) {
  return `${GH_API_BASE_URI}${repo}/contents/?ref=main`
}
/**
 * Recursively crawls repo for all relevant file urls
 * @param repoUrl
 * @returns
 */
async function crawlRepo(repoUrl: string) {
  const response = await fetch(repoUrl, GH_REQ_OPTIONS)
  const repoContent = await response.json()
  if (repoContent.length === 0) {
    return []
  }
  const fileUrls = repoContent
    .filter(
      (item: any) =>
        item.type === 'file' &&
        GH_FILETYPES.some((filetype) => {
          return item.path.endsWith(filetype)
        })
    )
    .map((item: any) => item.url)

  const dirUrls = repoContent
    .filter((item: any) => item.type === 'dir')
    .map((item: any) => item.url)

  for (const dirUrl of dirUrls) {
    fileUrls.push(...(await crawlRepo(dirUrl)))
  }

  return fileUrls
}

async function ingest(repos: string[] = GH_REPOS): Promise<void> {
  const client = new PineconeClient()

  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENV as string,
  })
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME as string)
  console.log(`Deleting all vectors from ${process.env.PINECONE_INDEX_NAME}`)
  await pineconeIndex.delete1({ deleteAll: true })
  console.log(
    `Done deleting all vectors from ${process.env.PINECONE_INDEX_NAME}`
  )
  for (const repo of repos) {
    console.log(`Processing repo: ${repo}`)
    const startRepoUrl = getStartRepoUrl(repo)
    const crawledFileUrls = await crawlRepo(startRepoUrl)
    console.log(`Found ${crawledFileUrls.length} files to process`)
    await fetchAndProcessGHFiles(crawledFileUrls, pineconeIndex)
  }
}

export { ingest }

// Check if the file is being run directly
if (require.main === module) {
  const args = process.argv.slice(2)

  // Call the async ingest function with the arguments or without arguments if empty
  ingest(args.length ? args : undefined).catch((error) => {
    console.error('Error:', error.message)
    process.exit(1)
  })
}
