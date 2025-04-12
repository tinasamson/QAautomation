// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("gotoAEUrl", (route)=>{
  cy.visit(`https://www.automationexercise.com${route}`)
})

Cypress.Commands.add("validateAEUrl", (route)=>{
  cy.location("pathname").should("contain", `${route}`);
})

Cypress.Commands.add("allProducts", ()=>{
  cy.get("h2.title").should("exist").should("have.text", "All Products");
  cy.get(".product-image-wrapper").its("length").should("be.gt", 0);
})

Cypress.Commands.add("randomNum", (number)=>{
  let randomNum = Math.floor(Math.random() * number);
  return randomNum
})

Cypress.Commands.add("twoRandomNum", (number)=>{
  let randomNum1 = Math.floor(Math.random() * number);
  let randomNum2 = Math.floor(Math.random() * number);
  do{
    randomNum2 = Math.floor(Math.random() * number);
  } while(randomNum1 === randomNum2)
  return {randomNum1, randomNum2}
})