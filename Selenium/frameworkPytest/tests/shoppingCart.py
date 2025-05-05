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

  def deleteProductFromCart(self):
    self.driver.find_element(By.CSS_SELECTOR, "td.cart_delete").click()

  def confirmModalContinueShopping(self):
    super().waitVisibilityElement(2, (By.CSS_SELECTOR, "#cartModal .modal-confirm"))
    self.driver.find_element(By.CSS_SELECTOR, '#cartModal .modal-confirm [data-dismiss="modal"]').click()

  def confirmModalViewCart(self):
    super().waitVisibilityElement(2, (By.CSS_SELECTOR, "#cartModal .modal-confirm"))
    self.driver.find_element(By.CSS_SELECTOR, "#cartModal .modal-body a").click()

  def goToCart(self):
    super().waitVisibilityElement(2, (By.CSS_SELECTOR, '.shop-menu ul li a[href*="cart"]'))
    self.driver.find_element(By.CSS_SELECTOR, '.shop-menu ul li a[href*="cart"]').click()

  def getCartProductNamePrice(self, row=0):
    cartProductName = self.driver.find_elements(By.CSS_SELECTOR, ".cart_description h4")[row].text
    cartProductPrice = self.driver.find_elements(By.CSS_SELECTOR, ".cart_price p")[row].text
    return cartProductName, cartProductPrice
  
  def getCartCategory(self):
    cartCategory = self.driver.find_element(By.CSS_SELECTOR, ".cart_description p").text
    return cartCategory
  
  def getCartProductQuantity(self):
    cartQuantity = self.driver.find_element(By.CSS_SELECTOR, ".cart_quantity").text
    return int(cartQuantity.strip())
  
  def getCartTotalPrice(self, row=0):
    cartTotalPrice = self.driver.find_elements(By.CSS_SELECTOR, ".cart_total_price")[row].text
    return cartTotalPrice
  
  def validateCartInfo(self, productInfo, cartInfo):
    assert productInfo == cartInfo

  def validateEmptyCart(self):
    super().waitTextPresentElement(5, (By.CSS_SELECTOR, ".cart_info p"), "Cart")
    assert "Cart is empty" in self.driver.find_element(By.CSS_SELECTOR, ".cart_info p").text

  def validateTotalPrice(self, productPrice, cartTotalPrice, quantity=1):
    assert int(productPrice.split(" ")[1])*quantity == int(cartTotalPrice.split(" ")[1])
