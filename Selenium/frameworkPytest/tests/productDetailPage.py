from selenium.webdriver.common.by import By
from utils.utils import Utils

class ProductDetailPage(Utils):
  def __init__(self, driver):
    super().__init__(driver)
    self.driver = driver

  def validateProductDetailInfo(self, productName, productPrice):
    # Validate product information
    assert self.driver.find_element(By.CSS_SELECTOR, ".product-information span span").text == productPrice
    productDetailName = self.driver.find_element(By.CSS_SELECTOR, ".product-information h2").text.strip()
    assert productDetailName.replace(" ", "") == productName.replace(" ", "")
    productInfo = ["Category:", "Availability", "Condition", "Brand"]

    productDetail = self.driver.find_elements(By.CSS_SELECTOR, ".product-information p")
    index = 0
    for item in productDetail:
      assert item.text, productInfo[index]
      index += 1

    # assert self.driver.find_elements(By.CSS_SELECTOR, ".product-information p")[0], "Category:"
    # assert self.driver.find_elements(By.CSS_SELECTOR, ".product-information p")[1], "Availability"
    # assert self.driver.find_elements(By.CSS_SELECTOR, ".product-information p")[2], "Condition"
    # assert self.driver.find_elements(By.CSS_SELECTOR, ".product-information p")[3], "Brand"

  def validateBrandName(self, brandName):
    brandInfo = self.driver.find_elements(By.CSS_SELECTOR, ".product-information p")[-1].text
    assert brandName in brandInfo.upper()

  def getProductNamePrice(self):
    productDetailName = self.driver.find_element(By.CSS_SELECTOR, ".product-information h2").text
    productDetailPrice = self.driver.find_element(By.CSS_SELECTOR, ".product-information span span").text
    return productDetailName, productDetailPrice
  
  def getCategory(self):
    productDetailCategory = self.driver.find_elements(By.CSS_SELECTOR, ".product-information p")[0].text
    return productDetailCategory
  
  def addMultipleItems(self, quantity):
    productDetailQuantity = self.driver.find_element(By.CSS_SELECTOR, ".product-information input#quantity")
    productDetailQuantity.clear()
    productDetailQuantity.send_keys(str(quantity))

  def addToCart(self):
    self.driver.find_element(By.CSS_SELECTOR, "button.cart").click()
