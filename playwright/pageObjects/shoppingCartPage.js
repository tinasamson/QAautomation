import { expect } from '@playwright/test';

export class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }
  async addProductToCart(productName) {
    const productChild = this.page.getByText(productName);
    const addToCartLocator = this.page
      .locator('.productinfo')
      .filter({ has: productChild })
      .getByText('Add to cart');
    expect(addToCartLocator).toHaveText('Add to cart');
    await addToCartLocator.click();
  }

  async confirmModalContinueShopping() {
    await this.page
      .locator('#cartModal .modal-confirm [data-dismiss="modal"]')
      .click();
  }

  async confirmModalViewCart() {
    await this.page.locator('#cartModal .modal-body a').click();
  }

  async goToCart() {
    expect(await this.page.locator('.shop-menu')).toBeVisible();
    await this.page.locator('.shop-menu ul li a[href*="cart"]').click();
  }

  async getCartProductNamePrice(row = 0) {
    const cartProductName = await this.page
      .locator('.cart_description h4')
      .nth(row)
      .textContent();
    const cartProdName = cartProductName.replaceAll('  ', ' ');
    const cartProductPrice = await this.page
      .locator('.cart_price p')
      .nth(row)
      .textContent();
    return [cartProdName.replace('  ', ' '), cartProductPrice];
  }

  async validateCartInfo(productInfo, cartInfo) {
    expect(productInfo).toEqual(cartInfo);
  }

  async deleteProductFromCart() {
    await this.page.locator('td.cart_delete').click();
  }

  async validateEmptyCart() {
    expect(
      await this.page.locator('.cart_info #empty_cart p').textContent(),
    ).toContain('Cart is empty');
  }

  async getCartCategory() {
    const cartProductCategory = await this.page
      .locator('.cart_description p')
      .textContent();
    return cartProductCategory;
  }

  async getCartProductQuantity() {
    const cartQuantity = await this.page
      .locator('.cart_quantity')
      .textContent();
    return parseInt(cartQuantity.trim());
  }

  async getCartTotalPrice(row = 0) {
    const cartTotalPrice = await this.page
      .locator('.cart_total_price')
      .nth(row)
      .textContent();
    return cartTotalPrice;
  }

  async validateTotalPrice(productPrice, cartTotalPrice, quantity = 1) {
    expect(parseInt(productPrice.split(' ')[1]) * quantity).toEqual(
      parseInt(cartTotalPrice.split(' ')[1]),
    );
  }
}
