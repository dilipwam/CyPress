describe('User Log In', () => {
  it('Open Web page', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#username').type('Heath93');
    cy.get('#password').type('s3cret');
    cy.get('[data-test="signin-submit"]').click();
  });
});
