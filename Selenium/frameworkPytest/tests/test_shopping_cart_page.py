from selenium.webdriver.common.by import By
from tests.shoppingCart import Cart
from tests.productListPage import ProductPage

def test_case_6_delete_product_from_cart(driverBrowserInstance):
    driver = driverBrowserInstance
    product_page = ProductPage(driver)
    product_page.getAEUrl("/products")
    totalProducts = product_page.validateAllProducts()
    randomIndex = product_page.randomNum(totalProducts)
    productName, productPrice = product_page.getProductNamePrice(randomIndex)
    shopping_cart = Cart(driver)
    shopping_cart.addProductToCart(productName)
    shopping_cart.waitVisibilityElement(2, (By.CSS_SELECTOR, "#cartModal .modal-confirm"))
    shopping_cart.confirmModalContinueShopping()
    shopping_cart.waitVisibilityElement(2, (By.CSS_SELECTOR, '.shop-menu ul li a[href*="cart"]'))
    shopping_cart.goToCart()
    shopping_cart.waitVisibilityElement(2, (By.CSS_SELECTOR, "#cart_info"))
    cartProductName, cartProductPrice = shopping_cart.getCartProductNamePrice()
    shopping_cart.validateCartProductNamePrice(productName, productPrice, cartProductName, cartProductPrice)
    shopping_cart.deleteProductFromCart()
    shopping_cart.validateEmptyCart()