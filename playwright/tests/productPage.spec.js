import { customtest} from '../utils/fixtures';
import { ProductDetailPage } from '../pageObjects/productDetailPage';
import { randomNum, waitUrlToLoad } from '../utils/commonUtils';

customtest('Test case 2: View all products in PLP and verify product information in PDP', async ({ page, productPage}) => {
  const totalProducts = await page.locator(".product-image-wrapper").count();
  const randomIndex = await randomNum(totalProducts);
  const {productName, productPrice} = await productPage.getProductNamePrice(randomIndex);

  await productPage.validateProductInfo(randomIndex);
  await productPage.viewProduct(randomIndex);
  await waitUrlToLoad(page, 'product_details');
  // validate product detail information
  const productDetailPage = new ProductDetailPage(page)
  await productDetailPage.validateProductDetailInfo(productName, productPrice);
});

customtest('Test case 3: Filter with a category the product list page', async ({page, productPage}) => {
  const totalProducts = await page.locator(".product-image-wrapper").count();
  const categoryName = await productPage.getCategory();
  await productPage.getCategoryFilters(categoryName);
  await waitUrlToLoad(page, 'category_products');
  await productPage.validateTotalCategoryProducts(totalProducts);
});
