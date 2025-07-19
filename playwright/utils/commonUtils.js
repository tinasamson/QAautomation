import { expect } from '@playwright/test';

export async function randomNum(totalNum) {
  const randomNum = Math.floor(Math.random() * totalNum);
  return randomNum;
}

export async function twoRandomNum(totalNum) {
  let randomNum1 = Math.floor(Math.random() * totalNum);
  let randomNum2 = Math.floor(Math.random() * totalNum);
  do {
    randomNum2 = Math.floor(Math.random() * totalNum);
  } while (randomNum1 === randomNum2);
  const randomList = [randomNum1, randomNum2];
  return randomList;
}

export async function gotoAEUrl(page, route) {
  await page.goto(`https://www.automationexercise.com${route}`);
}

export async function waitUrlToLoad(page, regex) {
  await expect(page).toHaveURL(regex);
}
