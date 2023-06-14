describe('Testing main user flow', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('login', () => {
    cy.get('[data-cy="login-page"]').should('exist');
    cy.get('[data-cy="login-input-email"]').type("test@gmail.com")
    cy.get('[data-cy="login-input-password"]').type("password")
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="main-page"]').should('exist');
  })

  it('create account', () => {
    cy.get('[data-cy="account-creation-button"]').click();
    cy.get('[data-cy="account-creation-modal"]').should('exist');
    cy.get('[data-cy="account-creation-name-input"]').type("Test account")
    cy.get('[data-cy="account-creation-create-button"]').click()
    cy.get(':nth-child(2) > [data-cy="account"]').should('exist');
    cy.get(':nth-child(2) > [data-cy="account"] > [data-cy="account-name"]').contains('Test account');
  })

  it('create category', () => {
    cy.get(':nth-child(2) > [data-cy="account"]').click()
    cy.get('[data-cy="category-creation-button"]').click();
    cy.get('[data-cy="category-creation-modal"]').should('exist');
    cy.get('[data-cy="category-creation-type-input"] select').select('Income');
    cy.get('[data-cy="category-creation-name-input"]').type("Test income category")
    cy.get('[data-cy="category-creation-icon-list"] > :nth-child(1)').click()
    cy.get('[data-cy="category-creation-create-button"').click()
    cy.get(':nth-child(1) > [data-cy="category"]').should('exist');
    cy.get(':nth-child(1) > [data-cy="category"] [data-cy="category-name"]').contains('Test income category');
  })

  it('create transaction', () => {
    cy.get(':nth-child(2) > [data-cy="account"]').click()
    cy.get('[data-cy="transaction-creation-button"]').click();
    cy.get('[data-cy="transaction-creation-modal"]').should('exist');
    cy.get('[data-cy="transaction-creation-category-input"] select').select('Test income category');
    cy.get('[data-cy="transaction-creation-amount-input"]').type(1000);
    cy.get('[data-cy="transaction-creation-create-button"').click()
    cy.get(':nth-child(1) > [data-cy="transaction"]').should('exist');
    cy.get(':nth-child(1) > [data-cy="transaction"] [data-cy="transaction-name"]').contains('Test income category');
  })

  it('delete transaction', () => {
    cy.get(':nth-child(1) > [data-cy="transaction"]').realHover('mouse');
    cy.get(':nth-child(1) > [data-cy="transaction-buttons"] > [data-cy="transaction-delete-button"]').click();
    cy.get(':nth-child(1) > [data-cy="transaction"]').should('not.exist');
  })

  it('delete category', () => {
    cy.get(':nth-child(1) > [data-cy="category"]').realHover('mouse');
    cy.get(':nth-child(1) > [data-cy="category-buttons"] > [data-cy="category-delete-button"]').click();
    cy.get(':nth-child(1) > [data-cy="category"]').should('not.exist');
  })

  it('delete account', () => {
    cy.get(':nth-child(2) > [data-cy="account"]').realHover('mouse');
    cy.get(':nth-child(2) > [data-cy="account-buttons"] > [data-cy="account-delete-button"]').click();
    cy.get(':nth-child(2) > [data-cy="account"]').should('not.exist');
  })

  it('logout', () => {
    cy.get('[data-cy="header-drop-down"]').realHover('mouse')
    cy.get('[data-cy="logout-button"]').click()
    cy.get('[data-cy="login-page"]').should('exist');
  })
})