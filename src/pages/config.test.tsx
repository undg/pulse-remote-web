import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Config } from './config'
import { testid } from '../constant'

describe(`<Config /> route`, () => {
	// Setup router context
	const renderWithRouter = (ui: React.ReactElement) => {
		return render(<BrowserRouter>{ui}</BrowserRouter>)
	}

	test(`Config renders and not crash`, () => {
		renderWithRouter(<Config />)
		expect(screen.getByTestId(testid.configPage)).toBeInTheDocument()
	})

	describe(`Input's updates`, () => {
		test(`Set url, detect it, and reset it`, () => {
			renderWithRouter(<Config />)
			const hostname = screen.getByTestId(testid.inputHostname)
			const port = screen.getByTestId(testid.inputPort)
			const endpoint = screen.getByTestId(testid.inputEndpoint)
			const fullUrl = screen.getByTestId(testid.inputFullUrl)
			const detectBtn = screen.getByTestId(testid.btnDetect)
			const resetBtn = screen.getByTestId(testid.btnReset)

			// Change all fields
			fireEvent.change(hostname, { target: { value: 'new-host' } })
			fireEvent.change(port, { target: { value: 6969 } })
			fireEvent.change(endpoint, { target: { value: '/new-endpoint' } })
			expect(fullUrl).toHaveValue('ws://new-host:6969/new-endpoint')

			// Reset to defaults
			fireEvent.click(resetBtn)
			expect(fullUrl).toHaveValue('ws://localhost:8448/api/v1/ws')

			// Detect server
			fireEvent.click(detectBtn)
			expect(fullUrl).toHaveValue('ws://localhost:3000/api/v1/ws')
		})

		test(`Set input min volume`, () => {
			renderWithRouter(<Config />)
			const input = screen.getByTestId(testid.inputMinVolume)
			fireEvent.change(input, { target: { value: 10 } })
			expect(input).toHaveValue(10)
		})

		test(`Set input max volume`, () => {
			renderWithRouter(<Config />)
			const input = screen.getByTestId(testid.inputMaxVolume)
			fireEvent.change(input, { target: { value: 100 } })
			expect(input).toHaveValue(100)
		})

		test(`Set input step volume`, () => {
			renderWithRouter(<Config />)
			const input = screen.getByTestId(testid.inputStepVolume)
			fireEvent.change(input, { target: { value: 3 } })
			expect(input).toHaveValue(3)
		})
	})
})
