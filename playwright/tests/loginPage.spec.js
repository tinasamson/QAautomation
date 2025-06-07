import { expect } from '@playwright/test';
import { customtest } from '../utils/test-base';

customtest('Test case 1: Login with correct user in login page.', async ({ loginPage, page}) => {
    await loginPage.login("testops@test.com", "password123")
    await expect(page.locator(".shop-menu li a").last()).toHaveText(" Logged in as testOps");
    await expect(page.locator("li [href='/logout']")).toHaveText(" Logout");
  });