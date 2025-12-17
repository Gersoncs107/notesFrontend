describe('Note app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:5173/')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('front page contains random text', function() {
    cy.visit('http://localhost:3000')
    cy.contains('wtf is this app?')
  })
})
