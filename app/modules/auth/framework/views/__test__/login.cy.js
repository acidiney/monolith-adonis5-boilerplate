/// <reference types="cypress" />

describe('Login', function () {
  it("should authenticate", () => {
    cy.visit("/auth/login")
      .get('input[name="username"]')
      .type("root@itgest.co.ao")
      .get('input[type="password"]')
      .type("12345678")
      .get('button[type="submit"]')
      .click()
      .url()
      .should("include", "account/dashboard");
  });

  it("should return error, when user credentials are wrong", () => {
    cy.visit("/auth/login")
      .get('input[name="username"]')
      .type("invalid@itgest.co.ao")
      .get('input[type="password"]')
      .type("12345678")
      .get('button[type="submit"]')
      .click()
      .get(".alert-danger")
      .should("be.visible");
  });
})
