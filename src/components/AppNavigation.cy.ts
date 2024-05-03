import AppNavigation from './AppNavigation.vue'

describe('<AppNavigation />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AppNavigation, {
      props: {
        favoriteBooks: ['book1', 'book2', 'book3']
      }
    })
  })

  it('shows the correct number of favorite books', () => {
    cy.mount(AppNavigation, {
      props: {
        favoriteBooks: ['book1', 'book2', 'book3']
      }
    })

    cy.get('.mainnav-number').should('have.text', '3')
  })

  it('shows 0 when there are no favorite books', () => {
    cy.mount(AppNavigation, {
      props: {
        favoriteBooks: []
      }
    })

    cy.get('.mainnav-number').should('have.text', '0')
  })

  it('when the active link is home, it is highlighted', () => {
    cy.mount(AppNavigation, {
      props: {
        favoriteBooks: []
      }
    })

    cy.get('[data-testid="home-link"]').should('have.class', 'mainnav-link--active')
    cy.get('[data-testid="favorites-link"]').should('not.have.class', 'mainnav-link--active')
  })

  it('when the active link is favorites, it is highlighted', () => {
    cy.mount(AppNavigation, {
      props: {
        favoriteBooks: []
      }
    })

    cy.get('[data-testid="favorites-link"]').click()
    cy.get('[data-testid="home-link"]').should('not.have.class', 'mainnav-link--active')
    cy.get('[data-testid="favorites-link"]').should('have.class', 'mainnav-link--active')
  })
})