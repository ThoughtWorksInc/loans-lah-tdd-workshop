describe('Loans Lah', function() {
  it('applies new loan successfully', function() {
    const currentTimestamp = new Date().getTime();
    const username = `u${currentTimestamp}`;
    const password = `${currentTimestamp}`;
    cy.log(`Running test with user ${username}/${password}...`);

    cy.visit('http://localhost:3000', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear()
      }
    });

    cy.contains('Register now!').click();
    cy.url().should('include', '/register');

    cy.get('#formUsername').type(username);
    cy.get('#formPassword').type(password);
    cy.get('form').submit();

    cy.url().should('include', '/login');
    cy.get('#formUsername').type(username);
    cy.get('#formPassword').type(password);
    cy.get('form').submit();

    cy.url().should('include', '/loans');
    cy.contains('Apply Now!').click();
    cy.url().should('include', '/loans/new');

    cy.get('#formAmount').type(1000);
    cy.get('#formDuration').select('6 months');
    cy.get('form').submit();

    cy.url().should('include', '/loans');

    cy.contains('tr', '1000')
      .find('a')
      .as('loanDetailsLink');
        
    cy.get('@loanDetailsLink').click();
    cy.contains('Amount').should('be.visible');
    cy.contains('1000').should('be.visible');
    cy.contains('Interest rate').should('be.visible');
    cy.contains('5%').should('be.visible');
    cy.contains('Outstanding amount').should('be.visible');
    cy.contains('1050').should('be.visible');
  });
});