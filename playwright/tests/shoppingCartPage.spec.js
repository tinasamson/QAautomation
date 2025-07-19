import { customtest } from '../utils/fixtures';
import { ShoppingCartPage } from '../pageObjects/shoppingCartPage';
import { ProductDetailPage } from '../pageObjects/productDetailPage';
import {
  randomNum,
  waitUrlToLoad,
  gotoAEUrl,
  twoRandomNum,
} from '../utils/commonUtils';

customtest(
  'Test case 6: delete one product from cart',
  async ({ page, productPage }) => {
    const totalProducts = await page.locator('.product-image-wrapper').count();
    const randomIndex = await randomNum(totalProducts);
    const [productName, productPrice] =
      await productPage.getProductNamePrice(randomIndex);
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.addProductToCart(productName);
    await shoppingCartPage.confirmModalContinueShopping();
    await shoppingCartPage.goToCart();
    await waitUrlToLoad(page, /\/view_cart/);
    const [cartProductName, cartProductPrice] =
      await shoppingCartPage.getCartProductNamePrice();
    await shoppingCartPage.validateCartInfo(productName, cartProductName);
    await shoppingCartPage.validateCartInfo(productPrice, cartProductPrice);
    await shoppingCartPage.deleteProductFromCart();
    await shoppingCartPage.validateEmptyCart();
  },
);

customtest(
  'Test case 7: Add multiple item of same product from PDP to the cart',
  async ({ page }) => {
    await gotoAEUrl(page, '/product_details/18');
    const productQuantity = 3;
    const productDetailPage = new ProductDetailPage(page);
    const [productDetailName, productDetailPrice] =
      await productDetailPage.getProductNamePrice();
    const productDetailCategory = await productDetailPage.getCategory();
    await productDetailPage.addMultipleItems(productQuantity);
    await productDetailPage.addToCart();
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.confirmModalViewCart();
    await waitUrlToLoad(page, /\/view_cart/);
    const [cartProductName, cartProductPrice] =
      await shoppingCartPage.getCartProductNamePrice();
    const cartProductCategory = await shoppingCartPage.getCartCategory();
    const cartProductQuantity = await shoppingCartPage.getCartProductQuantity();
    const cartCategory =
      'Category: ' + cartProductCategory.replaceAll('  ', ' ');
    const productDetailInfo = [
      productDetailName,
      productDetailPrice,
      productDetailCategory,
      productQuantity,
    ];
    const cartInfo = [
      cartProductName,
      cartProductPrice,
      cartCategory,
      cartProductQuantity,
    ];
    for (let k = 0; k < cartInfo.length; k++) {
      await shoppingCartPage.validateCartInfo(
        productDetailInfo[k],
        cartInfo[k],
      );
    }
    const cartTotalPrice = await shoppingCartPage.getCartTotalPrice();
    await shoppingCartPage.validateTotalPrice(
      productDetailPrice,
      cartTotalPrice,
      productQuantity,
    );
  },
);

customtest(
  'Test case 8: Add multiple products from product list page to cart',
  async ({ page, productPage }) => {
    const totalProducts = await page.locator('.product-image-wrapper').count();
    const randomList = await twoRandomNum(totalProducts);
    let dict = {};
    const shoppingCartPage = new ShoppingCartPage(page);
    for (let i = 1; i <= randomList.length; i++) {
      const productName = 'productName' + i.toString();
      const productPrice = 'productPrice' + i.toString();
      const productNamePrice = await productPage.getProductNamePrice(
        randomList[i - 1],
      );
      dict[productName] = productNamePrice[0];
      dict[productPrice] = productNamePrice[1];
      await shoppingCartPage.addProductToCart(dict[productName]);
      await shoppingCartPage.confirmModalContinueShopping();
    }
    await shoppingCartPage.goToCart();
    for (let i = 1; i <= randomList.length; i++) {
      const cartProductName = 'cartProductName' + i.toString();
      const cartProductPrice = 'cartProductPrice' + i.toString();
      const cartTotalPrice = 'cartTotalPrice' + i.toString();
      const cartNamePrice = await shoppingCartPage.getCartProductNamePrice(
        i - 1,
      );
      dict[cartProductName] = cartNamePrice[0];
      dict[cartProductPrice] = cartNamePrice[1];
      dict[cartTotalPrice] = await shoppingCartPage.getCartTotalPrice(i - 1);
      await shoppingCartPage.validateCartInfo(
        dict[`productName${i}`],
        dict[cartProductName],
      );
      await shoppingCartPage.validateCartInfo(
        dict[`productPrice${i}`],
        dict[cartProductPrice],
      );
      await shoppingCartPage.validateTotalPrice(
        dict[cartProductPrice],
        dict[cartTotalPrice],
      );
    }
  },
);
