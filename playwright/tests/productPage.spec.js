import { test, expect } from '@playwright/test';

test('Test case 2: View all products in PLP and verify product information in PDP', async ({ page}) => {
  await page.goto("https://www.automationexercise.com/products");
  const allProducts = page.locator(".product-image-wrapper");
  const totalProducts = await allProducts.count();
  const randomIndex = Math.floor(Math.random() * totalProducts);

  await expect(page.locator("h2.title")).toHaveText("All Products");
  await expect(totalProducts).toBeGreaterThan(0);
  const productPrice = await allProducts.locator(".productinfo h2").nth(randomIndex).textContent();
  const productName = await allProducts.locator(".productinfo p").nth(randomIndex).textContent();
  await expect(allProducts.locator(".productinfo a").nth(randomIndex)).toHaveText("Add to cart");
  await page.getByText("View Product").nth(randomIndex).click();

  await expect(page).toHaveURL(/\/product_details\/\d/);
  // validate product detail information
  await expect(page.locator(".product-information span span")).toHaveText(productPrice);
  await expect(page.locator(".product-information h2")).toHaveText(productName);

  const productInfo = ["Category:", "Availability", "Condition", "Brand"];
  let index = 0;
  for (const productDetail of await page.locator(".product-information p").all()){
    await expect(productDetail).toContainText(productInfo[index]);
    index += 1;
  };
  // To validate without for() ->
  // await expect(page.locator(".product-information p").first()).toContainText("Category:");
  // await expect(page.locator(".product-information p").nth(1)).toContainText("Availability");
  // await expect(page.locator(".product-information p").nth(2)).toContainText("Condition");
  // await expect(page.locator(".product-information p").last()).toContainText("Brand");
});