from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import random

class ProductPage:
  def __init__(self, driver):
    self.driver = driver

  def test_case_2_product_list_verify_product_info(self):
    self.driver.get("https://www.automationexercise.com/products")
    assert self.driver.find_elements(By.CSS_SELECTOR, "h2.title")[-1].text, "All Products"
    totalProducts = len(self.driver.find_elements(By.CSS_SELECTOR, ".product-image-wrapper"))
    randomIndex = random.randrange(3, totalProducts)
    assert totalProducts > 0
    productPrice = self.driver.find_elements(By.CSS_SELECTOR, ".productinfo h2")[randomIndex].text
    productName = self.driver.find_elements(By.CSS_SELECTOR, ".productinfo p")[randomIndex].text
    assert self.driver.find_elements(By.CSS_SELECTOR, ".productinfo a")[randomIndex].text, "Add to cart"
    viewProductBtn = self.driver.find_elements(By.CSS_SELECTOR, ".choose")[randomIndex]
    assert viewProductBtn.text, "View Product"
    viewProductBtn.click()

    wait = WebDriverWait(self.driver, 10)
    wait.until(EC.url_contains("/product_details/"))
    # Validate product information
  
    assert self.driver.find_element(By.CSS_SELECTOR, ".product-information span span").text == productPrice
    assert self.driver.find_element(By.CSS_SELECTOR, ".product-information h2").text == productName
    productInfo = ["Category:", "Availability", "Condition", "Brand"]

    productDetail = self.driver.find_elements(By.CSS_SELECTOR, ".product-information p")
    index = 0
    for item in productDetail:
      assert item.text, productInfo[index]
      index += 1
