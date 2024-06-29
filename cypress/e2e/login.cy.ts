describe('validando_login', () => {
  
  it('passes', () => {
     cy.visit('localhost:8100/login')
  })
/*
  it('Ingresar email', () =>{
    cy.visit('localhost:8100/login')
    const email = 'leo@email.com'

    cy.get('#ion-input-0').type(`${email}`)
    cy.get('#ion-input-0').should('have.value', `${email}`)
  })

  it('Ingresar contraseña', () =>{
    cy.visit('localhost:8100/login')
    const pw = '123456'

    cy.get('#ion-input-1').type(`${pw}`)
    cy.get('#ion-input-1').should('have.value', `${pw}`)
  })
*/
  it('Iniciar sesion', () =>{
    cy.visit('localhost:8100/login')
    const email = 'leo@email.com'
    cy.get('#ion-input-0').type(`${email}`)
    
    const pw = '123456'
    cy.get('#ion-input-1').type(`${pw}`)

    cy.contains('Iniciar sesión').should('have.text',' Iniciar sesión ').click()
  })

})