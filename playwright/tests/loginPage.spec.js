import { customtest, expect } from '../utils/fixtures';

customtest(
  'Test case 1: Login with correct user in login page.',
  async ({ page, loginPage }) => {
    await loginPage.login('testops@test.com', 'password123');
    await expect(page.locator('.shop-menu li a').last()).toHaveText(
      ' Logged in as testOps',
    );
    await expect(page.locator("li [href='/logout']")).toHaveText(' Logout');
  },
);
