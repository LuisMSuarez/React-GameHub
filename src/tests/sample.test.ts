import { describe, it, expect } from "vitest";
import { Builder, By, until, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { ServiceBuilder } from "selenium-webdriver/chrome";

// to run: npm test -- src/tests/sample.test.ts
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

// sample test, to be skipped, replace with describe()
describe.skip("Google Search (Selenium)", () => {
  it("should return results for Selenium WebDriver", async () => {
    const options = new chrome.Options();
    options.addArguments(
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage"
    );

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
      await driver.get("https://www.google.com");
      await driver
        .findElement(By.name("q"))
        .sendKeys("Selenium WebDriver", Key.RETURN);
      await driver.wait(until.titleContains("Selenium WebDriver"), 3000);
      const title = await driver.getTitle();
      expect(title).toContain("Selenium WebDriver");
    } finally {
      await driver.quit();
    }
  }, 30000); // ⏱️ Increase timeout for browser tests
});
