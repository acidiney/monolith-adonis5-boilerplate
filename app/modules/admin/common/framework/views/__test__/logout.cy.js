describe('Logout', function () {
  it('should do logout', () => {
    cy.visit('/auth/login')
      .get('input[type="email"]').type('root@itgest.co.ao')
      .get('input[type="password"]').type('12345678')
      .get('button[type="submit"]').click()
      .url().should('include', 'account/dashboard')
      .get('.user-dropdown').click().get('.button-logout').click()
      .get('.alert-success').should('be.visible')
  })
})
