class ProjectHandlerHelper {
  constructor(singles, sets) {
    this.singles = singles;
    this.sets = sets;
  }

  singlesTransform(messageContent) {
    if (messageContent.length <= 1) {
      return null;
    }

    const afterTheHash = messageContent.substring(1);
    const singleKeyString = afterTheHash.split(' ')[0];
    if (singleKeyString === null || !singleKeyString) {
      return null;
    }

    const singleKeyStringLowercase = singleKeyString.toLowerCase();
    if (!this.singles.hasOwnProperty(singleKeyStringLowercase)) {
      return null;
    }
    return `#${this.singles[singleKeyStringLowercase]}`;
  }

  setsTransform(messageContent) {
    if (messageContent.length <= 1) {
      return null;
    }

    const afterTheHash = messageContent.substring(1);
    if (!(afterTheHash[0] == '?')) {
      return null;
    }

    const setKeyString = afterTheHash.split(' ')[1];
    if (setKeyString === null || !setKeyString) {
      return null;
    }

    const setKeyStringLowercase = setKeyString.toLowerCase();
    if (!this.sets.hasOwnProperty(setKeyStringLowercase)) {
      return null;
    }

    const setItems = this.sets[setKeyStringLowercase];
    const randomSetItem = setItems[Math.floor(Math.random() * setItems.length)];
    return `#${randomSetItem}`;
  }
}

module.exports.ProjectHandlerHelper = ProjectHandlerHelper;
