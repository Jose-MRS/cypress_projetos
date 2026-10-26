Cypress.Commands.add('login', ({ email, senha }) => {
  cy.get('[name="email"]').type(email)
  cy.get('[name="senha"]').type(senha)
  cy.get('.btn-entrar > span').click()
})