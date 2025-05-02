from selenium.webdriver.common.by import By
from tests.productListPage import ProductPage

import random
import pytest

@pytest.fixture()
def setup(driverBrowserInstance):
  driver = driverBrowserInstance
  product_page = ProductPage(driver)
  product_page.getAEUrl("/products")
  totalProducts = product_page.validateAllProducts()
  yield product_page, totalProducts

def test_case_2_product_list_verify_product_info(setup):
  product_page, totalProducts = setup
  randomIndex = random.randrange(0, totalProducts-1)
  productName, productPrice = product_page.validateProductInfo(randomIndex)
  product_detail = product_page.viewProduct(randomIndex)
  product_detail.waitUrlToLoad(5, "/product_details/")
  product_detail.validateProductDetailInfo(productName, productPrice)

def test_case_3_filter_products_by_category(setup):
  product_page, totalProducts = setup
  idCategoryName = product_page.getCategory()
  product_page.waitVisibilityElement(5, (By.CSS_SELECTOR, "#" + idCategoryName + " .panel-body ul li a"))
  product_page.getCategoryFilters(idCategoryName)
  product_page.waitUrlToLoad(5, "/category_products")
  product_page.validateTotalCategoryProducts(totalProducts)

def test_case_4_filter_products_by_brands(setup):
  product_page = setup[0]
  brandName, numBrandProd, randomBrand = product_page.getBrand()
  product_page.waitUrlToLoad(5, "/brand_products")
  product_page.validateBrandFilter(brandName, numBrandProd)
  randomIndex = random.randrange(0, numBrandProd-1)
  product_detail = product_page.viewProduct(randomIndex)
  product_detail.waitUrlToLoad(5, "/product_details/")
  product_detail.validateBrandName(brandName)

def test_case_5_search_for_product(setup):
  searchText = "jeans"
  product_page = setup[0]
  product_page.searchProduct(searchText)
  product_page.waitUrlToLoad(5, "products?search=" + searchText)
  product_page.validateSearch(searchText)