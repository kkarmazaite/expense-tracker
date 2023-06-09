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

  it('create account', () => {
    cy.get('[data-cy="account-creation-button"]').click();
    cy.get('[data-cy="account-creation-modal"]').should('exist');
    cy.get('[data-cy="account-creation-name-input"]').type("Test account")
    cy.get('[data-cy="account-creation-create-button"]').click()
    cy.get(':nth-child(3) > [data-cy="account"]').should('exist');
    cy.get(':nth-child(3) > [data-cy="account"] > [data-cy="account-name"]').contains('Test account');
  })

  it('delete account', () => {
    cy.get(':nth-child(3) > [data-cy="account"]').realHover('mouse');
    cy.get(':nth-child(3) > [data-cy="account-buttons"] > [data-cy="account-delete-button"]').click();
    cy.get(':nth-child(3) > [data-cy="account"]').should('not.exist');

  })

  it('logout', () => {
    cy.get('[data-cy="header-drop-down"]').realHover('mouse')
    cy.get('[data-cy="logout-button"]').click()
    cy.get('[data-cy="login-page"]').should('exist');
  })
})