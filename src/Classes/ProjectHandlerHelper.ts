import { EmbedBuilder } from 'discord.js'

export class ProjectHandlerHelper {
  singles?: { [id: string]: string }
  sets?: { [id: string]: number[] }
  constructor(
    singles?: { [id: string]: string },
    sets?: { [id: string]: number[] }
  ) {
    this.singles = singles
    this.sets = sets
  }

  listMappings() {
    const message = new EmbedBuilder()
      // Set the title of the field.
      .setTitle('Available Named Pieces / Sets')
      .setDescription(
        'These are special tokens or sets of tokens that have been given a name by the community! Try them out here with `#<token/set>`'
      )

    let singles = ''
    let sets = ''
    if (this.singles) {
      for (const [singleName] of Object.entries(this.singles)) {
        singles += `${singleName}
      `
      }
      message.addFields({ name: 'Tokens', value: singles })
    }

    if (this.sets) {
      for (const [setName] of Object.entries(this.sets)) {
        sets += `${setName}
      `
      }
      message.addFields({ name: 'Sets', value: sets })
    }

    if (!singles && !sets) {
      message.addFields({
        name: 'No named tokens or sets!',
        value:
          "I don't have any named tokens or sets for this project yet! [You can propose some here](https://github.com/ArtBlocks/artbot/issues/new/choose)",
      })
    }

    return message
  }

  transform(messageContent: string) {
    return (
      (this.singles && this._singlesTransform(messageContent)) ||
      (this.sets && this._setsTransform(messageContent)) ||
      messageContent
    )
  }

  _singlesTransform(messageContent: string) {
    if (messageContent.length <= 1 || !this.singles) {
      return null
    }

    const afterTheHash = messageContent.substring(1)
    const singleKeyString = afterTheHash.split(' ')[0]
    if (singleKeyString === null || !singleKeyString) {
      return null
    }

    const singleKeyStringLowercase = singleKeyString.toLowerCase()
    if (!this.singles[singleKeyStringLowercase]) {
      return null
    }
    return `#${this.singles[singleKeyStringLowercase]}`
  }

  _setsTransform(messageContent: string) {
    if (messageContent.length <= 1 || !this.sets) {
      return null
    }

    const afterTheHash = messageContent.substring(1)

    const setKeyString = afterTheHash.split(' ')[0]
    if (setKeyString === null || !setKeyString) {
      return null
    }

    const setKeyStringLowercase = setKeyString.toLowerCase()
    if (!this.sets[setKeyStringLowercase]) {
      return null
    }

    const setItems = this.sets[setKeyStringLowercase]
    const randomSetItem = setItems[Math.floor(Math.random() * setItems.length)]
    return `#${randomSetItem}`
  }

  hasNamed() {
    return !!this.singles || !!this.sets
  }
}

module.exports.ProjectHandlerHelper = ProjectHandlerHelper
