const { ArtIndexerBot } = require('../Classes/ArtIndexerBot')

let bot
beforeAll(async () => {
  bot = new ArtIndexerBot()
  await bot.init(true)
})

describe('testing project key deburring', () => {
  test('project keys are deburrred', () => {
    expect(bot.toProjectKey('ensō')).toBe('enso')
  })

  test('project keys have no emoji', () => {
    expect(bot.toProjectKey('timeatlas🌐')).toBe('timeatlas')
  })

  test('project keys have no unicode', () => {
    expect(bot.toProjectKey('♫bytebeats')).toBe('bytebeats')
  })

  test('project keys have no punctuation', () => {
    expect(bot.toProjectKey('[dis]entanglement')).toBe('disentanglement')
  })
})

describe('testing bot init and bot.projects', () => {
  beforeAll(async () => {
    delete bot.projects.facets
    await bot.init()
  })
  test('test curation status cache', () => {
    expect(Object.keys(bot.projects)).toContain('facets')
  })

  test('test exclusion of non-public projects', () => {
    expect(Object.keys(bot.projects)).not.toContain('theyoniproject')
  })
})
