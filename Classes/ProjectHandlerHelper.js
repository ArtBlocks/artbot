class ProjectHandlerHelper {
  constructor(singles, sets) {
    this.singles = singles;
    this.sets = sets;
  }

  singlesTransform(messageContent) {
    if (messageContent.length <= 1) {
      return null;
    }

    let afterTheHash = messageContent.substring(1);
    let singleKeyString = afterTheHash.split(' ')[0];
    if (singleKeyString === null || !singleKeyString) {
      return null;
    }

    let singleKeyStringLowercase = singleKeyString.toLowerCase();
    if (!this.singles.hasOwnProperty(singleKeyStringLowercase)) {
      return null;
    }
    return `#${this.singles[singleKeyStringLowercase]}`;
  }

  setsTransform(messageContent) {
    if (messageContent.length <= 1) {
      return null;
    }

    let afterTheHash = messageContent.substring(1);
    if (!(afterTheHash[0] == "?")) {
      return null;
    }

    let setKeyString = afterTheHash.split(' ')[1];
    if (setKeyString === null || !setKeyString) {
      return null;
    }

    let setKeyStringLowercase = setKeyString.toLowerCase();
    if (!this.sets.hasOwnProperty(setKeyStringLowercase)) {
      return null;
    }

    let setItems = this.sets[setKeyStringLowercase];
    let randomSetItem = setItems[Math.floor(Math.random() * setItems.length)];
    return `#${randomSetItem}`;
  }
}

module.exports.ProjectHandlerHelper = ProjectHandlerHelper;
