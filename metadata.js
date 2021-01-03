const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.goto("https://api.artblocks.io/generator/8000224");
  let meta = await page.evaluate(() => init(tokenData.hash));
  let formData = await page.evaluate(() =>
    process_formdata(process_hash(tokenData.hash))
  );

  console.log(meta);
  console.log(formData);

  await browser.close();
})();
