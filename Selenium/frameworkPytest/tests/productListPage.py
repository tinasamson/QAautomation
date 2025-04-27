from selenium.webdriver.common.by import By
from utils.utils import Utils

import random

class ProductPage(Utils):
  def __init__(self, driver):
    super().__init__(driver)
    self.driver = driver

  def validateAllProducts(self):
    assert self.driver.find_element(By.CSS_SELECTOR, "h2.title").text, "All Products"
    totalProducts = len(self.driver.find_elements(By.CSS_SELECTOR, ".product-image-wrapper"))
    assert totalProducts > 0
    return totalProducts
  
  def validateProductInfo(self, randomIndex):
    productPrice = self.driver.find_elements(By.CSS_SELECTOR, ".productinfo h2")[randomIndex].text
    productName = self.driver.find_elements(By.CSS_SELECTOR, ".productinfo p")[randomIndex].text
    assert self.driver.find_elements(By.CSS_SELECTOR, ".productinfo a")[randomIndex].text, "Add to cart"
    viewProductBtn = self.driver.find_elements(By.CSS_SELECTOR, ".choose")[randomIndex]
    assert viewProductBtn.text, "View Product"
    return productName, productPrice
  
  def viewProduct(self, randomIndex):
    self.driver.find_elements(By.CSS_SELECTOR, ".choose")[randomIndex].click()

  def getCategory(self):
    self.driver.find_element(By.CSS_SELECTOR, ".category-products").is_displayed()
    categories = self.driver.find_elements(By.CSS_SELECTOR, '.category-products [data-toggle="collapse"]')
    randomCategory = random.randrange(0, len(categories)-1)
    categoryName = categories[randomCategory].text
    idCategoryName = categoryName[0] + categoryName[1:].lower()
    categories[randomCategory].click()
    return idCategoryName
  
  def getCategoryFilters(self, idCategoryName):
    filters = self.driver.find_elements(By.CSS_SELECTOR, "#" + idCategoryName + " .panel-body ul li a")
    totalFilters = len(filters)
    randomFilter = random.randrange(0, totalFilters-1)
    filters[randomFilter].click()

  def validateTotalCategoryProducts(self, totalProducts):
    totalFilterProducts = len(self.driver.find_elements(By.CSS_SELECTOR, ".product-image-wrapper"))
    assert totalProducts >= totalFilterProducts
