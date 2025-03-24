from selenium import webdriver  
from selenium.webdriver.chrome.service import Service as ChromeService  
from webdriver_manager.chrome import ChromeDriverManager
from tests.productTestCases import ProductPage

def test_product_list_detail():
  driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
  product_page = ProductPage(driver)
  product_page.test_case_2_product_list_verify_product_info()