describe('Product Page', () => {
  it('Test case 2: View all products in product page and verify product information in product detail page.', () => {
    cy.gotoAEUrl("/products");
    cy.allProducts();
    cy.get(".product-image-wrapper").as("allProducts");
    cy.get("@allProducts").then((allProducts)=>{
      const numProducts = allProducts.length;
      cy.randomNum(numProducts).then((randomNum)=>{
        cy.wrap(allProducts).get(".productinfo h2").eq(randomNum).should("exist").invoke("text").as("productPrice");
        cy.wrap(allProducts).get(".productinfo p").eq(randomNum).should("exist").invoke("text").as("productName");
        cy.wrap(allProducts).get(".productinfo a").eq(randomNum).should("have.text", "Add to cart");
        cy.wrap(allProducts).get(".choose").eq(randomNum).contains("View Product").click();
      });
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

  it("Test case 3: Filter with a category the product list page", ()=>{
    cy.gotoAEUrl("/products");
    cy.allProducts();
    cy.get(".product-image-wrapper").its("length").as("allProducts", { type: 'static' });
    cy.get(".category-products").should("exist").and("not.be.empty");
    cy.get('.category-products [data-toggle="collapse"]').then((categories)=>{
      cy.randomNum(categories.length).then((randomCategory)=>{
        cy.wrap(categories).eq(randomCategory).invoke("text").as("categoryName");
        cy.wrap(categories).eq(randomCategory).click();
      });
    })
    cy.get("@categoryName").then((categoryName)=>{
      cy.get(`#${categoryName.trim()} .panel-body ul li a`).then((filters)=>{
        cy.randomNum(filters.length).then((randomfilters)=>{
          cy.wrap(filters).eq(randomfilters).click();
          // cy.location('pathname').should('contain', '/category_products')
        });
      });
    });
    cy.get(".product-image-wrapper").its("length").as("filterProducts", { type: 'static' });
    cy.get("@allProducts").then((allProducts)=>{
      cy.get("@filterProducts").then((filterProducts)=>{
        expect(allProducts).to.gte(filterProducts);
      });
    });
  });
});