from selenium.webdriver.common.by import By
from utils.utils import Utils

class Cart(Utils):
  def __init__(self, driver):
    super().__init__(driver)
    self.driver = driver

  def addProductToCart(self, productName):
    locatorProduct = f'//p[text()="{productName}"]/../../div[@class="productinfo text-center"]'
    productInfo = self.driver.find_element(By.XPATH, locatorProduct)
    super().waitVisibilityElement(2, (By.CLASS_NAME, "add-to-cart"))
    productInfo.find_element(By.CLASS_NAME, "add-to-cart").click()

  def confirmModalContinueShopping(self):
    self.driver.find_element(By.CSS_SELECTOR, '#cartModal .modal-confirm [data-dismiss="modal"]').click()

  def goToCart(self):
    self.driver.find_element(By.CSS_SELECTOR, '.shop-menu ul li a[href*="cart"]').click()

  def getCartProductNamePrice(self):
    cartProductName = self.driver.find_element(By.CSS_SELECTOR, ".cart_description h4").text
    cartProductPrice = self.driver.find_element(By.CSS_SELECTOR, ".cart_price p").text
    return cartProductName, cartProductPrice
  
  def validateCartProductNamePrice(self, productName, productPrice, cartProductName, cartProductPrice):
    assert productName == cartProductName
    assert productPrice == cartProductPrice

  def deleteProductFromCart(self):
    self.driver.find_element(By.CSS_SELECTOR, "td.cart_delete").click()

  def validateEmptyCart(self):
    super().waitTextPresentElement(5, (By.CSS_SELECTOR, ".cart_info p"), "Cart")
    assert "Cart is empty" in self.driver.find_element(By.CSS_SELECTOR, ".cart_info p").text