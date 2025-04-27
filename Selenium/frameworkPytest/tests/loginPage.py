from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from utils.utils import Utils

class LoginPage(Utils):
  def __init__(self, driver):
    super().__init__(driver)
    self.driver = driver

  def login(self):
    self.driver.find_element(By.CSS_SELECTOR, '[data-qa="login-email"]').send_keys("testops@test.com")
    self.driver.find_element(By.CSS_SELECTOR, '[data-qa="login-password"]').send_keys("password123")
    self.driver.find_element(By.CSS_SELECTOR, '[data-qa="login-button"]').click()

  def validateLogin(self):
    assert self.driver.find_elements(By.CSS_SELECTOR, ".shop-menu li a")[-1].text, " Logged in as testOps"
    assert self.driver.find_element(By.CSS_SELECTOR, "li [href='/logout']").text, " Logout"
