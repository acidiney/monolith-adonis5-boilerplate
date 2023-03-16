/// <reference types="cypress" />

describe('ResetPassword', () => {
  it('should return token not found error', () => {
    //const fakeToken = crypto.randomUUID()

    cy.visit(`/auth/reset/password/fake-token`)
      .get('input[name="password"]')
      .type("123456789")
      .get('input[name="confirmPassword"]')
      .type("123456789")
      .get('button[type="submit"]')
      .click()
      .get("div.alert-danger")
      .should("be.visible");
  })
})
