describe('Testing main user flow', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('login', () => {
    cy.get('[data-cy="login-page"]').should('exist');
    cy.get('[data-cy="login-input-email"]').type("dev@gmail.com")
    cy.get('[data-cy="login-input-password"]').type("password")
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="main-page"]').should('exist');
  })
})