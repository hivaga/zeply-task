import { getGreeting } from '../support/app.po';

describe('blockchain', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Blockchain Application');
    cy.get('#hashInput').should('exist');
    cy.get('#addressButton').should('exist');
    cy.get('#transactionButton').should('exist');
    cy.get('#submitButton').should('exist');
  });
});
