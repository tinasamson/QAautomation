from selenium.webdriver.common.by import By
from tests.shoppingCart import Cart
from tests.productDetailPage import ProductDetailPage
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
    shopping_cart.confirmModalContinueShopping()
    shopping_cart.waitVisibilityElement(2, (By.CSS_SELECTOR, '.shop-menu ul li a[href*="cart"]'))
    shopping_cart.goToCart()
    shopping_cart.waitVisibilityElement(2, (By.CSS_SELECTOR, "#cart_info"))
    cartProductName, cartProductPrice = shopping_cart.getCartProductNamePrice()
    shopping_cart.validateCartInfo(productName.replace(" ", ""), cartProductName.replace(" ", ""))
    shopping_cart.validateCartInfo(productPrice, cartProductPrice)
    shopping_cart.deleteProductFromCart()
    shopping_cart.validateEmptyCart()

def test_case_7_add_multiple_items_of_product_to_cart(driverBrowserInstance):
    driver = driverBrowserInstance
    product_detail = ProductDetailPage(driver)
    product_detail.getAEUrl("/product_details/18")
    productQuantity = 3
    productDetailName, productDetailPrice = product_detail.getProductNamePrice()
    productDetailCategory = product_detail.getCategory()
    product_detail.addMultipleItems(productQuantity)
    product_detail.addToCart()
    shopping_cart = Cart(driver)
    shopping_cart.confirmModalViewCart()
    shopping_cart.waitUrlToLoad(2, "/view_cart")
    cartProductName, cartProductPrice = shopping_cart.getCartProductNamePrice()
    cartProductCategory = shopping_cart.getCartCategory()
    cartProductQuantity = shopping_cart.getCartProductQuantity()
    productName, cartName = productDetailName.replace(" ", ""), cartProductName.replace(" ", "")
    cartCategory = f"Category: {cartProductCategory}"
    productDetailInfo = [productName, productDetailPrice, productDetailCategory, productQuantity]
    cartInfo = [cartName, cartProductPrice, cartCategory , cartProductQuantity]
    for i in range(len(cartInfo)):
        shopping_cart.validateCartInfo(productDetailInfo[i], cartInfo[i])
    shopping_cart.validateTotalPrice(productDetailPrice, productQuantity)
    