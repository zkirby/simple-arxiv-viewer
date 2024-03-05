import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://arxiv.org/list/cs.HC/recent");

  const elements = await page.$$("div > .list-title");

  for (let i = 0; i < elements.length; i++) {
    console.log(await elements[i].evaluate((el) => el.textContent));
  }

  await browser.close();
})();
