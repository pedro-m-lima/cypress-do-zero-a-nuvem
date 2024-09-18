//Describe é a Suite de teste
describe('Central de Atendimento ao cliente TAT', () => {
    
  beforeEach(()=>{

    cy.visit('./src/index.html')

  })
//O it é o caso de teste
  it('Verifica o titulo da pagina', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[id="firstName"]').type('Pedro')
    cy.get('input[id="lastName"]').type('Lima')
    cy.get('input[id="email"]').type('pedromlima.pm@gmail.com')
    cy.get('input[id="phone"]').type('null')
    cy.get('textarea[id="open-text-area"]').type('Curso Cypress do zero a nuvem', {delay:0})
    cy.contains('button', 'Enviar').click()
    // para validar apenas se o componente existe utilixar should.('be.visible')  
    cy.get('.success')
      .should('be.visible')
      .should('contain', 'Mensagem enviada com sucesso.')      

    })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[id="firstName"]').type('Pedro')
    cy.get('input[id="lastName"]').type('Lima')
    cy.get('input[id="email"]').type('pedromlima.pm')
    cy.get('textarea[id="open-text-area').type('Curso Cypress do zero a nuvem', {delay:0})
    cy.get('.button').click('center')
    cy.contains('button', 'Enviar').click()
    cy.get('.error')
      .should('contain', 'Valide os campos obrigatórios!')

    })

  it('validar numero de telefone vazio quando não informa valores numericos', () => {
    cy.get('input[id="phone"]')
      .type('aaaa')
      .should('have.value', '')

    })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="firstName"]').type('Pedro')
    cy.get('input[id="lastName"]').type('Lima')
    cy.get('input[id="email"]').type('pedromlima.pm')
    cy.get('textarea[id="open-text-area"]').type('Curso Cypress do zero a nuvem', {delay:0})
    cy.get('input[id="phone-checkbox"]').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error')
      .should('be.visible')
      .should('contain', 'Valide os campos obrigatórios!')
  
    })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[id="firstName"]')
      .type('Pedro')
      .should('have.value', 'Pedro')
      .clear()
      .should('have.value', '')
    cy.get('input[id="lastName"]')
      .type('Lima')
      .should('have.value', 'Lima')
      .clear()
      .should('have.value', '')
    cy.get('input[id="email"]')
      .type('pedromlima.pm@gmai.com')
      .should('have.value', 'pedromlima.pm@gmai.com')
      .clear()
      .should('have.value', '')
    cy.get('input[id="phone"]')
      .type('14996294919')
      .should('have.value', '14996294919')
      .clear()
      .should('have.value', '')

    })
      
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button').click('center')
    cy.get('.error')
    .should('be.visible')  
    .should('contain', 'Valide os campos obrigatórios!')

    })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const other = {
      firstName: 'Pedro',
      lastName: 'Lima',
      email: 'pedro@gmail.com',
      phone: '123456789',
      text: 'Curso Cypress do zero a nuvem.'
    }
    
    //cy.fillMandatoryFieldsAndSubmitWithArgument(data);
    //cy.fillMandatoryFieldsAndSubmit()
    cy.fillMandatoryFieldsAndSubmitFixedArgument()
    cy.validateSucessMessage()

    })

  it('seleciona um produto (YouTube) por seu texto',() =>{
    cy.get('select[id="product"]')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)',() =>{
    cy.get('select[id="product"]')
      .select('youtube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Blog) por seu índice', ()=>{
    cy.get('select')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    
    cy.get('input[type="radio"]')
      .each((tipoAtendimento)=>{
        
        cy.wrap(tipoAtendimento)
          .check()
          .should('be.checked', tipoAtendimento)
          .log(tipoAtendimento)
      })
  })

  it('marca ambos checkboxes, depois desmarca o último',()=>{
    cy.get('#check input[type="checkbox"]')
      .as('checkboxes')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste@teste.com')
    
    cy.get('span[class="phone-label-span required-mark"]').should('have.css','display','none')
    cy.get('#phone-checkbox')
      .check()
    cy.get('span[class="phone-label-span required-mark"]').should('not.have.css','display','none')
    
    cy.get('.button').click()
    cy.validateErrorMenssage()

  })

  it('seleciona um arquivo da pasta fixtures', ()=>{
    cy.get('#file-upload')
    .selectFile('./cypress/fixtures/example.json')
    .should(input =>{
      expect(input[0].files[0].name).to.eq('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', ()=>{
    cy.get('#file-upload')
    .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
    .should(input =>{
      expect(input[0].files[0].name).to.eq('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('exampleFile')
    cy.get('#file-upload')
    .selectFile('@exampleFile')
    .should(input =>{
      expect(input[0].files[0].name).to.eq('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('testa a página da política de privacidade de forma independente', () =>{
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
  })
})