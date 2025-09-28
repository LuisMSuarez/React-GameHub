// utils/driver.ts
import { Builder } from "selenium-webdriver";
import chrome, { ServiceBuilder } from "selenium-webdriver/chrome";

// Use chromedriver package binary when available
const chromedriverPath = (() => {
  try {
    // chromedriver package exposes the binary path
    const cd = require("chromedriver");
    return cd.path || cd;
  } catch (e) {
    return undefined;
  }
})();

export async function createChromeDriver() {
  const options = new chrome.Options();
  options.addArguments(
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage"
  );

  console.log("Launching Chrome...");
  const builder = new Builder().forBrowser("chrome").setChromeOptions(options);
  if (chromedriverPath) {
    const service = new ServiceBuilder(chromedriverPath);
    builder.setChromeService(service);
    console.log("Using chromedriver at:", chromedriverPath);
  } else {
    console.log(
      "No chromedriver package found; relying on system chromedriver."
    );
  }
  const driver = await builder.build();
  console.log("Chrome launched. Navigating...");
  return driver;
}
