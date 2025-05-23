import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I visit duckduckgo', () => {
  cy.visit('https://www.duckduckgo.com');
});

Then('I should see a search bar for sure', () => {
  cy.get('input#searchbox_input')
    .should('be.visible')
    .should('have.attr', 'aria-label', 'Search with DuckDuckGo')
    .should('have.attr', 'placeholder', 'Search without being tracked');
});
