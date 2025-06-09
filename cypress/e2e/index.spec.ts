describe('Basic flow', () => {
	beforeEach(() => {
		cy.viewport('samsung-s10')
	})

	it('Should render app correctly', () => {
		cy.visit('/')
	})

	it(`should have sinks button`, () => {
		cy.visit('/')
		cy.findByTestId('goto-sinks-page').should('exist')
	})
})
