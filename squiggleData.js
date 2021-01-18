async function squig(_token) {
  let projectId = 5;
  let hashPairs = [];
  let decPairs = [];
  let tokenData = _token;

  let features = [];
  let steps;

  console.log("tokenData:" + tokenData);
  if (projectId < 3) {
    //tokenData=this.props.tokenHashes;
    let numHashes = tokenData.length;
    for (let i = 0; i < numHashes; i++) {
      for (let j = 0; j < 32; j++) {
        hashPairs.push(tokenData[i].slice(2 + j * 2, 4 + j * 2));
      }
    }
    decPairs = hashPairs.map((x) => {
      return parseInt(x, 16);
    });

    console.log(decPairs, "THE decARRAY");
  } else {
    tokenData = this.props.tokenHashes;
    for (let j = 0; j < 32; j++) {
      hashPairs.push(tokenData.slice(2 + j * 2, 4 + j * 2));
      console.log(decPairs, "THE decARRAY");
    }
  }
  decPairs = hashPairs.map((x) => {
    return parseInt(x, 16);
  });

  if (decPairs[28] < 3) {
    features.push("HyperRainbow");
  } else if (
    Math.floor(decPairs[26].map(0, 255, 12, 20)) === 14 &&
    Math.floor(decPairs[28].map(0, 255, 5, 50)) === 11 &&
    decPairs[22] >= 32 &&
    decPairs[31] >= 35
  ) {
    features.push("Perfect Spectrum");
  }

  if (decPairs[22] < 32 && decPairs[31] < 35) {
    features.push("Pipe");
    steps = 50;
  } else if (decPairs[31] < 35) {
    features.push("Slinky");
    steps = 50;
  }
  if (decPairs[22] < 32 && decPairs[31] >= 35) {
    features.push("Fuzzy");
    steps = 1000;
  }
  if (decPairs[23] < 15) {
    if (features.includes("Fuzzy")) {
    } else if (!features.includes("Slinky") && !features.includes("Pipe")) {
      features.push("Bold");
    }
  }
  if (decPairs[24] < 30) {
    if (
      features.includes("Bold") ||
      features.includes("Slinky") ||
      features.includes("Fuzzy")
    ) {
    } else {
      features.push("Ribbed [Color: " + decPairs[25] + "]");
    }
  }
  if (decPairs[22] >= 32 && decPairs[31] >= 35) {
    steps = 200;
  }
  features.push("Starting Color: " + decPairs[29]);
  if (decPairs[28] < 3) {
    features.push(
      "End Color: " +
        ((decPairs[29] +
          (Math.floor(decPairs[26].map(0, 255, 12, 20)) * steps) / 0.5) %
          255)
    );
    features.push("Color Spread: 0.5");
  } else {
    features.push(
      "End Color: " +
        Math.floor(
          (decPairs[29] +
            (Math.floor(decPairs[26].map(0, 255, 12, 20)) * steps) /
              Math.floor(decPairs[28].map(0, 255, 5, 50))) %
            255
        )
    );
    features.push(
      "Color Spread: " + Math.floor(decPairs[28].map(0, 255, 5, 50))
    );
  }

  if (decPairs[30] < 128) {
    features.push("Color Direction: Reverse");
  } else {
    features.push("Color Direction: Forward");
  }
  features.push("Height: " + Math.floor(decPairs[27].map(0, 255, 3, 4)));
  features.push("Segments: " + Math.floor(decPairs[26].map(0, 255, 12, 20)));
  features.push("Steps Between Segments: " + steps);

  return features;
}

module.exports = { squig };
