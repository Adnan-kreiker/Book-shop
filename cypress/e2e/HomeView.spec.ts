describe('HomePage', () => {

  beforeEach(() => {
    cy.visit('/')
  })
  it('filtering by input shows only the expected books', () => {

    cy.get('input').type('Java')

    cy.get('tbody tr').should('have.length', 1)
  })

  it('filtering by publisher shows only the expected books', () => {

    cy.get('select').select('O\'Reilly Media')

    cy.get('tbody tr').should('have.length', 4)
  })

  it('filtering by input and publisher shows only the expected books', () => {

    cy.get('input').type('Java')
    cy.get('select').select('Leanpub')

    cy.get('tbody tr').should('have.length', 1)
  })

  it('clicking the favorite button adds the book to the favorites list', () => {

    cy.get('[data-testid="fav-btn"]').first().click()
    cy.get('[data-testid="fav-btn"]').eq(1).click()

    cy.get('.mainnav-number').should('have.text', '2')
  })

  it('clicking the favorite button twice removes the book from the favorites list', () => {

    cy.get('[data-testid="fav-btn"]').first().click()
    cy.get('.mainnav-number').should('have.text', '1')

    cy.get('[data-testid="fav-btn"]').first().click()
    cy.get('.mainnav-number').should('have.text', '0')
  })

  it('clicking the details button navigates to the details page', () => {

    cy.get('[data-testid="details-btn"]').first().click()

    cy.url().should('include', '/details')
  })

  it('the details page shows the expected book details', () => {
      
      cy.get('[data-testid="details-btn"]').first().click()
  
      cy.get('[data-testid="title"]').should('have.text', 'Java Web Scraping HandbookLearn advanced Web Scraping techniques')
      cy.get('[data-testid="publisher"]').should('have.text', 'Publisher: Leanpub')
      cy.get('[data-testid="author"]').should('have.text', 'Author:Kevin Sahin')
    })

  it('clicking the home link navigates to the home page', () => {
    cy.get('[data-testid="details-btn"]').first().click()

    cy.visit('/details/1001606140805')

    cy.get('[data-testid="home-link"]').click()

    cy.url().should('include', '/')
  })

  it('clicking the back button in the details page navigates to the home page', () => {
    cy.get('[data-testid="details-btn"]').first().click()

    cy.get('[data-testid="back-btn"]').click()

    cy.url().should('include', '/')
  })

  it('marking books as favorites then navigating to the favorites page shows the expected books', () => {
    cy.get('[data-testid="fav-btn"]').first().click()
    cy.get('[data-testid="fav-btn"]').eq(1).click()

    cy.get('[data-testid="favorites-link"]').click()

    cy.get('tbody tr').should('have.length', 2)
    cy.get('[data-testid="book-title"]').first().should('have.text', 'Java Web Scraping Handbook')
    cy.get('[data-testid="book-title"]').eq(1).should('have.text', 'Hacking Exposed Web 2.0')
  })

  it('searching for a book in the favorites page shows only the expected books', () => {
    cy.get('[data-testid="fav-btn"]').first().click()
    cy.get('[data-testid="fav-btn"]').eq(1).click()

    cy.get('[data-testid="favorites-link"]').click()

    cy.get('input').type('Java')

    cy.get('tbody tr').should('have.length', 1)
  })

  it('filtering by publisher in the favorites page shows only the expected books', () => {
    cy.get('[data-testid="fav-btn"]').first().click()
    cy.get('[data-testid="fav-btn"]').eq(1).click()

    cy.get('[data-testid="favorites-link"]').click()

    cy.get('select').select('Leanpub')

    cy.get('tbody tr').should('have.length', 1)
  })

  it('when there are no favorite books, the favorites page shows a message', () => {
    cy.get('[data-testid="favorites-link"]').click()

    cy.get('.empty-state').should('have.text', 'No books found!')
  })
})