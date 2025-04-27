from selenium.webdriver.common.by import By
from tests.productListPage import ProductPage
from tests.productDetailPage import ProductDetailPage

import random

def test_case_2_product_list_verify_product_info(driverBrowserInstance):
  driver = driverBrowserInstance
  product_page = ProductPage(driver)
  product_page.getAEUrl("/products")
  totalProducts = product_page.validateAllProducts()
  randomIndex = random.randrange(0, totalProducts-1)
  productName, productPrice = product_page.validateProductInfo(randomIndex)
  product_page.viewProduct(randomIndex)
  product_detail = ProductDetailPage(driver)
  product_detail.waitUrlToLoad(5, "/product_details/")
  product_detail.validateProductDetailInfo(productName, productPrice)

def test_case_3_filter_products_by_category(driverBrowserInstance):
  driver = driverBrowserInstance
  product_page = ProductPage(driver)
  product_page.getAEUrl("/products")
  totalProducts = product_page.validateAllProducts()
  idCategoryName = product_page.getCategory()
  product_page.waitVisibilityElement(5, (By.CSS_SELECTOR, "#" + idCategoryName + " .panel-body ul li a"))
  product_page.getCategoryFilters(idCategoryName)
  product_page.waitUrlToLoad(5, "/category_products")
  product_page.validateTotalCategoryProducts(totalProducts)
