from selenium.webdriver.common.by import By
from tests.loginPage import LoginPage

def test_case_1_correct_user_login(driverBrowserInstance):
  driver = driverBrowserInstance
  login_page = LoginPage(driver)
  login_page.getAEUrl("/login")
  login_page.login()
  login_page.waitVisibilityElement(2, (By.CSS_SELECTOR, ".shop-menu li a b"))
  login_page.validateLogin()