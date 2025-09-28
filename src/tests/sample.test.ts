import { describe, it, expect } from "vitest";
import { Builder, By, Key, until } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { ServiceBuilder } from "selenium-webdriver/chrome";
// Use chromedriver package binary when available
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chromedriverPath = (() => {
  try {
    // chromedriver package exposes the binary path
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cd = require("chromedriver");
    return cd.path || cd;
  } catch (e) {
    return undefined;
  }
})();

describe("Google Search (Selenium)", () => {
  it("should return results for Selenium WebDriver", async () => {
    const options = new chrome.Options();
    options.addArguments(
      // "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage"
    );
    options.addArguments("--verbose");
    options.setChromeLogFile("chromedriver.log");

    console.log("Launching Chrome...");
    const builder = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options);
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

    try {
      // Navigate directly to the search results page to avoid UI flakiness and consent overlays
      await driver.get("https://www.google.com/search?q=Selenium+WebDriver");
      // Wait for the search results container to appear
      await driver.wait(until.elementLocated(By.id("search")), 15000);
      const title = await driver.getTitle();
      expect(title).toContain("Selenium WebDriver");
    } finally {
      await driver.quit();
    }
  }, 60000); // ⏱️ Increase timeout for browser tests
});
