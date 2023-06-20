import {IAddress} from "../../../blockchain/src/shared/model/btc-address.types";
import { getGreeting } from '../support/app.po';

describe('Blockchain UX Application', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Blockchain Application');
    cy.get('#hashInput').should('exist');
    cy.get('#addressButton').should('exist');
    cy.get('#transactionButton').should('exist');
    cy.get('#submitButton').should('exist');
  });

  it('should have main menu and navigate to pages', () => {

    cy.get('#home-button').should('exist');
    cy.get('#subscriptions-button').should('exist');
    cy.get('#statistics-button').should('exist');

    cy.get('#subscriptions-button').click();
    cy.location('pathname', {timeout: 2000}).should('include', 'subscriptions');

    cy.get('#statistics-button').click();
    cy.location('pathname', {timeout: 2000}).should('include', 'statistics');
  });

  it('should show have address validation', () => {

    cy.get('#hashInput').should('exist');
    cy.get('#hashInput').type('Hello world');
    cy.get('#submitButton').click();
    cy.get('#error-messages').should('contain.text', 'Invalid BTC address')
    cy.get('#hashInput').clear();
    cy.get('#hashInput').type('1CPaziTqeEixPoSFtJxu74uDGbpEAotZom');
    cy.get('#error-messages').should('contain.text', '');
    cy.get('#hashInput').clear();
    cy.get('#error-messages').should('contain.text', 'BTC Address is required');

  });

  it('should show loaded address', () => {

    const data = {
      address: '1CPaziTqeEixPoSFtJxu74uDGbpEAotZom',
      final_balance: 1,
      hash160: 2,
      n_tx: 3,
      n_unredeemed: 4,
      total_received: 6,
      total_sent: 5
    }

    cy.intercept('POST', 'http://localhost:3000/api/btc-search', {
      statusCode: 200,
      body: data,
    })

    cy.get('#hashInput').should('exist');
    cy.get('#hashInput').type(data.address);
    cy.get('#submitButton').click();
    cy.get('#address-details-container').should('contain.text', 'Address Details');
    cy.wait(1000);
    cy.get('#address-textfield').should('exist').should('have.value', data.address);
    cy.get('#current-balance-textfield').should('exist').should('contain.value', data.final_balance.toString(10));
    cy.get('#total-recieved-textfield').should('exist').should('contain.value', data.total_received.toString(10));
    cy.get('#total-spent-textfield').should('exist').should('contain.value', data.total_sent.toString(10));

  });

});
