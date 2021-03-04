const ringerSingles = require('./ringerSingles.json');
const ringerSets = require('./ringerSets.json');

function ringerSinglesTransform(messageContent) {
  if (messageContent.length <= 1) {
    return null;
  }

  let afterTheHash = messageContent.substring(1);
  let singleKeyString = afterTheHash.split(' ')[0];
  if (singleKeyString === null) {
    return null;
  }

  if (!ringerSingles.hasOwnProperty(singleKeyString)) {
    return null;
  }
  return `#${ringerSingles[singleKeyString]}`;
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
  if (setKeyString === null) {
    return null;
  }

  if (!ringerSets.hasOwnProperty(setKeyString)) {
    return null;
  }

  let setItems = ringerSets[setKeyString];
  let randomSetItem = setItems[Math.floor(Math.random() * setItems.length)];
  return `#${randomSetItem}`;
}

module.exports.ringerSinglesTransform = ringerSinglesTransform;
module.exports.ringerSetsTransform = ringerSetsTransform;
