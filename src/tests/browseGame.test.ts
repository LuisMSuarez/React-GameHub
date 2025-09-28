// tests/browse-game.test.ts
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { By, Key, until, WebDriver } from "selenium-webdriver";
import { createChromeDriver } from "./driver";
import { waitAndClick } from "./utils";

// to run: npm test -- src/tests/browseGame.test.ts

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
    const searchInput = await driver.wait(
      until.elementLocated(By.css(".chakra-input")),
      10000
    );
    await driver.wait(until.elementIsVisible(searchInput), 5000);
    await searchInput.click();
    await searchInput.sendKeys("portal 2", Key.ENTER);

    // Wait for the game to appear in the game grid
    await waitAndClick(driver, By.xpath('//a[text()="Portal 2"]'));

    // In the game detail page, wait until the game header is displayed
    const portal2Heading = await driver.wait(
      until.elementLocated(
        By.xpath('//h2[normalize-space(text())="Portal 2"]')
      ),
      10000
    );
    await driver.wait(until.elementIsVisible(portal2Heading), 5000);
    const headingText = await portal2Heading.getText();
    expect(headingText).toBe("Portal 2");

    // Check the url
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain("portal-2");
  }, 30000);
});
