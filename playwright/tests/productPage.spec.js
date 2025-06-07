import { customtest} from '../utils/test-base';
import { ProductDetailPage } from '../pageObjects/productDetailPage';

customtest('Test case 2: View all products in PLP and verify product information in PDP', async ({ page, productPage, navigation}) => {
  const totalProducts = await page.locator(".product-image-wrapper").count();
  const randomIndex = Math.floor(Math.random() * totalProducts);
  const {productName, productPrice} = await productPage.getProductNamePrice(randomIndex);
  
  await productPage.validateProductInfo(randomIndex);
  await productPage.viewProduct(randomIndex);
  await navigation.waitUrlToLoad('product_details');
  // validate product detail information
  const productDetailPage = new ProductDetailPage(page)
  await productDetailPage.validateProductDetailInfo(productName, productPrice);
});

customtest('Test case 3: Filter with a category the product list page', async ({page, productPage, navigation}) => {
  const totalProducts = await page.locator(".product-image-wrapper").count();
  const categoryName = await productPage.getCategory();
  await productPage.getCategoryFilters(categoryName);
  await navigation.waitUrlToLoad('category_products');
  await productPage.validateTotalCategoryProducts(totalProducts);
});
