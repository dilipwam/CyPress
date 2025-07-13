const { Then } = require('@badeball/cypress-cucumber-preprocessor');
const loginPage = require('/pages/LoginPage');

Given('I am on the login page', () => {
  loginPage.visit();
});

When('I enter username {string} and password {string}', (username, password) => {
  loginPage.fillUsername(username);
  loginPage.fillPassword(password);
});

When('I submit the login form', () => {
  loginPage.submit();
});

Then('I should be redirected to the dashboard', () => {
  cy.url().should('include', '/dashboard');
});