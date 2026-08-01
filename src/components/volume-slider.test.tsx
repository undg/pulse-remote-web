import { fireEvent, render, screen } from '@testing-library/react'
import { DEF, testid } from '../constant'
import { VolumeSlider } from './volume-slider'

describe('<VolumeSlider />', () => {
	const defaultProps = {
		muted: false,
		label: 'Volume label',
		volume: 50,
		onMuteChange: vi.fn(),
		onValueChange: vi.fn(),
		onValueCommit: vi.fn(),
	}

	it('renders correctly', () => {
		render(<VolumeSlider {...defaultProps} />)
		expect(screen.getByText('Volume label')).toBeInTheDocument()
		expect(screen.getByText('50%')).toBeInTheDocument()
	})

	it('mute toggle works', () => {
		render(<VolumeSlider {...defaultProps} />)
		fireEvent.click(screen.getByTestId(testid.btnMuteToggle))
		expect(defaultProps.onMuteChange).toHaveBeenCalled()
	})

	describe('volume up button', () => {
		it('increases volume', () => {
			const volume = 50
			render(<VolumeSlider {...defaultProps} volume={volume} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([
				volume + DEF.volStep,
			])
		})

		it('stops at max volume', () => {
			render(
				<VolumeSlider
					{...defaultProps}
					volume={DEF.volMax - DEF.volStep / 2}
				/>,
			)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([DEF.volMax])
		})

		it('does nothing at max volume', () => {
			render(<VolumeSlider {...defaultProps} volume={DEF.volMax} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).not.toHaveBeenCalled()
		})

		it('decreases to max volume', () => {
			render(<VolumeSlider {...defaultProps} volume={DEF.volMax + 1} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([DEF.volMax])
		})

		it('increases to min volume', () => {
			render(<VolumeSlider {...defaultProps} volume={DEF.volMin - 1} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([DEF.volMin])
		})
	})

	describe('volume down button', () => {
		it('decreases volume', () => {
			const volume = 50
			render(<VolumeSlider {...defaultProps} volume={volume} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([
				volume - DEF.volStep,
			])
		})

		it('stops at min volume', () => {
			render(<VolumeSlider {...defaultProps} volume={DEF.volStep / 2} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([DEF.volMin])
		})

		it('does nothing at min volume', () => {
			render(<VolumeSlider {...defaultProps} volume={DEF.volMin} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).not.toHaveBeenCalled()
		})

		it('decreases to max volume', () => {
			render(<VolumeSlider {...defaultProps} volume={DEF.volMax + 1} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([DEF.volMax])
		})

		it('increases to min volume', () => {
			render(<VolumeSlider {...defaultProps} volume={DEF.volMin - 1} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([DEF.volMin])
		})
	})
})
