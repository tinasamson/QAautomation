describe('Shopping Cart', () => {
  it("Add product from product list page to cart", ()=>{
    cy.gotoAEUrl("/products");
    cy.get(".product-image-wrapper").as("allProducts");
    cy.get("@allProducts").its("length").should("be.gte", 2);
    cy.get("@allProducts").then((allProducts)=>{
      const numProducts = allProducts.length;
      cy.randomNum(numProducts).then((randomNum)=>{
        cy.wrap(allProducts).find(".productinfo h2").eq(randomNum).should("exist").invoke("text").as("productPrice", { type: "static" });
        cy.wrap(allProducts).find(".productinfo p").eq(randomNum).should("exist").invoke("text").as("productName", { type: "static" });
        cy.wrap(allProducts).find(".productinfo a").eq(randomNum).should("have.text", "Add to cart").click();
        cy.get("#cartModal .modal-confirm").should("be.visible");
        cy.get('#cartModal .modal-confirm [data-dismiss="modal"]').click();
      });
      cy.get('.shop-menu ul li a[href*="cart"]').click();
      cy.get("#cart_info").should("exist").and("be.visible");

      cy.get("#cart_info_table tbody tr").then((productCartOverview)=>{
        cy.wrap(productCartOverview).find(".cart_description h4").invoke("text").as("productCartName", { type: "static" });
        cy.wrap(productCartOverview).find(".cart_price p").invoke("text").as("productCartPrice", { type: "static" })
      });
      
      // validate product information in cart overview
      cy.get("@productCartName").then((productCartName)=>{
        cy.get("@productName").then((productName)=>{
          expect(productCartName).to.eq(productName);
        });
      });
      cy.get("@productCartPrice").then((productCartPrice)=>{
        cy.get("@productPrice").then((productPrice)=>{
          expect(productCartPrice).to.eq(productPrice);
        });
      });  
    });
  })

});