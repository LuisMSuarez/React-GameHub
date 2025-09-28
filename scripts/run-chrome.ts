import { Builder, By, Key, until } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { ServiceBuilder } from "selenium-webdriver/chrome";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chromedriverPath = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cd = require("chromedriver");
    return cd.path || cd;
  } catch (e) {
    return undefined;
  }
})();

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
