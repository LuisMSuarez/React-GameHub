// tests/browse-game.test.ts
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { By, Key, until, WebDriver } from "selenium-webdriver";
import { createChromeDriver } from "./driver";

// to run: npm test -- src/tests/sample.test.ts

describe("browse game", () => {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createChromeDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("should search and interact with game UI", async () => {
    await driver.get("http://localhost:5173/");

    // Search for Portal 2 game
    const searchInput = await driver.findElement(By.css(".chakra-input"));
    await searchInput.click();
    await searchInput.sendKeys("portal 2", Key.ENTER);

    // Wait for the game to appear in the game grid
    const portal2Link = await driver.wait(
      until.elementLocated(By.xpath('//a[text()="Portal 2"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(portal2Link), 5000);
    await portal2Link.click();

    // In the game detail page, wait until the game header is displayed
    const portal2Heading = await driver.wait(
      until.elementLocated(
        By.xpath('//h2[normalize-space(text())="Portal 2"]')
      ),
      10000
    );
    await driver.wait(until.elementIsVisible(portal2Heading), 5000);

    // Check the url
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain("portal-2");
  }, 30000);
});
