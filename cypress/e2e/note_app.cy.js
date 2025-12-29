describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('root')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Superuser logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('a new note can be created', function () {
      cy.contains('button', 'new note').should('be.visible').click()
      cy.contains('button', 'cancel').should('be.visible') // garante que o form abriu

      cy.get('#note-input').type('a note created by cypress')
      cy.contains('button', 'save').click()

      cy.contains('li.note', 'a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function () {
        cy.contains('li.note', 'another note cypress')
          .find('button')
          .should('have.text', 'make not important')
          .click()

        cy.contains('li.note', 'another note cypress')
          .find('button')
          .should('have.text', 'make important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('li.note', 'second note')
          .find('button')
          .should('have.text', 'make important')
          .click()

        cy.contains('li.note', 'second note')
          .find('button')
          .should('have.text', 'make not important')
      })
    })
  })

  // Teste comentado de login com senha errada (descomente quando quiser testar)
  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Superuser logged in')
  })

    it.only('then example', function() {
    cy.get('button').then( buttons => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
  })
})