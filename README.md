## Welcome to the QA automation repository, here you can find the test cases used to automate

### Test Case 1: Login with correct user in login page
1. Go to the login page
2. Enter a correct email and password
3. Click on the login button
4. Verify that in the menu "logged in as testOps" exist
5. Verify that the logout button exist

### Test Case 2: View all products in product page and verify product information in product detail page 
1. Go to the product page
2. Verify that all products are visible
3. Validate the name and price of product exist
4. Validate that the add to cart button exist
5. Click on the View Product button of a random product
6. Validate that user navegated to the product detail page
7. Validate the product information

### Test Case 3: Filter with a category the product list page
1. Go to the product page
2. Verify that all products are visible
3. Verify that the category filter exist
4. Click on a random category
5. Verify that user navigated to that category page
6. Verify that all products are equal or more than all products of that category

### Test case 4: Filter products by brand
1. Go to the product page
2. Verify that all products are visible
3. Verify that the brand filter exist
4. Click on a random brand
5. Verify that user navigated to that brand page
6. Verify the amount of product
7. Click on a random product
8. Verify the brand information

### Test Case 5: Search for a product
1. Go to the product page
2. Verify that all products are visible
3. Search for a product
4. Verify that 'SEARCHED PRODUCTS' is visible
5. Verify that all products related to the search are visible

### Test Case 6: Add product from product list page to cart
1. Go to the product list page
2. Add random product to cart
3. Click on the "continue shopping" button
4. Click on cart button
5. Verify that product is added to cart
6. Verify product information

### Test case 7: Add multiple items of same product from product detail page to cart
1. Go to a product detail page
2. Add product to cart
3. Click on the "continue shopping" button
4. Click on cart button
5. Verify that both product are added to cart
6. Verify products information

### Test Case 7: Delete products from cart
1. Go to a product detail page
2. Add product to cart
3. Click on cart button
4. Verify product is added to cart
5. Delete product from cart
6. Verify product is deleted
