const { init } = require("./singularity");
const fetch = require("node-fetch");
const fs = require("fs");

var _final = [];

async function sing(val) {
  console.log(val);
  let url = val + 8000000;
  await fetch("https://api.artblocks.io/token/" + url)
    .then((response) => response.json())
    .then((data) => parseData(data["token hash"], val + 8000000));
}

async function parseData(hash_token, val) {
  await init(hash_token).then((item) => {
    var _data = item.map((item) => item.split(" "));
    _data.push(["tokenID", val]);
    var merged = [].concat.apply([], _data);
    _final.push(merged);
  });
}

async function csv() {
  let csvContent = _final.map((e) => e.join(",")).join("\n");
  fs.writeFileSync("sing2.csv", csvContent);
}

async function begin() {
  for (let i = 0; i < 5; i++) {
    await sing(i);
  }
  await csv();
}

begin();
