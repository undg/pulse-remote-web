import { fireEvent, render, screen, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { testid } from '../constant'
import { Config } from './config'

describe('Config route', () => {
	// Setup router context
	const renderWithRouter = (ui: React.ReactElement) => {
		return render(<BrowserRouter>{ui}</BrowserRouter>)
	}

	test('Config renders and not crash', () => {
		renderWithRouter(<Config />)
		expect(screen.getByTestId(testid.configPage)).toBeInTheDocument()
	})

	describe("Input's updates", () => {
		test('Set url, detect it, and reset it', () => {
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

		test('Slider max volume starts at 150 and responds to keyboard', () => {
			renderWithRouter(<Config />)
			const slider = screen.getByTestId(testid.inputMaxVolume)
			const thumb = within(slider).getByRole('slider')
			expect(thumb).toHaveAttribute('aria-valuenow', '150')

			// ArrowRight increases by step (25) → 175
			fireEvent.keyDown(thumb, { key: 'ArrowRight' })
			expect(thumb).toHaveAttribute('aria-valuenow', '175')

			// ArrowLeft decreases back → 150
			fireEvent.keyDown(thumb, { key: 'ArrowLeft' })
			expect(thumb).toHaveAttribute('aria-valuenow', '150')
		})

		test('Slider step volume starts at 5 and responds to keyboard', () => {
			renderWithRouter(<Config />)
			const slider = screen.getByTestId(testid.inputStepVolume)
			const thumb = within(slider).getByRole('slider')
			expect(thumb).toHaveAttribute('aria-valuenow', '5')

			// ArrowRight increases by step (1) → 6
			fireEvent.keyDown(thumb, { key: 'ArrowRight' })
			expect(thumb).toHaveAttribute('aria-valuenow', '6')

			// ArrowLeft decreases by step (1) → 5
			fireEvent.keyDown(thumb, { key: 'ArrowLeft' })
			expect(thumb).toHaveAttribute('aria-valuenow', '5')
		})
	})
})
