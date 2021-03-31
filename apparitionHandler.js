const apparitionSingles = require('./apparitionSingles.json');
const apparitionSets = require('./apparitionSets.json');

function apparitionSinglesTransform(messageContent) {
  if (messageContent.length <= 1) {
    return null;
  }

  let afterTheHash = messageContent.substring(1);
  let singleKeyString = afterTheHash.split(' ')[0];
  if (singleKeyString === null || !singleKeyString) {
    return null;
  }

  let singleKeyStringLowercase = singleKeyString.toLowerCase();
  if (!apparitionSingles.hasOwnProperty(singleKeyStringLowercase)) {
    return null;
  }
  return `#${apparitionSingles[singleKeyStringLowercase]}`;
}

function apparitionSetsTransform(messageContent) {
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
  if (!apparitionSets.hasOwnProperty(setKeyStringLowercase)) {
    return null;
  }

  let setItems = apparitionSets[setKeyStringLowercase];
  let randomSetItem = setItems[Math.floor(Math.random() * setItems.length)];
  return `#${randomSetItem}`;
}

module.exports.apparitionSinglesTransform = apparitionSinglesTransform;
module.exports.apparitionSetsTransform = apparitionSetsTransform;
