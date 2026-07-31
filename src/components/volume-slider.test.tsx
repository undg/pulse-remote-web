import { fireEvent, render, screen } from '@testing-library/react'
import { def, testid } from '../constant'
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
				volume + def.VOLUME_STEP,
			])
		})

		it('stops at max volume', () => {
			render(
				<VolumeSlider
					{...defaultProps}
					volume={def.MAX_VOLUME - def.VOLUME_STEP / 2}
				/>,
			)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([def.MAX_VOLUME])
		})

		it('does nothing at max volume', () => {
			render(<VolumeSlider {...defaultProps} volume={def.MAX_VOLUME} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).not.toHaveBeenCalled()
		})

		it('decreases to max volume', () => {
			render(<VolumeSlider {...defaultProps} volume={def.MAX_VOLUME + 1} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([def.MAX_VOLUME])
		})

		it('increases to min volume', () => {
			render(<VolumeSlider {...defaultProps} volume={def.MIN_VOLUME - 1} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([def.MIN_VOLUME])
		})
	})

	describe('volume down button', () => {
		it('decreases volume', () => {
			const volume = 50
			render(<VolumeSlider {...defaultProps} volume={volume} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([
				volume - def.VOLUME_STEP,
			])
		})

		it('stops at min volume', () => {
			render(<VolumeSlider {...defaultProps} volume={def.VOLUME_STEP / 2} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([def.MIN_VOLUME])
		})

		it('does nothing at min volume', () => {
			render(<VolumeSlider {...defaultProps} volume={def.MIN_VOLUME} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).not.toHaveBeenCalled()
		})

		it('decreases to max volume', () => {
			render(<VolumeSlider {...defaultProps} volume={def.MAX_VOLUME + 1} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([def.MAX_VOLUME])
		})

		it('increases to min volume', () => {
			render(<VolumeSlider {...defaultProps} volume={def.MIN_VOLUME - 1} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([def.MIN_VOLUME])
		})
	})
})
