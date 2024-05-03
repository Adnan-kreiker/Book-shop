import BooksSearch from './BooksSearch.vue'

describe('<BooksSearch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BooksSearch)
  })

  it('emits the search event', () => {
    const searchSpy = cy.spy().as('searchByBookTitle')
    cy.mount(BooksSearch, {
      props:{
        'onUpdate:modelValue': searchSpy,
      }
    })
    cy.get('input').type('search term')
    cy.get('@searchByBookTitle').should('be.calledWith', 'search term')

  })
})