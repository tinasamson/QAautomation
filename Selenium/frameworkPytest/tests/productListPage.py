from selenium.webdriver.common.by import By
from utils.utils import Utils

from tests.productDetailPage import ProductDetailPage

class ProductPage(Utils):
  def __init__(self, driver):
    super().__init__(driver)
    self.driver = driver

  def validateAllProducts(self):
    assert self.driver.find_element(By.CSS_SELECTOR, "h2.title").text, "All Products"
    totalProducts = len(self.driver.find_elements(By.CSS_SELECTOR, ".product-image-wrapper"))
    assert totalProducts > 0
    return totalProducts
  
  def getProductNamePrice(self, randomIndex):
    productPrice = self.driver.find_elements(By.CSS_SELECTOR, ".productinfo h2")[randomIndex].text
    productName = self.driver.find_elements(By.CSS_SELECTOR, ".productinfo p")[randomIndex].text
    return productName, productPrice

  
  def validateProductInfo(self, randomIndex):
    assert self.driver.find_elements(By.CSS_SELECTOR, ".productinfo a")[randomIndex].text, "Add to cart"
    viewProductBtn = self.driver.find_elements(By.CSS_SELECTOR, ".choose")[randomIndex]
    assert viewProductBtn.text, "View Product"
  
  def viewProduct(self, randomIndex):
    self.driver.find_elements(By.CSS_SELECTOR, ".choose")[randomIndex].click()
    return ProductDetailPage(self.driver)      # return next page object

  def getCategory(self):
    self.driver.find_element(By.CSS_SELECTOR, ".category-products").is_displayed()
    categories = self.driver.find_elements(By.CSS_SELECTOR, '.category-products [data-toggle="collapse"]')
    randomCategory = super().randomNum(len(categories))
    categoryName = categories[randomCategory].text
    idCategoryName = categoryName[0] + categoryName[1:].lower()
    categories[randomCategory].click()
    return idCategoryName
  
  def getCategoryFilters(self, idCategoryName):
    filters = self.driver.find_elements(By.CSS_SELECTOR, "#" + idCategoryName + " .panel-body ul li a")
    totalFilters = len(filters)
    randomFilter = super().randomNum(totalFilters)
    filters[randomFilter].click()

  def validateTotalCategoryProducts(self, totalProducts):
    totalFilterProducts = len(self.driver.find_elements(By.CSS_SELECTOR, ".product-image-wrapper"))
    assert totalProducts >= totalFilterProducts

  def getBrand(self):
    self.driver.find_element(By.CSS_SELECTOR, ".brands_products").is_displayed()
    assert self.driver.find_element(By.CSS_SELECTOR, ".brands_products h2").text == "BRANDS"
    brandFilters = self.driver.find_elements(By.CSS_SELECTOR, ".brands_products li a")
    randomBrand = super().randomNum(len(brandFilters))
    brandName = brandFilters[randomBrand].text.split(")")[1]
    numBrandProd = int(brandFilters[randomBrand].text[1])
    brandFilters[randomBrand].click()
    return brandName.strip(), numBrandProd
  
  def validateBrandFilter(self, brandName, numBrandProd):
    assert brandName in self.driver.find_element(By.CLASS_NAME, "title").text
    assert len(self.driver.find_elements(By.CLASS_NAME, "product-image-wrapper")) == numBrandProd
    
  def searchProduct(self, searchText):
    self.driver.find_element(By.CSS_SELECTOR, "input#search_product").send_keys(searchText)
    self.driver.find_element(By.CSS_SELECTOR, "button#submit_search").click()

  def validateSearch(self, searchText):
    assert self.driver.find_element(By.CLASS_NAME, "title").text == "SEARCHED PRODUCTS"
    productsTitle = self.driver.find_elements(By.CSS_SELECTOR, ".product-image-wrapper .productinfo p")
    for title in productsTitle:
      assert searchText in title.text.lower()
      