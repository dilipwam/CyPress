const loginPage = require('/pages/LoginPage');

describe('Login Test', () => {
  it('should log in with valid credentials', () => {
    loginPage.visit();
    loginPage.fillUsername('user');
    loginPage.fillPassword('pass');
    loginPage.submit();
    cy.url().should('include', '/dashboard');
  });
});