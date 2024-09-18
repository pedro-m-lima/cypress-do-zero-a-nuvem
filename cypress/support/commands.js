Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('input[id="firstName"]').type('Pedro')
    cy.get('input[id="lastName"]').type('Lima')
    cy.get('input[id="email"]').type('pedromlima.pm@gmail.com')
    cy.get('input[id="phone"]').type('null')
    cy.get('textarea[id="open-text-area"]').type('Curso Cypress do zero a nuvem', {delay:0})
    cy.get('button[type="submit"]').click('center')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithArgument', data =>{
    cy.get('input[id="firstName"]').type(data.firstName)
    cy.get('input[id="lastName"]').type(data.lastName)
    cy.get('input[id="email"]').type(data.email)
    cy.get('input[id="phone"]').type(data.phone)
    cy.get('textarea[id="open-text-area"]').type(data.text, {delay:0})
    cy.get('button[type="submit"]').click('center')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitFixedArgument', (data = {
    firstName:'Pteste',
    lastName: 'Lteste',
    email: 'teste@teste.com',
    phone: '123456789',
    text: 'teste.'
    }) =>{
    cy.get('input[id="firstName"]').type(data.firstName)
    cy.get('input[id="lastName"]').type(data.lastName)
    cy.get('input[id="email"]').type(data.email)
    cy.get('input[id="phone"]').type(data.phone)
    cy.get('textarea[id="open-text-area"]').type(data.text, {delay:0})
    cy.get('button[type="submit"]').click('center')
})


Cypress.Commands.add('validateSucessMessage', () =>{
    cy.get('.success')
    .should('be.visible')
    .should('contain', 'Mensagem enviada com sucesso.')      
})

Cypress.Commands.add('validateErrorMenssage', ()=> {
    cy.get('.error')
    .should('be.visible')
})