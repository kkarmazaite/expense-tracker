/// <reference types="cypress-real-events" />
import { displayCurrency } from '~~/helpers/displayCurrency';

interface testUser {
  email: string
  password: string
}
interface testAccount {
  name: string
}
interface testTransaction {
  amount: number
  categoryName: string
  categoryType: string
  categoryIcon: number
  categoryColor: number
}

const testUser: testUser = {
  email: 'test@gmail.com',
  password: 'password',
}
const testAccount: testAccount = {
  name: 'Test account',
}
const testTransactions: testTransaction[] = [ 
  {
    amount: 1000,
    categoryName: 'Test income category',
    categoryType: 'Income',
    categoryIcon: 2,
    categoryColor: 2,
  },
  {
    amount: 500,
    categoryName: 'Test expense category',
    categoryType: 'Expense',
    categoryIcon: 1,
    categoryColor: 1,
  },
]

describe('Testing main user flow', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('login', () => {
    cy.get('[data-cy="login-page"]').should('exist');
    cy.get('[data-cy="login-input-email"]').type(`${testUser.email}`)
    cy.get('[data-cy="login-input-password"]').type(`${testUser.password}`)
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="main-page"]').should('exist');
  })

  it('create account', () => {
    cy.get('[data-cy="account-list"]').then(($accountList) => {
      const accountCount = $accountList.length

      cy.get('[data-cy="account-creation-button"]').click();
      cy.get('[data-cy="account-creation-modal"]').should('exist');
      cy.get('[data-cy="account-creation-name-input"]').type(`${testAccount.name}`)
      cy.get('[data-cy="account-creation-create-button"]').click()
      cy.get('[data-cy="account-list"]').should('have.length', accountCount+1)
    })
    cy.get('[data-cy="account-list"]').last().find('[data-cy="account-name"]').contains(`${testAccount.name}`)
  })

  it('select account', () => {
    cy.get('[data-cy="account-list"]').last().click()
  })

  testTransactions.forEach((transaction, idx) => {
    it(`create category - ${transaction.categoryType}`, () => {
      cy.get('[data-cy="category-creation-button"]').click();
      cy.get('[data-cy="category-creation-modal"]').should('exist');
      cy.get('[data-cy="category-creation-type-input"] select').select(transaction.categoryType);
      cy.get('[data-cy="category-creation-name-input"]').type(transaction.categoryName)
      cy.get(`[data-cy="category-creation-icon-list"] > :nth-child(${ transaction.categoryIcon })`).click()
      cy.get(`[data-cy="category-creation-color-list"] > :nth-child(${ transaction.categoryColor })`).click()
      cy.get('[data-cy="category-creation-create-button"').click()
      cy.get(`:nth-child(${ idx+1 }) > [data-cy="category"]`).should('exist');
      cy.get(`:nth-child(${ idx+1 }) > [data-cy="category"] [data-cy="category-name"]`).contains(transaction.categoryName);
    })
  
    it(`create transaction - ${transaction.categoryType}`, () => {
      cy.get('[data-cy="transaction-creation-button"]').click();
      cy.get('[data-cy="transaction-creation-modal"]').should('exist');
      cy.get('[data-cy="transaction-creation-category-input"] select').select(transaction.categoryName);
      cy.get('[data-cy="transaction-creation-amount-input"]').type(transaction.amount.toString());
      cy.get('[data-cy="transaction-creation-create-button"').click()
      cy.get(`:nth-child(${ idx+1 }) > [data-cy="transaction"]`).should('exist');
      cy.get(`:nth-child(${ idx+1 }) > [data-cy="transaction"] [data-cy="transaction-name"]`).contains(transaction.categoryName);
    })
  });

  it(`check months`, () => {
    const income = testTransactions.reduce((acc, transaction) => {
      if (transaction.categoryType === 'Income') acc += transaction.amount;
      return acc;
    }, 0)
    const expense = testTransactions.reduce((acc, transaction) => {
      if (transaction.categoryType === 'Expense') acc += transaction.amount;
      return acc;
    }, 0)

    cy.get('[data-cy="statistics-income"]').should("have.text", displayCurrency(income))
    cy.get('[data-cy="statistics-expense"]').should("have.text", displayCurrency(expense))
    cy.get('[data-cy="statistics-next-month-button"]').click();
    cy.get('[data-cy="statistics-income"]').should("have.text", displayCurrency(0))
    cy.get('[data-cy="statistics-expense"]').should("have.text", displayCurrency(0))
    cy.get('[data-cy="statistics-previous-month-button"]').click();
    cy.get('[data-cy="statistics-income"]').should("have.text", displayCurrency(income))
    cy.get('[data-cy="statistics-expense"]').should("have.text", displayCurrency(expense))
    
  })

  testTransactions.forEach(transaction => {
    it(`delete transaction - ${transaction.categoryType}`, () => {
      cy.get(`:nth-child(1) > [data-cy="transaction"]`).realHover();
      cy.get(`:nth-child(1) > [data-cy="transaction-buttons"] > [data-cy="transaction-delete-button"]`).click();
      cy.get(`:nth-child(1) > [data-cy="transaction"]`).should('not.exist');
    })

    it(`delete category - ${transaction.categoryType}`, () => {
      cy.get(`:nth-child(1) > [data-cy="category"]`).realHover();
      cy.get(`:nth-child(1) > [data-cy="category-buttons"] > [data-cy="category-delete-button"]`).click();
      cy.get(`:nth-child(1) > [data-cy="category"]`).should('not.exist');
    })
  })

  it('delete account', () => {
    cy.get(':nth-child(2) > [data-cy="account"]').realHover();
    cy.get(':nth-child(2) > [data-cy="account-buttons"] > [data-cy="account-delete-button"]').click();
    cy.get(':nth-child(2) > [data-cy="account"]').should('not.exist');
  })

  it('logout', () => {
    cy.get('[data-cy="header-drop-down"]').realHover()
    cy.get('[data-cy="logout-button"]').click()
    cy.get('[data-cy="login-page"]').should('exist');
  })
})