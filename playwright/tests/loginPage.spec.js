import { test, expect } from '@playwright/test';

test('Test case 1: Login with correct user in login page.', async ({ page}) => {
    await page.goto("https://www.automationexercise.com/login");
    await page.locator('[data-qa="login-email"]').fill("testops@test.com");
    await page.locator('[data-qa="login-password"]').fill("password123");
    await page.locator('[data-qa="login-button"]').click();
    await expect(page.locator(".shop-menu li a").last()).toHaveText(" Logged in as testOps");
    await expect(page.locator("li [href='/logout']")).toHaveText(" Logout");
  });