describe('Shopping Cart', () => {
  it("test case 6: Delete products from cart", ()=>{
    cy.gotoAEUrl("/products");
    cy.get(".product-image-wrapper").as("allProducts");
    cy.get("@allProducts").its("length").should("be.gte", 1);
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
      cy.get("#cart_info_table tbody tr").as("productCartOverview");
      cy.get("@productCartOverview").then((productCartOverview)=>{
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
      cy.get("@productCartOverview").find("td.cart_delete").click();
      cy.get(".cart_info p").should("exist").and("contain", "Cart is empty")
    });
  });

  it("test case 7: Add multiple items of same product from product detail page to cart", ()=>{
    cy.gotoAEUrl("/product_details/18");
    const quantityProd = 3;
    cy.get(".product-information").as("productDetails");
    cy.get("@productDetails").then((productDetails)=>{
      cy.wrap(productDetails).find("h2").invoke("text").as("productDetailName", { type: "static" });
      cy.wrap(productDetails).find("p").first().invoke("text").as("productDetailCategory", { type: "static" });
      cy.wrap(productDetails).find("span span").invoke("text").as("productDetailPrice", { type: "static" });
      cy.wrap(productDetails).find("input#quantity").clear();
      cy.wrap(productDetails).find("input#quantity").type(quantityProd.toString());
      cy.wrap(productDetails).find("button.cart").click();
    });
    cy.get("#cartModal .modal-body a").should("exist").and("be.visible");
    cy.get("#cartModal .modal-body a").click();
    cy.validateAEUrl("/view_cart");
    cy.get("#cart_info_table tbody tr").eq(0).then((productCartOverview)=>{
      cy.wrap(productCartOverview).find(".cart_total_price").invoke("text").as("productCartTotalPrice", { type: "static" });
      cy.get("@productDetailName").then((productName)=>{
        cy.wrap(productCartOverview).find(".cart_description h4").invoke("text").then((overviewName)=>{
          expect(overviewName).to.eq(productName);
        });
      });
      cy.get("@productDetailCategory").then((productCategory)=>{
        cy.wrap(productCartOverview).find(".cart_description p").invoke("text").then((overviewCategory)=>{
          expect(productCategory).to.contain(overviewCategory);
        });
      });
      cy.wrap(productCartOverview).find(".cart_quantity").invoke("text").then((overviewQuantity)=>{
        expect(overviewQuantity.trim()).to.eq(quantityProd.toString());
      })
      cy.get("@productDetailPrice").then((productPrice)=>{
        const numDetailPrice = Number(productPrice.split(" ")[1]);
        cy.wrap(productCartOverview).find(".cart_price p").invoke("text").then((overviewPrice)=>{
          expect(overviewPrice).to.eq(productPrice);
        });
        cy.get("@productCartTotalPrice").then((cartTotalPrice)=>{
          const numTotalPrice = Number(cartTotalPrice.split(" ")[1]);
          expect(numTotalPrice).to.eq(numDetailPrice*quantityProd);
        });
      });
    });
  });

  it("test case 8: Add multiple product from product list page to cart", ()=>{
    cy.gotoAEUrl("/products");
    cy.get(".product-image-wrapper").as("allProducts");
    cy.get("@allProducts").its("length").should("be.gte", 2);
    cy.get("@allProducts").then((allProducts)=>{
      const numProducts = allProducts.length;
      cy.twoRandomNum(numProducts).then((randomNumbers)=>{
        cy.log(randomNumbers)
        const {randomNum1, randomNum2} = randomNumbers
        for (let i = 1; i < 3; i++) {
          let randomNum = randomNum1;
          if (i === 2){
            randomNum = randomNum2;
          }
          cy.wrap(allProducts).find(".productinfo h2").eq(randomNum).should("exist").invoke("text").as("product" + i.toString() + "Price", { type: "static" });
          cy.wrap(allProducts).find(".productinfo p").eq(randomNum).should("exist").invoke("text").as("product" + i.toString() + "Name", { type: "static" });
          cy.wrap(allProducts).find(".productinfo a").eq(randomNum).should("have.text", "Add to cart").click();
          cy.get("#cartModal .modal-confirm").should("be.visible");
          cy.get('#cartModal .modal-confirm [data-dismiss="modal"]').click();
        };  
      });
      cy.get('.shop-menu ul li a[href*="cart"]').click();
      cy.get("#cart_info").should("exist").and("be.visible");
      for (let i = 1; i < 3; i++) {
        cy.get("#cart_info_table tbody tr").eq(i-1).then((productCartOverview)=>{
          cy.wrap(productCartOverview).find(".cart_description h4").invoke("text").as("productCart" + i.toString() + "Name", { type: "static" });
          cy.wrap(productCartOverview).find(".cart_price p").invoke("text").as("productCart" + i.toString() + "Price", { type: "static" });
        });
        // validate product information in cart overview
        cy.get("@productCart" + i.toString() + "Name").then((productCartName)=>{
          cy.get("@product" + i.toString() + "Name").then((productName)=>{
            expect(productCartName).to.eq(productName);
          });
        });
        cy.get("@productCart" + i.toString() + "Price").then((productCartPrice)=>{
          cy.get("@product" + i.toString() + "Price").then((productPrice)=>{
            expect(productCartPrice).to.eq(productPrice);
          });
        });
      };
    })  
  });
});