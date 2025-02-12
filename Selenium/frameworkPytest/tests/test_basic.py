from selenium import webdriver  
from selenium.webdriver.chrome.service import Service as ChromeService  
from webdriver_manager.chrome import ChromeDriverManager 
from tests.firstExamplePytest import PythonOrgSearch


def test_login_functionality():
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))  
    example_page = PythonOrgSearch(driver)
    example_page.test_search_in_python_org()
