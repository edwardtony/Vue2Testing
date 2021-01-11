// https://docs.cypress.io/api/introduction/api.html

const CORRECT_EMAIL = 'correct@email.com'
const CORRECT_PASSWORD = 'strongEnough'
const WRONG_PASSWORD = 'short'


// https://docs.cypress.io/api/commands/type.html
// https://docs.cypress.io/api/commands/type.html#Arguments
// https://www.cypress.io/blog/2017/11/28/testing-vue-web-application-with-vuex-data-store-and-rest-backend/
describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')

    // Login Section
    cy.contains('h2', 'Log in')

    cy.get('#email-input').type(CORRECT_EMAIL)
    cy.get('#password-input').type(CORRECT_PASSWORD)
    cy.get('#re_password-input').type(WRONG_PASSWORD)
    cy.get('button').click()

    cy.get('.error-message').should('exist')

    cy.get('#re_password-input').clear().type(CORRECT_PASSWORD)
    cy.get('button').click()

    // TO-DO Section
    cy.contains('h2', 'TODO')
    const input = cy.get('input[type="text"]')
    input.type('New item')
    input.type('{enter}')
    cy.get('.todo__item').last().should('have.text', 'New item')

    cy.get('.todo__item').should('have.length', 4)
    cy.get('.todo__item--checked').should('have.length', 2)
    cy.get('input:checked').should('have.length', 2)
    
    cy.get('input').first().check()
    cy.get('input:checked').should('have.length', 3)
    
    cy.get('.todo__item').first().should('have.class', 'todo__item--checked')
    cy.get('.todo__item .todo__label').first().should('have.css', 'text-decoration').and('eq', 'line-through solid rgb(205, 133, 63)')

  })
})
