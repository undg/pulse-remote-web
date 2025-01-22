describe('Basic flow', () => {
	beforeEach(() => {
		cy.viewport('samsung-s10')
	})

	it('Should render app correctly', () => {
		cy.visit('/')
	})

	it(`should have output button`, () => {
		cy.visit('/')
		cy.findByTestId('goto-output-devices').should('exist')
	})
})
