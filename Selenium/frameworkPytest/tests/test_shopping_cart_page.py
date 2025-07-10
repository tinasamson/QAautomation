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
    shopping_cart.goToCart()
    shopping_cart.waitVisibilityElement(2, (By.CSS_SELECTOR, "#cart_info"))
    cartProductName, cartProductPrice = shopping_cart.getCartProductNamePrice()
    shopping_cart.validateCartInfo(
        productName.replace(" ", ""), cartProductName.replace(" ", "")
    )
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
    productName, cartName = productDetailName.replace(
        " ", ""
    ), cartProductName.replace(" ", "")
    cartCategory = f"Category: {cartProductCategory}"
    productDetailInfo = [
        productName,
        productDetailPrice,
        productDetailCategory,
        productQuantity,
    ]
    cartInfo = [cartName, cartProductPrice, cartCategory, cartProductQuantity]
    for i in range(len(cartInfo)):
        shopping_cart.validateCartInfo(productDetailInfo[i], cartInfo[i])
    cartTotalPrice = shopping_cart.getCartTotalPrice()
    shopping_cart.validateTotalPrice(
        productDetailPrice, cartTotalPrice, productQuantity
    )


def test_case_8_Add_multiple_products_to_cart(driverBrowserInstance):
    driver = driverBrowserInstance
    product_page = ProductPage(driver)
    product_page.getAEUrl("/products")
    totalProducts = product_page.validateAllProducts()
    randomList = product_page.randomNum(totalProducts, 2)
    dict = {}
    for i in range(len(randomList)):
        productName = f"productName{i+1}"
        productPrice = f"productPrice{i+1}"
        dict[productName], dict[productPrice] = (
            product_page.getProductNamePrice(randomList[i])
        )
    shopping_cart = Cart(driver)
    shopping_cart.addProductToCart(dict["productName1"])
    shopping_cart.confirmModalContinueShopping()
    shopping_cart.addProductToCart(dict["productName2"])
    shopping_cart.confirmModalContinueShopping()
    shopping_cart.goToCart()
    for i in range(len(randomList)):
        cartProductName = f"cartProductName{i+1}"
        cartProductPrice = f"cartProductPrice{i+1}"
        cartTotalPrice = f"cartTotalPrice{i+1}"
        dict[cartProductName], dict[cartProductPrice] = (
            shopping_cart.getCartProductNamePrice(i)
        )
        dict[cartTotalPrice] = shopping_cart.getCartTotalPrice(i)
        shopping_cart.validateCartInfo(
            dict[f"productName{i+1}"].replace(" ", ""),
            dict[cartProductName].replace(" ", ""),
        )
        shopping_cart.validateCartInfo(
            dict[f"productPrice{i+1}"], dict[cartProductPrice]
        )
        shopping_cart.validateTotalPrice(
            dict[cartProductPrice], dict[cartTotalPrice]
        )
