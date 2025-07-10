import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { ProductPage } from '../pageObjects/productPage';
import { gotoAEUrl } from './commonUtils';

exports.customtest = base.test.extend({
  loginPage: async ({ page }, use) => {
    // go to the login page
    await gotoAEUrl(page, '/login');

    // Use the fixture value in the test.
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    // go to the product list page
    await gotoAEUrl(page, '/products');

    // Verify that all products are visible
    const productPage = new ProductPage(page);
    await productPage.validateAllProducts();

    // Use the fixture value in the test.
    await use(productPage);
  },
});
export { expect } from '@playwright/test';
