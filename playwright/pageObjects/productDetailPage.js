import { expect } from '@playwright/test';

export class ProductDetailPage {
  constructor(page) {
    this.page = page;
  }
  async validateProductDetailInfo(productName, productPrice) {
    await expect(this.page.locator(".product-information span span")).toHaveText(productPrice);
    await expect(this.page.locator(".product-information h2")).toHaveText(productName);
  
    const productInfo = ["Category:", "Availability", "Condition", "Brand"];
    let index = 0;
    for (const productDetail of await this.page.locator(".product-information p").all()){
      await expect(productDetail).toContainText(productInfo[index]);
      index += 1;
    };
    // To validate without for() ->
    // await expect(this.page.locator(".product-information p").first()).toContainText("Category:");
    // await expect(this.page.locator(".product-information p").nth(1)).toContainText("Availability");
    // await expect(this.page.locator(".product-information p").nth(2)).toContainText("Condition");
    // await expect(this.page.locator(".product-information p").last()).toContainText("Brand");
  }
}