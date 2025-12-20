describe('Note app', function() {
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
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#note-input').should('be.visible')
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
})
