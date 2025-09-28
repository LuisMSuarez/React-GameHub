import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

async function runHeadlessChromeTest(): Promise<void> {
  const options = new chrome.Options().addArguments(
    "--headless",
    "--no-sandbox",
    "--disable-dev-shm-usage"
  );

  let driver: WebDriver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://www.google.com");
    const searchBox = await driver.findElement(By.name("q"));
    await searchBox.sendKeys("Selenium WebDriver", Key.RETURN);
    await driver.wait(until.titleContains("Selenium WebDriver"), 3000);
    console.log('✅ Test passed: Title contains "Selenium WebDriver"');
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    await driver.quit();
  }
}

runHeadlessChromeTest();
