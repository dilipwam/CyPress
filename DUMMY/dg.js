import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

//
// give a spec def for feature File
//

describe('DuckDuckGo Search Feature', () => {
  Given('I am on the DuckDuckGo homepage', () => {
    cy.visit('https://duckduckgo.com/');
  });

  When('I search for {string}', (searchTerm) => {
    cy.get('input[name="q"]').type(`${searchTerm}{enter}`);
  });

  Then('I should see results related to {string}', (expected) => {
    cy.get('#links').should('exist');
    cy.contains(expected).should('exist');
  });
});
