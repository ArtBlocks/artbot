process.env.METADATA_REFRESH_INTERVAL_MINUTES = 60;

const { FactoryBot } = require("./FactoryBot");

const bot = new FactoryBot();

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
console.log("Done testing bot.toProjectKey()")

bot.initializeCb = async () => {
  bot.initializeCb = null

  delete bot.projects.facets
  await bot.initialize()

  console.log(Object.keys(bot.projects).join("\n"));

  console.assert(
    "facets" in bot.projects,
    "curation status cache works"
  )

  console.assert(
    !("theyoniproject" in bot.projects),
    "non-public projects are excluded"
  )

  console.log("Done testing!");
}
