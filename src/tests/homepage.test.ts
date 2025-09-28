import { describe, it, expect } from "vitest";
import { Builder, until } from "selenium-webdriver";
import chrome, { ServiceBuilder } from "selenium-webdriver/chrome";

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

describe("Navigate to HomePage", () => {
  it("should display appropriate title", async () => {
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
      await driver.get("http://localhost:5173");
      await driver.wait(until.titleContains("Gamers' Hub"), 3000);
      const title = await driver.getTitle();
      expect(title).toContain("Gamers' Hub");
    } finally {
      await driver.quit();
    }
  }, 30000); // ⏱️ Increase timeout for browser tests
});
