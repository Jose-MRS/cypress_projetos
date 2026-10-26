describe('Login', () => {

  beforeEach(() => {
    cy.visit('https://wipe.dockingideas.me/login');
    cy.fixture('example').as('dadosLogin');
  })

   it('permite entrar com credenciais válidas', () => {
    cy.get('@dadosLogin').then((dados) => {
      cy.login(dados.credenciaisValidas);
      cy.wait(2000);
      cy.url().should('include','/home');
    })
  })


})