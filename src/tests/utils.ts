import { By, until, WebDriver } from "selenium-webdriver";

export async function waitAndClick(
  driver: WebDriver,
  selector: By,
  timeout = 30000
) {
  const el = await driver.wait(until.elementLocated(selector), timeout); // element in the DOM
  await driver.wait(until.elementIsVisible(el), timeout / 2); // element fully rendered & visible
  await el.click();
}
