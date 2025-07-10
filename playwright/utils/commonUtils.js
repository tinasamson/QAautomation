import { expect } from '@playwright/test';

export async function randomNum(totalNum) {
  const randomNum = Math.floor(Math.random() * totalNum);
  return randomNum;
}

export async function gotoAEUrl(page, route) {
  await page.goto(`https://www.automationexercise.com${route}`);
}

export async function waitUrlToLoad(page, regex) {
  await expect(page).toHaveURL(regex);
}
