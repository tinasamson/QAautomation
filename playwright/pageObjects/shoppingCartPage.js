import { expect } from '@playwright/test';

export class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }
  async addProductToCart(productName) {
    const productChild = this.page.getByText(productName);
    const addToCartLocator = this.page.locator(".productinfo").filter({has: productChild}).getByText('Add to cart')
    expect(addToCartLocator).toHaveText('Add to cart')
    await addToCartLocator.click();
  }

  async confirmModalContinueShopping(){
    await this.page.locator('#cartModal .modal-confirm [data-dismiss="modal"]').click();
  }

  async goToCart(){
    expect(await this.page.locator(".shop-menu")).toBeVisible();
    await this.page.locator('.shop-menu ul li a[href*="cart"]').click();
  }

  async getCartProductNamePrice(){
    const cartProductName = await this.page.locator(".cart_description h4").textContent();
    const cartProductPrice = await this.page.locator(".cart_price p").textContent();
    return {cartProductName, cartProductPrice};
  }

  async validateCartInfo(productInfo, cartInfo){
    expect(productInfo).toEqual(cartInfo);
  }

  async deleteProductFromCart(){
    await this.page.locator("td.cart_delete").click();
  }

  async validateEmptyCart(){
    expect(await this.page.locator(".cart_info #empty_cart p").textContent()).toContain("Cart is empty");
  }
}