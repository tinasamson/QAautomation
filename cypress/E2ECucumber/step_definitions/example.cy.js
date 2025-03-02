import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";

Given("the user visits cypress example webpage", () => {
    cy.visit('/')
});

And("the user clicks on cypress-api", () => {
    cy.get('.navbar-nav a[href*="/cypress-api"]').as("navOptions")
    cy.get("@navOptions").click()
    
});

Then("the user is redirected to the documentation section", () => {
    cy.url().should("include", "cypress-api")
    cy.get("h1").invoke("text").as("titleBanner")
    cy.get("@titleBanner").should("eq", "Cypress API")
      .then((titleBanner) => {
        cy.get("@navOptions").invoke("text").then((nameNavOption) => {
            expect(titleBanner).to.eq(nameNavOption)
        })
      }
    )
});