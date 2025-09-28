import { describe, it, expect } from "vitest";
import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Google Search (Selenium)", () => {
  it("should return results for Selenium WebDriver", async () => {
    const options = new chrome.Options();
    options.addArguments(
      "--headless",
      "--no-sandbox",
      "--disable-dev-shm-usage"
    );
    options.setChromeBinaryPath(
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    );
    options.addArguments("--verbose");
    options.setChromeLogFile("chromedriver.log");

    console.log("Launching Chrome...");
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    console.log("Chrome launched. Navigating...");

    try {
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
  }, 60000); // ⏱️ Increase timeout for browser tests
});
