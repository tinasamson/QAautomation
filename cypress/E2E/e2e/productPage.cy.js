describe('Product Page', () => {
  beforeEach(() => {
    cy.gotoAEUrl('/products');
    cy.allProducts();
  });

  it('Test case 2: View all products in product page and verify product information in product detail page.', () => {
    cy.get('.product-image-wrapper').as('allProducts');
    cy.get('@allProducts').then((allProducts) => {
      const numProducts = allProducts.length;
      cy.randomNum(numProducts).then((randomNum) => {
        cy.wrap(allProducts)
          .find('.productinfo h2')
          .eq(randomNum)
          .should('exist')
          .invoke('text')
          .as('productPrice');
        cy.wrap(allProducts)
          .find('.productinfo p')
          .eq(randomNum)
          .should('exist')
          .invoke('text')
          .as('productName');
        cy.wrap(allProducts)
          .find('.productinfo a')
          .eq(randomNum)
          .should('have.text', 'Add to cart');
        cy.wrap(allProducts)
          .find('.choose')
          .eq(randomNum)
          .contains('View Product')
          .click();
      });
    });
    cy.validateAEUrl('/product_details');

    // Validate product detail information
    cy.get('@productPrice').then((priceProductList) => {
      cy.get('.product-information span span')
        .invoke('text')
        .then((priceProductDetail) => {
          expect(priceProductList).to.eq(priceProductDetail);
        });
    });

    cy.get('@productName').then((nameProductList) => {
      cy.get('.product-information h2')
        .invoke('text')
        .then((nameProductDetail) => {
          expect(nameProductList).to.eq(nameProductDetail);
        });
    });
    const productInfo = ['Category:', 'Availability', 'Condition', 'Brand'];
    cy.get('.product-information p').each((productDetail, index) => {
      cy.wrap(productDetail).contains(productInfo[index]);
    });
    // To validate without each() ->
    // cy.get(".product-information p").eq(0).contains("Category:");
    // cy.get(".product-information p").eq(1).contains("Availability");
    // cy.get(".product-information p").eq(2).contains("Condition");
    // cy.get(".product-information p").eq(3).contains("Brand");
  });

  it('Test case 3: Filter with a category the product list page', () => {
    cy.get('.product-image-wrapper')
      .its('length')
      .as('allProducts', { type: 'static' });
    cy.get('.category-products').should('exist').and('not.be.empty');
    cy.get('.category-products [data-toggle="collapse"]').then((categories) => {
      cy.randomNum(categories.length).then((randomCategory) => {
        cy.wrap(categories)
          .eq(randomCategory)
          .invoke('text')
          .as('categoryName');
        cy.wrap(categories).eq(randomCategory).click();
      });
    });
    cy.get('@categoryName').then((categoryName) => {
      cy.get(`#${categoryName.trim()} .panel-body ul li a`).then((filters) => {
        cy.randomNum(filters.length).then((randomfilters) => {
          cy.wrap(filters).eq(randomfilters).click();
        });
      });
    });
    cy.validateAEUrl('/category_products');
    cy.get('.product-image-wrapper')
      .its('length')
      .as('filterProducts', { type: 'static' });
    cy.get('@allProducts').then((allProducts) => {
      cy.get('@filterProducts').then((filterProducts) => {
        expect(allProducts).to.gte(filterProducts);
      });
    });
  });

  it('Test case 4: Filter products by brand', () => {
    cy.get('.brands_products').should('exist').and('not.be.empty');
    cy.get('.brands_products h2').should('have.text', 'Brands');
    cy.get('.brands_products li a').as('brandFilters');
    cy.get('@brandFilters').then((brands) => {
      cy.randomNum(brands.length).then((randomIndex) => {
        cy.wrap(brands)
          .eq(randomIndex)
          .then((brand) => {
            let nameBrand = brand.text();
            cy.wrap(nameBrand.split(')')[1]).as('brandName');
          });
        cy.wrap(brands)
          .find('span')
          .eq(randomIndex)
          .invoke('text')
          .then((brandProducts) => {
            let numProd = Number(
              brandProducts.slice(1, brandProducts.length - 1)
            );
            cy.wrap(numProd).as('numProdBrand');
          });
        cy.wrap(brands).eq(randomIndex).click();
      });
    });
    cy.validateAEUrl('brand_products/');
    cy.get('@brandName').then((brandName) => {
      cy.get('h2.title').should('contain', brandName);
    });
    cy.get('.product-image-wrapper').then((products) => {
      cy.get('@numProdBrand').then((numProdBrand) => {
        expect(products.length).to.equal(numProdBrand);
      });
      cy.randomNum(products.length).then((randomIndex) => {
        cy.wrap(products).eq(randomIndex).contains('View Product').click();
      });
    });
    cy.validateAEUrl('/product_details');
    cy.get('@brandName').then((brandName) => {
      cy.get('.product-information p')
        .last()
        .invoke('text')
        .then((brandInfo) => {
          expect(brandInfo).to.contain(brandName);
        });
    });
  });

  it('Test case 5: Search for a product', () => {
    const searchText = 'jeans';
    cy.get('input#search_product').type(searchText);
    cy.get('button#submit_search').click();
    cy.get('h2.title').should('have.text', 'Searched Products');
    cy.location('search').should('contain', searchText);
    cy.get('.product-image-wrapper').as('productItems');
    cy.get('@productItems').each((item) => {
      cy.wrap(item)
        .find('.productinfo p')
        .invoke('text')
        .then((productName) => {
          expect(productName.toLowerCase()).to.contain(searchText);
        });
    });
  });
});
