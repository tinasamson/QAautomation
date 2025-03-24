from selenium import webdriver  
from selenium.webdriver.chrome.service import Service as ChromeService  
from webdriver_manager.chrome import ChromeDriverManager
from tests.loginTestCases import LoginPage

def test_login_functionality():
  driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))  
  login_page = LoginPage(driver)
  login_page.test_case_1_correct_user_login()