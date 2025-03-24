from selenium.webdriver.common.by import By

class LoginPage:
  def __init__(self, driver):
    self.driver = driver

  def test_case_1_correct_user_login(self):
    self.driver.get("https://www.automationexercise.com/login")
    self.driver.find_element(By.CSS_SELECTOR, '[data-qa="login-email"]').send_keys("testops@test.com")
    self.driver.find_element(By.CSS_SELECTOR, '[data-qa="login-password"]').send_keys("password123")
    self.driver.find_element(By.CSS_SELECTOR, '[data-qa="login-button"]').click()
    assert self.driver.find_elements(By.CSS_SELECTOR, ".shop-menu li a")[-1].text, " Logged in as testOps"
    assert self.driver.find_element(By.CSS_SELECTOR, "li [href='/logout']").text, " Logout"