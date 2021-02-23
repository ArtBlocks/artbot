require("dotenv").config();
const {
  Client,
  MessageEmbed
} = require("discord.js");
const Web3 = require("web3");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const bot = new Client();
const TOKEN = process.env.TOKEN;
const CHANNEL_SING = process.env.CHANNEL_SING;
const CHANNEL_TRADE = process.env.CHANNEL_TRADE;
const CHANNEL_IGNITION = process.env.CHANNEL_IGNITION;
const CHANNEL_SQUIG = process.env.CHANNEL_SQUIG;
const CHANNEL_RINGERS = process.env.CHANNEL_RINGERS;
const SERVER = process.env.SERVER;

const os = require("./osEvent");
const CuratedProjectBot = require("./CuratedProjectBot").CuratedProjectBot;

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

bot.login(TOKEN);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/update", function(req, res) {
  console.log("received update with body:\n", JSON.stringify(req.body, null, 2), "\n");

  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true
  });
});

app.get("/update", function(req, res) {
  console.log("received get with body:\n", req.body, "\n");

  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true
  });
});

app.listen(PORT, function() {
  console.log("Server is listening on port ", PORT);
});

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

let singularityBot = new CuratedProjectBot(
  8000000,
  "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270",
  1024,
  "Singularity"
);
let ignitionBot = new CuratedProjectBot(
  9000000,
  "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270",
  512,
  "Ignition"
);
let squiggleBot = new CuratedProjectBot(
  0,
  "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a",
  10000,
  "Chromie Squiggle"
);
let ringersBot = new CuratedProjectBot(
  13000000,
  "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270",
  1000,
  "Ringers"
);

bot.on("message", (msg) => {
  if (msg.content.startsWith("#")) {
    switch (msg.channel.id) {
      case CHANNEL_SING:
        singularityBot.getData(msg, msg.content);
        break;
      case CHANNEL_IGNITION:
        ignitionBot.getData(msg, msg.content);
        break;
      case CHANNEL_SQUIG:
        squiggleBot.getData(msg, msg.content);
        break;
      case CHANNEL_RINGERS:
        ringersBot.getData(msg, msg.content);
        break;
      default:
        console.log(`Unknown channel ID: ${msg.channel.id}`);
        break;
    }
  }
});

setInterval(os.openseaEvent, 60 * 1000, bot);
