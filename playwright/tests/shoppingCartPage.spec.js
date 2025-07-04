import { customtest} from '../utils/fixtures';
import { ShoppingCartPage, shoppingCartPage } from '../pageObjects/shoppingCartPage';
import { randomNum, waitUrlToLoad } from '../utils/commonUtils';

customtest('Test case 6: delete one product from cart', async ({ page, productPage}) => {
  const totalProducts = await page.locator(".product-image-wrapper").count();
  const randomIndex = await randomNum(totalProducts);
  const {productName, productPrice} = await productPage.getProductNamePrice(randomIndex);
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.addProductToCart(productName);
  await shoppingCartPage.confirmModalContinueShopping();
  await shoppingCartPage.goToCart();
  const {cartProductName, cartProductPrice} = await shoppingCartPage.getCartProductNamePrice();
  await shoppingCartPage.validateCartInfo(productName, cartProductName);
  await shoppingCartPage.validateCartInfo(productPrice, cartProductPrice);
  await shoppingCartPage.deleteProductFromCart();
  await shoppingCartPage.validateEmptyCart();
});
