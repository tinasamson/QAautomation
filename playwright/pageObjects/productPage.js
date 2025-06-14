import { expect } from '@playwright/test';
import { randomNum } from '../utils/commonUtils';

export class ProductPage{
  constructor(page) {
    this.page = page;
  }
  async validateAllProducts(){
    const totalProducts = await this.page.locator(".product-image-wrapper").count();
    await expect(this.page.locator("h2.title")).toHaveText("All Products");
    await expect(totalProducts).toBeGreaterThan(0);
  }

  async getProductNamePrice(randomIndex){
    const productPrice = await this.page.locator(".productinfo h2").nth(randomIndex).textContent();
    const productName = await this.page.locator(".productinfo p").nth(randomIndex).textContent();
    return {productName, productPrice}
  }

  async validateProductInfo(randomIndex){
    await expect(this.page.locator(".productinfo a").nth(randomIndex)).toHaveText("Add to cart");
  }

  async viewProduct(randomIndex){
    await this.page.getByText("View Product").nth(randomIndex).click();
  }

  async getCategory(){
    await expect(this.page.locator(".category-products")).not.toBeEmpty();
    const categories = this.page.locator('.category-products [data-toggle="collapse"]');
    const totalCategories = await categories.count();
    const randomCategory = await randomNum(totalCategories);
    const categoryName = await categories.nth(randomCategory).textContent();
    await categories.nth(randomCategory).click();
    return categoryName
  }

  async getCategoryFilters(categoryName){
    const filters = this.page.locator(`#${categoryName.trim()} .panel-body ul li a`);
    const totalFilters = await filters.count();
    const randomFilters = await randomNum(totalFilters);
    await filters.nth(randomFilters).click();
  }

  async validateTotalCategoryProducts(totalProducts){
    const filterProducts = await this.page.locator(".product-image-wrapper").count();
    expect(totalProducts).toBeGreaterThanOrEqual(filterProducts);
  }
}