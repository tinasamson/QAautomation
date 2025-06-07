import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { Navigation } from '../pageObjects/navigation';
import { ProductPage } from '../pageObjects/productPage';

exports.customtest = base.test.extend({
  navigation: async ({page}, use) => {
    await use(new Navigation(page));
  },
  loginPage: async ({page}, use) => {
    // go to the login page
    const navigateTo = new Navigation(page);
    await navigateTo.gotoAEUrl('/login');

    // Use the fixture value in the test.
    await use(new LoginPage(page));
  },
  productPage: async({page}, use)=>{
    // go to the product list page
    const navigateTo = new Navigation(page);
    await navigateTo.gotoAEUrl('/products');

    // Verify that all products are visible
    const productPage = new ProductPage(page);
    await productPage.validateAllProducts();

    // Use the fixture value in the test.
    await use(productPage);
  },
});
export { expect } from '@playwright/test';
