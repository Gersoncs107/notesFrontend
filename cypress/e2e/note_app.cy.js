describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:5173/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:5173/api/users/', user)
    cy.visit('http://localhost:5173/')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:5173/')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

   it('login form can be opened', function() {
    cy.visit('http://localhost:5173/')
    cy.contains('log in').click()
  })

  it('user can login', function() {
    cy.visit('http://localhost:5173/')
    cy.contains('log in').click()
    cy.get('#username').type('root')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Superuser logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:5173/')
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Superuser logged in').should('be.visible')
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#note-input').should('be.visible')
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress')
          .contains('make important')
      })
    })
  })

  it.only('login fails with wrong password', function() {
    cy.visit('http://localhost:5173/')
    cy.contains('log in').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('wrong credentials')
  })
})

//npm run cypress:open