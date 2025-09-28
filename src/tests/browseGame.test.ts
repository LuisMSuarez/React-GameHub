// tests/browse-game.test.ts
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
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

describe("browse game", () => {
  let driver: WebDriver;

  beforeEach(async () => {
    const options = new chrome.Options();
    options.addArguments(
      // "--headless=new",
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
    driver = await builder.build();
    console.log("Chrome launched. Navigating...");
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("should search and interact with game UI", async () => {
    await driver.get("http://localhost:5173/");
    await driver.manage().window().setRect({ width: 1514, height: 966 });

    const searchInput = await driver.findElement(By.css(".chakra-input"));
    await searchInput.click();
    await searchInput.sendKeys("portal 2", Key.ENTER);

    const anchorSelector = By.css('a[href="/games/portal-2"] > img');

    // Wait for the image to be present in the DOM
    const firstGameImage = await driver.wait(
      until.elementLocated(anchorSelector),
      10000
    );

    // Wait for it to be visible
    await driver.wait(until.elementIsVisible(firstGameImage), 5000);

    await firstGameImage.click();

    const tooltipTrigger = await driver.findElement(
      By.css("#tooltip\\3A\\ABr5i\\BB\\3Atrigger > svg")
    );
    await tooltipTrigger.click();

    // Optional assertion example
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain("portal-2"); // Adjust based on expected navigation
  }, 30000);
});
