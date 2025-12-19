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
    cy.contains('log in').click()
    cy.get('#username').type('root')
    cy.get('#password').type('salainen')
    cy.get('login').click()

    cy.contains('Superuser logged in')
  })
})
