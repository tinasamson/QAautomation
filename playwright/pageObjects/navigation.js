import { expect } from '@playwright/test';

export class Navigation {
  constructor(page) {
    this.page = page;
  }
  
  async gotoAEUrl(route) {
    await this.page.goto(`https://www.automationexercise.com${route}`);
  }

  async waitUrlToLoad(route){
    const regexPath = new RegExp(`${route}`, "d");
    await expect(this.page).toHaveURL(regexPath);
  }
}