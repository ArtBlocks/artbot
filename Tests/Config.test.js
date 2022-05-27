const CHANNELS = require('../ProjectConfig/channels.json')
const PARTNER_CONTRACTS = require('../ProjectConfig/partnerContracts.json')
const CORE_CONTRACTS = require('../ProjectConfig/coreContracts.json')

// Discord channels that do not have project specific bots
const NON_BOT_CHANNELS = [
  'factory-projects',
  'ab-art-chat',
  'prod_all_activity',
  'general',
  'help',
  'sales-feed',
  'block-talk',
  'listing-feed',
  'squiggle-listings',
  'for-sale-listings',
  'trade-swaps',
  'pbab-chat',
]

describe('testing config files', () => {
  test('testing channels.json', () => {
    Object.entries(CHANNELS).forEach(([chID, chParams]) => {
      expect(chParams.name).toBeDefined()
      expect(chParams.name.length).toBeGreaterThan(0)

      // Non-bot channels like '#general' do not have this section in config
      if (!NON_BOT_CHANNELS.includes(chParams.name)) {
        expect(chParams.projectBotHandlers).toBeDefined()
        expect(chParams.projectBotHandlers.default).toBeDefined()

        if (chParams.projectBotHandlers.stringTriggers) {
          Object.entries(chParams.projectBotHandlers.stringTriggers).forEach(
            ([proj, triggers]) => {
              expect(proj).toBeDefined()
              expect(proj.length).toBeGreaterThan(0)
              expect(triggers).toBeDefined()
              expect(triggers.length).toBeGreaterThan(0)
              for (let i = 0; i < triggers.length; i++) {
                expect(triggers[i]).toBeDefined()
                expect(triggers[i].length).toBeGreaterThan(0)
              }
            }
          )
        }
      }
    })
  })
  test('testing partnerContracts.json', () => {
    Object.entries(PARTNER_CONTRACTS).forEach(([name, contractAddr]) => {
      expect(contractAddr).toBeDefined()
      expect(contractAddr.length).toBeGreaterThan(0)
      expect(contractAddr.toLowerCase()).toBe(contractAddr)
    })
  })
  test('testing coreContracts.json', () => {
    Object.entries(CORE_CONTRACTS).forEach(([name, contractAddr]) => {
      expect(contractAddr).toBeDefined()
      expect(contractAddr.length).toBeGreaterThan(0)
      expect(contractAddr.toLowerCase()).toBe(contractAddr)
    })
  })
})
