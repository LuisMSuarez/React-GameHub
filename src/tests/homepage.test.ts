import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { until, WebDriver } from "selenium-webdriver";
import { createChromeDriver } from "./driver";

// to run: npm test -- src/tests/sample.test.ts
describe("Navigate to HomePage", () => {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createChromeDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("should display appropriate title", async () => {
    // Navigate directly to the search results page to avoid UI flakiness and consent overlays
    await driver.get("http://localhost:5173");
    await driver.wait(until.titleContains("Gamers' Hub"), 3000);
    const title = await driver.getTitle();
    expect(title).toContain("Gamers' Hub");
  }, 30000); // ⏱️ Increase timeout for browser tests
});
