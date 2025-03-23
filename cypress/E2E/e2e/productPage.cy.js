describe('Product Page', () => {
  it('Test case 2: View all products in product page and verify product information in product detail page.', () => {
    cy.visit("https://www.automationexercise.com/products");
    cy.get("h2.title").should("exist").should("have.text", "All Products");
    cy.get(".product-image-wrapper").its("length").should("be.gt", 0);
    cy.get(".product-image-wrapper").as("allProducts");
    cy.get("@allProducts").then((allProducts)=>{
      const numProducts = allProducts.length;
      const randomNum = Math.floor(Math.random() * numProducts);
      cy.wrap(allProducts).get(".productinfo h2").eq(randomNum).should("exist").invoke("text").as("productPrice");
      cy.wrap(allProducts).get(".productinfo p").eq(randomNum).should("exist").invoke("text").as("productName");
      cy.wrap(allProducts).get(".productinfo a").eq(randomNum).should("have.text", "Add to cart");
      cy.wrap(allProducts).get(".choose").eq(randomNum).contains("View Product").click();
    });

    // Validate product detail information
    cy.get("@productPrice").then((priceProductList)=>{
      cy.get(".product-information span span").invoke("text").then((priceProductDetail)=>{
        cy.log(priceProductDetail);
        expect(priceProductList).to.eq(priceProductDetail)
      });
    });

    cy.get("@productName").then((nameProductList)=>{
      cy.get(".product-information h2").invoke("text").then((nameProductDetail)=>{
        expect(nameProductList).to.eq(nameProductDetail)
      });
    });
    const productInfo = ["Category:", "Availability", "Condition", "Brand"];
    cy.get(".product-information p").each((productDetail, index)=>{
      cy.wrap(productDetail).contains(productInfo[index]); 
    })
    // To validate without each() ->
    // cy.get(".product-information p").eq(0).contains("Category:");
    // cy.get(".product-information p").eq(1).contains("Availability");
    // cy.get(".product-information p").eq(2).contains("Condition");
    // cy.get(".product-information p").eq(3).contains("Brand");
  })
})