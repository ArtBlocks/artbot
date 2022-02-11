process.env.METADATA_REFRESH_INTERVAL_MINUTES = 60;

const { FactoryBot } = require("./FactoryBot");

const bot = new FactoryBot();

setTimeout(() => {
  console.log(Object.keys(bot.projects).join("\n"));

  console.assert(
    bot.toProjectKey("ensō") === "enso",
    "project keys are deburrred"
  );
  console.assert(
    bot.toProjectKey("timeatlas🌐") === "timeatlas",
    "project keys have no emoji"
  );
  console.assert(
    bot.toProjectKey("♫bytebeats") === "bytebeats",
    "project keys have no unicode"
  );
  console.assert(
    bot.toProjectKey("[dis]entanglement") === "disentanglement",
    "project keys have no punctuation"
  );

  console.log("Done testing!");
}, 1000);
