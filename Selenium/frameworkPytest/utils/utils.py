from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class Utils:
  def __init__(self, driver):
   self.driver = driver

  def getAEUrl(self, route):
    self.driver.get("https://www.automationexercise.com" + route)

  def waitUrlToLoad(self, seconds, route):
    wait = WebDriverWait(self.driver, seconds)
    wait.until(EC.url_contains(route))

  def waitVisibilityElement(self, seconds, locator):
    wait = WebDriverWait(self.driver, seconds)
    wait.until(EC.visibility_of_element_located(locator))

