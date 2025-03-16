describe('Login Page', () => {
    it('Test case 1: Login with correct user in login page.', () => {
      cy.visit("https://www.automationexercise.com/login");
      cy.get('[data-qa="login-email"]').type("testops@test.com");
      cy.get('[data-qa="login-password"]').type("password123");
      cy.get('[data-qa="login-button"]').click();
      cy.get(".shop-menu li a").last().should("have.text", " Logged in as testOps");
      cy.get("li [href='/logout']").should("have.text", " Logout");
    })
  })