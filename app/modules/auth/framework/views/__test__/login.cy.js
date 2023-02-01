describe('Login', function () {
  it('should authenticate', () => {
    cy.visit('/auth/login')
      .get('input[type="email"]').type('root@itgest.co.ao')
      .get('input[type="password"]').type('12345678')
      .get('button[type="submit"]').click()
      .url().should('include', 'account/dashboard')
  })

  it('should return error, when user credentials are wrong', () => {
    cy.visit('/auth/login')
      .get('input[type="email"]').type('invalid@itgest.co.ao')
      .get('input[type="password"]').type('12345678')
      .get('button[type="submit"]').click()
      .get('.alert-danger').should('be.visible')
  })
})
