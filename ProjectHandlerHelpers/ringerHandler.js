const ringerSingles = require('./ringerSingles.json');
const ringerSets = require('./ringerSets.json');

function ringerSinglesTransform(messageContent) {
  if (messageContent.length <= 1) {
    return null;
  }

  let afterTheHash = messageContent.substring(1);
  let singleKeyString = afterTheHash.split(' ')[0];
  if (singleKeyString === null || !singleKeyString) {
    return null;
  }

  let singleKeyStringLowercase = singleKeyString.toLowerCase();
  if (!ringerSingles.hasOwnProperty(singleKeyStringLowercase)) {
    return null;
  }
  return `#${ringerSingles[singleKeyStringLowercase]}`;
}

function ringerSetsTransform(messageContent) {
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
  if (!ringerSets.hasOwnProperty(setKeyStringLowercase)) {
    return null;
  }

  let setItems = ringerSets[setKeyStringLowercase];
  let randomSetItem = setItems[Math.floor(Math.random() * setItems.length)];
  return `#${randomSetItem}`;
}

module.exports.ringerSinglesTransform = ringerSinglesTransform;
module.exports.ringerSetsTransform = ringerSetsTransform;
