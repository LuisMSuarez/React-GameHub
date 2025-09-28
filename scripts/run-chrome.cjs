const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
let chromedriverPath;
try {
  const cd = require("chromedriver");
  chromedriverPath = cd.path || cd;
} catch (e) {
  chromedriverPath = undefined;
}

(async function run() {
  const options = new chrome.Options();
  options.addArguments(
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage"
  );
  try {
    const builder = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options);
    if (chromedriverPath) {
      const service = new ServiceBuilder(chromedriverPath);
      builder.setChromeService(service);
      console.log("Using chromedriver at:", chromedriverPath);
    }
    const driver = await builder.build();
    console.log("Chrome launched. Navigating...");
    await driver.get("https://www.google.com");
    console.log("Title:", await driver.getTitle());
    await driver.quit();
  } catch (e) {
    console.error("Error launching chrome:", e);
    process.exit(1);
  }
})();
