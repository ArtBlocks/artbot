const watercolorDreamsSingles = require('./watercolorDreamsSingles.json');
const watercolorDreamsSets = require('./watercolorDreamsSets.json');

function watercolorDreamsSinglesTransform(messageContent) {
  if (messageContent.length <= 1) {
    return null;
  }

  let afterTheHash = messageContent.substring(1);
  let singleKeyString = afterTheHash.split(' ')[0];
  if (singleKeyString === null || !singleKeyString) {
    return null;
  }

  let singleKeyStringLowercase = singleKeyString.toLowerCase();
  if (!watercolorDreamsSingles.hasOwnProperty(singleKeyStringLowercase)) {
    return null;
  }
  return `#${watercolorDreamsSingles[singleKeyStringLowercase]}`;
}

function watercolorDreamsSetsTransform(messageContent) {
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
  if (!watercolorDreamsSets.hasOwnProperty(setKeyStringLowercase)) {
    return null;
  }

  let setItems = watercolorDreamsSets[setKeyStringLowercase];
  let randomSetItem = setItems[Math.floor(Math.random() * setItems.length)];
  return `#${randomSetItem}`;
}

module.exports.watercolorDreamsSinglesTransform = watercolorDreamsSinglesTransform;
module.exports.watercolorDreamsSetsTransform = watercolorDreamsSetsTransform;
