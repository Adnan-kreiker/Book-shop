import BooksTable from './BooksTable.vue'

describe('<BooksTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BooksTable, {
      props: {
        books: [],
        isLoading: false
      }
    })
  })

  it('when no books are passed, it shows a an empty state message', () => {
    cy.mount(BooksTable, {
      props: {
        books: [],
        isLoading: false
      }
    })

    cy.get('p').should('have.text', 'No books found!')
  })

  it('shows the correct number of books', () => {
    cy.mount(BooksTable, {
      props: {
        books: [
          {
            title: 'book1',
            isbn: 'isbn1',
            publisher: 'publisher1'
          },
          {
            title: 'book2',
            isbn: 'isbn2',
            publisher: 'publisher2'
          },
          {
            title: 'book3',
            isbn: 'isbn3',
            publisher: 'publisher3'
          }
        ],
        isLoading: false
      }
    })
    cy.get('tbody tr').should('have.length', 3)
  })

  it.skip('clicking the favorite button emits the favorite event', () => {
    const favoriteSpy = cy.spy().as('favoriteSpy')
    cy.mount(BooksTable, {
      props: {
        books: [
          {
            title: 'book1',
            isbn: 'isbn1',
            publisher: 'publisher1'
          }
        ],
        isLoading: false,
        'toggleFavorite': favoriteSpy
      }
    })

    cy.get('[data-testid="fav-btn"]').click()
    cy.get('@favoriteSpy').should('be.calledWith', 'isbn1')
  })

  it.skip('clicking the details button navigates to the details page', () => {
    const navigateToDetailsSpy = cy.spy().as('navigateToDetailsSpy')
    cy.mount(BooksTable, {
      props: {
        books: [
          {
            title: 'book1',
            isbn: 'isbn1',
            publisher: 'publisher1'
          }
        ],
        isLoading: false,
        'navigateToDetail':  navigateToDetailsSpy,
      }
    })

    cy.get('[data-testid="details-btn"]').click()
    cy.get('@navigateToDetailsSpy').should('be.calledWith', 'isbn1')
  })

})