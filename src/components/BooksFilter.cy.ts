import BooksFilter from './BooksFilter.vue'

describe('<BooksFilter />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BooksFilter)
  })

  it('shows the correct number of publishers', () => {
    cy.mount(BooksFilter, {
      props: {
        bookPublishers: ['publisher1', 'publisher2', 'publisher3']
      }
    })

    cy.get('option').should('have.length', 4)
  })

  it('shows only `-` option when there are no publishers', () => {
    cy.mount(BooksFilter, {
      props: {
        bookPublishers: []
      }
    })

    cy.get('option').should('have.length', 1).and('have.text', '-')
  })

  it('selects the correct publisher', () => {
    const updatePublisherSpy = cy.spy().as('updatePublisherSpy')

    cy.mount(BooksFilter, {
      props: {
        bookPublishers: ['publisher1', 'publisher2', 'publisher3'],
        'onUpdate:modelValue': updatePublisherSpy
      }
    })

    cy.get('select').select('publisher1').should('have.value', 'publisher1')
    cy.get('@updatePublisherSpy').should('be.calledWith', 'publisher1')
    cy.get('select').select('publisher2').should('have.value', 'publisher2')
    cy.get('@updatePublisherSpy').should('be.calledWith', 'publisher2')
    cy.get('select').select('publisher3').should('have.value', 'publisher3')
    cy.get('@updatePublisherSpy').should('be.calledWith', 'publisher3')
  })
})