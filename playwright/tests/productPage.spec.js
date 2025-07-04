import { customtest} from '../utils/fixtures';
import { ProductDetailPage } from '../pageObjects/productDetailPage';
import { randomNum, waitUrlToLoad } from '../utils/commonUtils';

customtest('Test case 2: View all products in PLP and verify product information in PDP', async ({ page, productPage}) => {
  const totalProducts = await page.locator(".product-image-wrapper").count();
  const randomIndex = await randomNum(totalProducts);
  const {productName, productPrice} = await productPage.getProductNamePrice(randomIndex);

  await productPage.validateProductInfo(randomIndex);
  await productPage.viewProduct(randomIndex);
  await waitUrlToLoad(page, /\/product_details/);
  // validate product detail information
  const productDetailPage = new ProductDetailPage(page)
  await productDetailPage.validateProductDetailInfo(productName, productPrice);
});

customtest('Test case 3: Filter with a category the product list page', async ({page, productPage}) => {
  const totalProducts = await page.locator(".product-image-wrapper").count();
  const categoryName = await productPage.getCategory();
  await productPage.getCategoryFilters(categoryName);
  await waitUrlToLoad(page, /\/category_products\/[0-9]/);
  await productPage.validateTotalCategoryProducts(totalProducts);
});

customtest('Test case 4: Filter with brand the product list page', async ({page, productPage}) => {
  const {brandName, numBrandProd} = await productPage.getBrand();
  await waitUrlToLoad(page, /\/brand_products/);
  await productPage.validateBrandFilter(brandName, numBrandProd);
  const randomIndex = await randomNum(numBrandProd);
  await productPage.viewProduct(randomIndex);
  await waitUrlToLoad(page, /\/product_details/);
  const productDetailPage = new ProductDetailPage(page)
  await productDetailPage.validateBrandName(brandName);
});

customtest('Test case 5: Search for a product', async({page, productPage}) => {
  const searchText = "jeans";
  await productPage.searchProduct(searchText);
  await waitUrlToLoad(page, RegExp("products\\?search="+ searchText));
  await productPage.validateSearchProduct(searchText);
});
