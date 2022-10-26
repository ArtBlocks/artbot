/* eslint-disable no-prototype-builtins */
const { MessageEmbed } = require('discord.js')
class ProjectHandlerHelper {
  constructor(singles, sets) {
    this.singles = singles
    this.sets = sets
  }

  listMappings() {
    let message = new MessageEmbed()
      // Set the title of the field.
      .setTitle('Available Named Pieces / Sets')
      .setDescription(
        'These are special tokens or sets of tokens that have been given a name by the community! Try them out here with `#<token>` or `#? <set>`'
      )

    let singles = ''
    let sets = ''
    if (this.singles) {
      for (const [singleName] of Object.entries(this.singles)) {
        singles += `${singleName}
      `
      }
      message.addField('Tokens', singles)
    }

    if (this.sets) {
      for (const [setName] of Object.entries(this.sets)) {
        sets += `${setName}
      `
      }
      message.addField('Sets', sets)
    }

    if (!singles && !sets) {
      message.addField(
        'No named tokens or sets!',
        "I don't have any named tokens or sets for this project yet! [You can propose some here](https://github.com/ArtBlocks/artbot/issues/new/choose)"
      )
    }

    return message
  }

  transform(messageContent) {
    return (
      (this.singles && this._singlesTransform(messageContent)) ||
      (this.sets && this._setsTransform(messageContent)) ||
      messageContent
    )
  }

  _singlesTransform(messageContent) {
    if (messageContent.length <= 1) {
      return null
    }

    const afterTheHash = messageContent.substring(1)
    const singleKeyString = afterTheHash.split(' ')[0]
    if (singleKeyString === null || !singleKeyString) {
      return null
    }

    const singleKeyStringLowercase = singleKeyString.toLowerCase()
    if (!this.singles.hasOwnProperty(singleKeyStringLowercase)) {
      return null
    }
    return `#${this.singles[singleKeyStringLowercase]}`
  }

  _setsTransform(messageContent) {
    if (messageContent.length <= 1) {
      return null
    }

    const afterTheHash = messageContent.substring(1)
    if (!(afterTheHash[0] == '?')) {
      return null
    }

    const setKeyString = afterTheHash.split(' ')[1]
    if (setKeyString === null || !setKeyString) {
      return null
    }

    const setKeyStringLowercase = setKeyString.toLowerCase()
    if (!this.sets.hasOwnProperty(setKeyStringLowercase)) {
      return null
    }

    const setItems = this.sets[setKeyStringLowercase]
    const randomSetItem = setItems[Math.floor(Math.random() * setItems.length)]
    return `#${randomSetItem}`
  }
}

module.exports.ProjectHandlerHelper = ProjectHandlerHelper
