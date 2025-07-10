from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import random


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

    def waitTextPresentElement(self, seconds, locator, text):
        wait = WebDriverWait(self.driver, seconds)
        wait.until(EC.text_to_be_present_in_element(locator, text))

    def randomNum(self, totalNum, numbers=1):
        if numbers == 1:
            randomNum = random.randrange(0, totalNum - 1)
            return randomNum
        else:
            randomNumList = random.sample(range(totalNum), numbers)
            return randomNumList
