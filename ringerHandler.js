
const ringerSingles = require('./ringerSingles.json');

function ringerSinglesTransform(messageContent) {
  if (messageContent.length <= 1) {
    return null;
  }

  let singleKeyString = messageContent.substring(1).split(' ')[0];
  if (singleKeyString === null) {
    return null;
  }

  if (ringerSingles.hasOwnProperty(singleKeyString)) {
    return ringerSingles[singleKeyString];
  }
  return null;
}

module.exports.ringerSinglesTransform = ringerSinglesTransform;
