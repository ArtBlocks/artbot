import { EmbedBuilder, ColorResolvable, Message } from 'discord.js'
import * as dotenv from 'dotenv'
import { artIndexerBot, projectConfig, triviaBot, insightsBot } from '..'
dotenv.config()
const fetch = require('node-fetch')

const PROJECT_ALIASES = require('../ProjectConfig/project_aliases.json')

// ArtBot details..
const ARTBOT_USERNAME = 'artbot'
const ARTBOT_JR_USERNAME = 'artbot-jr'

const ARTBOT_GREEN = 0x00ff00
const ARTBOT_WARNING = 0xffff00

// Returns a random color
export function randomColor(): ColorResolvable {
  // Generate random hex color value between 0x000000 and 0xFFFFFF
  return Math.floor(Math.random() * 0xffffff) as ColorResolvable
}

// Thank you message for people asking the artbot how it is.
const ARTBOT_HOW_ARE_YOU = new EmbedBuilder()
  // Set the main content of the embed
  .setDescription(
    `I'm doing well! :) Heard the puzzle piece Generative Artworks gave me came in handy.`
  )

// Custom message shown when someone asks why Squiggle minting is paused.
const SQUIGGLE_PAUSE_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('Why is Squiggle minting paused?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `It looks like you're wondering about why Chromie Squiggle minting is paused.The tl;dr is that all normal minting is over and the remaining Squiggles are reserved for special occasions!\n\nFor more details, check out the [#squiggle-announcements](https://discord.com/channels/411959613370400778/800461920008273962/800464186924466187) channel.`
  )

// Custom messages shown when someone asks about applications.
const APPLICATIONS_OPEN_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('How do I apply to release my project on Art Blocks?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `It looks like you're wondering about the Art Blocks application process.\n\nInfo on how to apply to Art Blocks can be found in [#applications](https://discord.com/channels/411959613370400778/450278286862450701).\n\nBefore you apply, make sure:\n1) You're ready and able to share your creative history with us.\n2) You can deliver a functioning script (we cannot help you create one).\n3) Your work is original.\n\nIf you can check those boxes, head over to [#applications](https://discord.com/channels/411959613370400778/450278286862450701/948624381096099891), read the full statement, and click the link to apply.`
  )

// Custom message shown when someone asks about gas.
const GAS_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('Should I modify the gas settings?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `It looks like you're wondering what the deal is with gas.\n\ntl;dr: **Never** modify the gas _limit_, increase the gas _price_ if you want your transaction prioritized.\n\nAll transactions on the Ethereum blockchain consume "gas" in order to be processed, as a way of ensuring that the network is not spammed with value-less transactions.\n\nThe gas _price_ is the amount of Ether (usually measured in the fractional units of "gwei") that you are willing to pay per gas unit that your transaction consumes. If you want your transaction to be approved more quickly, you can increase this to be higher than [the going rate](https://www.gasnow.org/) in order to incentivize miners to process your transaction over other pending transactions.\n\nThe gas _limit_ is the total amount of gas that you are willing to allow your transaction to consume. This amount is auto-magically estimated by MetaMask based on the complexity of the transaction you are performing. Unless you are an expert, you should **never** modify this value. Increasing the gas limit will have no impact on the priority of your transaction, while decreasing it may result in your transaction failing due to "running out of gas" and you losing a transaction fee in the process.`
  )

// Custom message shown when someone asks artbot about high gas.
const MM_HIGH_GAS_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('Why is MetaMask showing an extremely high gas fee?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `MetaMask shows an extremely high gas fee when the purchase won't go through. For example:\n\n- You have insufficient funds in your wallet to pay for mint and estimated gas.\n- The one-mint-per-wallet limiter is on and you are trying to make a second mint.\n- You are trying to mint when the project already sold out or paused.\n\nThis is a [current bug](https://github.com/MetaMask/metamask-extension/issues/10862) with MetaMask.`
  )

// Custom message shown when someone asks about when the next drop is.
const NEXT_DROP_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('When is the next drop?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `It looks like you're wondering about when the next drop is.\n\nFor details on upcoming scheduled releases, please check the [#upcoming-projects](https://discord.com/channels/411959613370400778/872986185167949885) channel.`
  )

const OPENSEA_CURATED_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle(
    'Why is this non-curated project showing up as "ArtBlocks Curated" on OpenSea?'
  )
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `When a project is just minted, there's a delay in OpenSea pulling in the mint's metadata, which includes what collection the mint is in. During this time, OpenSea doesn't know what collection the mint is in, so OpenSea temporarily puts it in "ArtBlocks Curated". Once OpenSea gets the metadata, the mint will be put into its correct collection.`
  )

/*
 * Custom message shown when someone asks what the "Heritage" vs. "Curated"
 * vs. "Explorations", etc is.
 */
const VERTICALS_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle(
    'How are Curated, Explorations, Presents, Collaborations, and Heritage different?'
  )
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `It looks like you're wondering about the different types of Art Blocks collections.

    **Art Blocks Curated** includes projects selected by the [curation board](https://medium.com/the-link-art-blocks/meet-the-art-blocks-curation-board-696102e747e3) representing our vision of cutting-edge generative artwork. These highly innovative releases by artists reflect both astounding beauty and technical pioneering.

    **Art Blocks Explorations** encompasses our wild ideas and commissioned experiments. It is the place where we tinker, and these projects are connected not by theme or structure, but rather by their pursuit of delight.

    **Art Blocks Presents** comprises of projects screened and selected by Art Blocks and embodies our standards for artistic creativity, conceptual rigor, and technical achievement.

    **Art Blocks x Collaborations** are with select partners and organized into a new vertical of co-branded collections. Because partner projects live directly in the Art Blocks ecosystem, they will be subject to the same quality review and scheduling as any other Art Blocks project. These collections represent true collaborations between Art Blocks and our partners to shape the program of offerings.

    **Art Blocks Heritage** is a designation to denote Art Blocks projects released as either Playground or Factory projects before 11/1/22.
  `
  )

const V2_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('What is Art Blocks 2.0?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `**Art Blocks 2.0** is a reorientation of our product that includes a new smart contract for our projects, new product collections called "Presents" and "Explorations," and a refreshed and greatly expanded website. The new contract significantly reduces the cost for both artists and collectors, while the new product collections provide new opportunities for experimentation, and set the stage for the future of Art Blocks. Finally, the new website provides more robust engineering, scalability, and a consistent, inclusive user experience, including editorial content about the artists launching on our platform. See [this article](https://medium.com/the-link-art-blocks/the-next-version-of-art-blocks-7ff01308b475) for more details, and visit us at [artblocks.io](https://artblocks.io/) to experience these improvements for yourself.`
  )

// Custom message shown when someone asks for the OpenSea links.
const OPENSEA_LINKS_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('Looking for ArtBlocks on OpenSea?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `There are three ArtBlocks collections on OpenSea:\n• [ArtBlocks Curated](https://opensea.io/assets/art-blocks)\n• [ArtBlocks Playground](https://opensea.io/assets/art-blocks-playground)\n• [ArtBlocks Factory](https://opensea.io/assets/art-blocks-factory)`
  )

// Custom message shown when someone asks about when the next drop is.
const HELP_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('Looking for help?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `These are the things you can ask me:\n
    **artblocks?**: What is Art Blocks?
    **genart?**: What is generative art?
    **squiggle paused?**: An explanation of why Chromie Squiggle minting is paused.
    **drop?**: Where to find information about the next drop.
    **presents?** (or **curated?** or **heritage?** or **collaborations?** or **explorations?**): Information about the different types of Art Blocks projects.
    **v2?**: Information about Art Blocks 2.0.
    **opensea?**: Links to the three different Art Blocks collections on OpenSea (Curated, Playground, and Factory).
    **applications?**: An explanation of the current state of the Art Blocks application process.
    **gas?**: An explanation of what gas is and why you should **never** modify the gas limit.
    **staysafe?**: Tips on avoiding scams
    **aliases?**: A handy list of aliases that can be used in \`#\` commands.
    **hashtag?**: A handy list of all \`#\` functionalities
    **artBot**: Ask about Art Blocks artists and projects by tagging @artbot at the start of your question. This AI-powered feature is in beta.
    `
  )
// Custom message shown when someone asks about ArtBlocks
const ARTBLOCKS_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('What is Art Blocks?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `Art Blocks is leading a new generation of art. Hosting projects from today’s most innovative digital artists, our platform combines creative coding with blockchain technology to establish a new paradigm for the creation and ownership of art. Collectors actively participate in realizing an artist’s vision by generating unique algorithmic artworks. This symbiotic relationship and shared experience form the basis of our dynamic community. We invite you to join us as we build a home for the future of generative art.`
  )

// Custom message shown when someone asks about gen art
const GENART_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('What is generative art?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `Generative artists create a set of rules that automate art creation within a predefined framework. By introducing randomness to those systems, artists are able to explore and iterate on ideas through varied outputs. In a contemporary sense, this means writing code-based rules to create a collection of generative works. These algorithms are capable of generating hundreds, or even thousands, of compelling works of art that express a range of possibilities within a single algorithm.`
  )

// Custom message shown when someone asks about safety
const SAFETY_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('Tips on avoiding scams')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `**Always** double check who you are trading with! Discord handles can appear to be similar so verify a user by checking their **User ID**. [How to here](https://discord.com/channels/411959613370400778/1019738320303030345/1021586607188496465) \n
        **Avoid clicking links when possible.** Instead, use the official links provided by the platform’s verified Social accounts/Discord and navigate to the page/item you are trading.\n
        **Never** screen share with anyone even if they claim they’re from an official “support” team.\n
        **Never** share your seed phrase or private keys with **anyone.**\n
        **If something seems too good to be true, it is!**\n
        Stay up to date and report scams in <#1019738320303030345>\n
        **Official Art Blocks Links:**
        https://www.artblocks.io/
        https://twitter.com/artblocks_io
        https://www.instagram.com/artblocks_io/
        `
  )

const HASHTAG_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('All `#?` functionalities')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(
    `\`#?\` = Random project, random token
    \`#? [project name]\` = Random token from project
    \`#[token number] [project name]\` = Specific token from project
    \`#explore [project name]\` = Out of bounds sample from upcoming/open project
    \`#? [artist name]\` = Random token from artist
    \`#? [vertical]\` = Random token from vertical (e.g. Curated, Explorations, Presents, Engine, Collaborations, etc)
    \`#? [tag]\` = Random token from tag (e.g. Audio, Interactive, Animated, etc)
    \`#? [wallet or ENS]\` = Random token from wallet
    \`#? [wallet or ENS] [project name / artist / vertical / tag]\` = Random token from wallet with criteria described above
    \`#? open\` = Random token from an open (still minting) collection
    \`#recent\` = Get the most recently minted flagship token
    \`#recent [contract_address/name_contract/alias]\` = Get the most recently minted token for that platform (e.g. #recent plottables; #recent bm; #recent plottables flex)
    \`#? [Engine platform name]\` = Random token from Engine platform (e.g. Bright Moments, Plottables, etc)
    \`#? upcoming\` = See information about the next upcoming project
    Ask me about \`aliases\` to see a list of project name shortcuts you can use in #? commands!
    `
  )

const OTC_MESSAGE = new EmbedBuilder()
  // Set the title of the field
  .setTitle('Warning: OTC trades can be dangerous')
  // Set the color of the embed
  .setColor(ARTBOT_WARNING)
  // Set the main content of the embed
  .setDescription(
    `If participating in an OTC trade, please take extra caution to ensure a safe transaction! We have a few trusted options pinned in the <#874066035618250752> channel.

    For an OTC sale, we also encourage sending the Artist and Art Blocks royalties. More info can be found [on this post](https://discord.com/channels/411959613370400778/797930335874449408/1004904448583278712) in <#797930335874449408>`
  )

let grantThanks = 0

// Returns a message containing information about the current gas prices.
async function generateGasPriceMessage() {
  const gasResponse = await fetch(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`
  )
  const gasData = await gasResponse.json()

  return (
    new EmbedBuilder()
      // Set the title of the field
      .setTitle(`:fuelpump: Gas Prices :fuelpump:`)
      // Set the color of the embed
      .setColor(ARTBOT_GREEN)
      // Set the main content of the embed
      .setDescription(
        `:rocket: Fast: ${gasData.result.FastGasPrice}
         :airplane: Standard: ${gasData.result.ProposeGasPrice}
         :turtle: Slow: ${gasData.result.SafeGasPrice}`
      )
  )
}

/**
 * Returns a message for ArtBot to return when being smart, or null if
 * ArtBot has nothing to say.
 * @param {*} msgContentLowercase
 * @param {*} msgAuthor
 * @param {*} artBotID
 * @param {*} channelID
 */
export async function smartBotResponse(
  msgContentLowercase: string,
  msgAuthor: string,
  artBotID: string,
  channelID: string,
  msg: Message
): Promise<string | EmbedBuilder | null> {
  /*
   * NOTE: It is important to check if the message author is the ArtBot
   *       Itself to avoid a recursive infinite loop.
   */
  if (msgAuthor == ARTBOT_USERNAME || msgAuthor == ARTBOT_JR_USERNAME) {
    return null
  }

  const CHANNEL_HELP: string = projectConfig.chIdByName['help']
  const CHANNEL_SNOWFRO: string = projectConfig.chIdByName['snowfro']

  const CHANNEL_FOR_SALE_LISTINGS: string =
    projectConfig.chIdByName['for-sale-listings']
  const CHANNEL_TRADE_SWAPS: string = projectConfig.chIdByName['trade-swaps']
  const CHANNEL_BLOCK_TALK: string = projectConfig.chIdByName['block-talk']
  const CHANNEL_GENERAL: string = projectConfig.chIdByName['general']

  if (msgContentLowercase === 'gm') {
    const reactionEmoji = msg.guild?.emojis.cache.find(
      (emoji) => emoji.name === 'gmsquig'
    )
    if (reactionEmoji) {
      msg.react(reactionEmoji)
    }
    return null
  }

  // Some shared helper variables.
  const inHelpChannel: boolean = channelID == CHANNEL_HELP
  const mentionedArtBot: boolean =
    msgContentLowercase.includes(ARTBOT_USERNAME) ||
    msgContentLowercase.includes(ARTBOT_JR_USERNAME) ||
    msgContentLowercase.includes(artBotID)
  const mentionedArtBotOrInOrHelp: boolean = mentionedArtBot || inHelpChannel
  const containsQuestion: boolean = msgContentLowercase.includes('?')

  // Handle questions about the mint pausing for Chromie Squiggles.
  const inSnowfroChannel: boolean = channelID == CHANNEL_SNOWFRO
  // Both "pause" and "stopped" are keywords.
  const mentionsPause: boolean =
    msgContentLowercase.includes('pause') ||
    msgContentLowercase.includes('stopped')

  /*
   * Handle some common misspellings of "squiggle":
   * “squigle”, “squigglle”, “squiglle”
   */
  const messageMentionsSquiggle: boolean =
    msgContentLowercase.includes('squiggle') ||
    msgContentLowercase.includes('squigle') ||
    msgContentLowercase.includes('squigglle') ||
    msgContentLowercase.includes('squiglle')
  const squiggleChannelPauseMentioned: boolean =
    mentionsPause && inSnowfroChannel
  const artbotOrHelpChannelSquigglePauseMentioned: boolean =
    mentionsPause && messageMentionsSquiggle && mentionedArtBotOrInOrHelp
  if (
    squiggleChannelPauseMentioned ||
    artbotOrHelpChannelSquigglePauseMentioned
  ) {
    return SQUIGGLE_PAUSE_MESSAGE
  }

  if (
    channelID == CHANNEL_BLOCK_TALK &&
    (msgContentLowercase.includes('thanks') || // english v1
      msgContentLowercase.includes('thank you') || // english v2
      msgContentLowercase.includes('gracias') || // spanish
      msgContentLowercase.includes('domo arigato') || // japanese v1
      msgContentLowercase.includes('arigato') || // japanese v2
      msgContentLowercase.includes('merci') || // french
      msgContentLowercase.includes('grazie') || // italian
      msgContentLowercase.includes('obrigada') || // portugese
      msgContentLowercase.includes('dziekuje') || // polish
      msgContentLowercase.includes('tack') || // swedish
      msgContentLowercase.includes('tak') || // danish
      msgContentLowercase.includes('cheers') || // australian
      msgContentLowercase.includes('efcharistó') || // greek
      msgContentLowercase.includes('dyakuyu tobi') || // ukrainian
      msgContentLowercase.includes('blagodaryu vas') || // russian
      msgContentLowercase.includes('谢谢') || // simplified chinese
      msgContentLowercase.includes('謝謝') || // traditional chinese
      msgContentLowercase.includes('xie xie') || // pinyin chinese
      msgContentLowercase.includes('danke')) && // german
    (msgContentLowercase.includes('grant') ||
      msgContentLowercase.includes('grant-san'))
  ) {
    grantThanks++

    return new EmbedBuilder()
      .setColor(randomColor())
      .setDescription(
        `${msgAuthor} thanked Grant. Grant maintains Art Bot and has been thanked ${grantThanks} time(s) since last restart.`
      )
  }

  if (
    channelID == CHANNEL_BLOCK_TALK &&
    msgContentLowercase.includes('alias') &&
    containsQuestion &&
    mentionedArtBot
  ) {
    let msg = ''
    for (const [alias, name] of Object.entries(PROJECT_ALIASES)) {
      msg += `**${alias}** = ${name}
      `
    }
    return (
      new EmbedBuilder()
        .setTitle('Aliases you can use in `#` commands')
        // Set the color of the embed
        .setColor(ARTBOT_GREEN)
        // Set the main content of the embed
        .setDescription(msg)
    )
  }

  if (
    (channelID == CHANNEL_BLOCK_TALK || channelID == CHANNEL_GENERAL) &&
    containsQuestion &&
    mentionedArtBot
  ) {
    // Handle messages to the Insights API for AI responses
    return insightsBot.getInsightsApiResponse(msg)
  }

  if (
    (channelID == CHANNEL_FOR_SALE_LISTINGS ||
      channelID == CHANNEL_TRADE_SWAPS) &&
    msgContentLowercase.includes('otc')
  ) {
    return OTC_MESSAGE
  }

  /*
   * Only answer the following questions if ArtBlot is pinged directly
   * Or the message was sent in #general.
   */
  if (!mentionedArtBotOrInOrHelp) {
    return null
  }

  // Handle requests for help!
  if (msgContentLowercase.includes('gm')) {
    return 'gm'
  }

  // Handle requests for goose!
  if (msgContentLowercase.includes('goosemorning')) {
    return ':goose:'
  }

  // Handle requests for help!
  const mentionsHelp: boolean = msgContentLowercase.includes('help')
  if (containsQuestion && mentionsHelp) {
    return HELP_MESSAGE
  }

  // Handle requests for ArtBlocks info!
  const mentionsArtBlocks: boolean =
    msgContentLowercase.includes('artblocks') ||
    msgContentLowercase.includes('art blocks')
  if (containsQuestion && mentionsArtBlocks) {
    return ARTBLOCKS_MESSAGE
  }

  // Handle requests for GenArt info!
  const mentionsGenArt: boolean =
    msgContentLowercase.includes('genart') ||
    msgContentLowercase.includes('gen art')
  if (containsQuestion && mentionsGenArt) {
    return GENART_MESSAGE
  }

  // Handle requests for safety tips!
  const mentionsSafety: boolean =
    msgContentLowercase.includes('staysafe') ||
    msgContentLowercase.includes('safety')
  if (containsQuestion && mentionsSafety) {
    return SAFETY_MESSAGE
  }

  // Handle drop questions.
  const mentionsDrop: boolean = msgContentLowercase.includes('drop')
  if (containsQuestion && mentionsDrop) {
    return NEXT_DROP_MESSAGE
  }
  // Handle when people are confused about OpenSea is saying a project is curated
  const mentionedOpenSeaCurated: boolean =
    msgContentLowercase.includes('opensea') &&
    msgContentLowercase.includes('curated')
  if (mentionedArtBot && containsQuestion && mentionedOpenSeaCurated) {
    return OPENSEA_CURATED_MESSAGE
  }
  // Handle questions about Curated Projects vs. Artist Playground vs. Factory.
  const mentionedVerticals: boolean =
    msgContentLowercase.includes('curated') ||
    msgContentLowercase.includes('presents') ||
    msgContentLowercase.includes('heritage') ||
    msgContentLowercase.includes('explorations') ||
    msgContentLowercase.includes('collaborations')
  if (containsQuestion && mentionedVerticals) {
    return VERTICALS_MESSAGE
  }
  const mentionedV2: boolean = msgContentLowercase.includes('v2')
  if (containsQuestion && mentionedV2) {
    return V2_MESSAGE
  }

  // Handle OpenSea link requests.
  const mentionedOpenSea: boolean = msgContentLowercase.includes('opensea')
  if (containsQuestion && mentionedOpenSea) {
    return OPENSEA_LINKS_MESSAGE
  }

  // Handle how are you messages.
  const mentionedHowAreYou: boolean =
    msgContentLowercase.includes('how are you')
  if (mentionedArtBot && mentionedHowAreYou) {
    return (
      ARTBOT_HOW_ARE_YOU
        // Set the title of the field and append the message sender
        .setTitle(`Thank you for caring! ${msgAuthor}`)
        // Give the response a random color to make it fun
        .setColor(randomColor())
    )
  }

  // Handle application questions.
  const mentionedApplications: boolean =
    msgContentLowercase.includes('application') ||
    msgContentLowercase.includes('apply')
  if (containsQuestion && mentionedApplications) {
    return APPLICATIONS_OPEN_MESSAGE
  }
  // Handle metamask high gas questions.
  const mentionedHighGas: boolean =
    msgContentLowercase.includes('gas') && msgContentLowercase.includes('high')
  if (mentionedArtBot && containsQuestion && mentionedHighGas) {
    return MM_HIGH_GAS_MESSAGE
  }
  // Handle gas questions.
  const mentionedGas: boolean = msgContentLowercase.includes('gas')
  if (containsQuestion && mentionedGas) {
    if (msgContentLowercase.includes('price')) {
      return generateGasPriceMessage()
    }
    return GAS_MESSAGE
  }

  if (containsQuestion && msgContentLowercase.includes('hashtag')) {
    return HASHTAG_MESSAGE
  }
  if (msgContentLowercase.includes('leaderboard')) {
    if (
      msgContentLowercase.includes('all-time') ||
      msgContentLowercase.includes('alltime') ||
      msgContentLowercase.includes('all time')
    ) {
      triviaBot.leaderboardAllTime(msg)
    } else {
      triviaBot.leaderboard(msg)
    }
  }

  if (msgContentLowercase.includes('question')) {
    triviaBot.resurfaceQuestion(msg)
  }

  if (msgContentLowercase.includes('named')) {
    const projects = artIndexerBot.getProjectsWithNamedMappings()
    let msg = ''
    for (const project of projects) {
      msg += `${project.projectName} - ${project.artistName}
      `
    }
    return (
      new EmbedBuilder()
        // Set the title of the field
        .setTitle(`Here are all projects with named tokens / sets`)
        // Set the color of the embed
        .setColor(ARTBOT_GREEN)
        // Set the main content of the embed
        .setDescription(msg)
        .setFooter({
          text: 'Use `#named <project name>` to list the named tokens/sets for a specific project.',
        })
    )
  }
  return null
}
