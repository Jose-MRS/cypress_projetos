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

  it('recusa usuário válido com senha incorreta', () => {
    cy.get('@dadosLogin').then((dados) => {
      cy.login(dados.usuarioValidoSenhaIncorreta);
      cy.wait(2000);
      cy.url().should('include', '/login');
      cy.get('[name="email"]').should('be.visible');
      cy.get('[name="senha"]').should('be.visible');
    })
  })

  it('recusa usuário e senha incorretos', () => {
    cy.get('@dadosLogin').then((dados) => {
      cy.login(dados.usuarioESenhaIncorretos);
      cy.wait(2000);
      cy.url().should('include', '/login');
      cy.get('[name="email"]').should('be.visible');
      cy.get('[name="senha"]').should('be.visible');
    })
  })

  it('realiza o logout da sessão, após realizar o login', ()=>{
    cy.get('@dadosLogin').then((dados) => {
      cy.login(dados.credenciaisValidas)
      cy.get('.btn-perfil').click();
      cy.get('.btn-sair').click();
      cy.wait(2000)
      cy.url().should('include','/login');
    })
    
  })
  it('Deve deslogar o usuário após 15 minutos de inatividade', () => {
    cy.get('@dadosLogin').then((dados) => {
      cy.login(dados.credenciaisValidas);
      cy.wait(2000)
      cy.url().should('include', '/home');
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.reload();
      cy.wait(2000)
      cy.url().should('include', '/login');
    })
  })




})
