/// <reference types="cypress" />

describe('SendResetPasswordLink', () => {
  it('should send reset password link', () => {
    cy.visit("auth/reset/password")
      .get('input[name="username"]')
      .type("root@itgest.co.ao")
      .get('button[type="submit"]')
      .click()
      .get(".alert-success")
      .should("be.visible");
  })

  it('should return error, when username does not exist', () => {
    cy.visit("auth/reset/password")
      .get('input[name="username"]')
      .type("invalid@itgest.co.ao")
      .get('button[type="submit"]')
      .click()
      .get(".alert-danger")
      .should("be.visible");
  })
})
