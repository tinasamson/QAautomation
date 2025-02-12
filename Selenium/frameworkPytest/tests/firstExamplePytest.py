from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

class PythonOrgSearch:
    def __init__(self, driver):  
        self.driver = driver

    def test_search_in_python_org(self):
        driver = self.driver
        driver.get("http://www.python.org")
        assert "Python", driver.title
        elem = driver.find_element(By.NAME, "q")
        elem.send_keys("pycon")
        elem.send_keys(Keys.RETURN)
        assert "No results found.", driver.page_source
