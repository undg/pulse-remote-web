import { useConfig } from '../../config/use-config'
import { MAX_VOL_THRESHOLD, STEP_RANGE, testid } from '../../constant'
import { Label } from '../../primitives/label'
import { Slider } from '../../primitives/slider'
import { H3 } from '../../primitives/typography'

export const VolumeThreshold = () => {
	const [config, updateConfig] = useConfig()

	const handleMaxVolumeChange = (value: number[]) => {
		updateConfig({ maxVolume: value[0] })
	}

	const handleStepVolumeChange = (value: number[]) => {
		updateConfig({ stepVolume: value[0] })
	}

	return (
		<>
			<H3>Volume threshold</H3>
			<div className='flex flex-col gap-4'>
				<div className='flex items-center gap-2'>
					<Label className='w-32 shrink-0'>Max volume</Label>
					<Slider
						data-testid={testid.inputMaxVolume}
						value={[config.maxVolume]}
						min={MAX_VOL_THRESHOLD.min}
						max={MAX_VOL_THRESHOLD.max}
						step={MAX_VOL_THRESHOLD.step}
						onValueChange={handleMaxVolumeChange}
					/>
					<span className='w-10 text-right tabular-nums text-sm'>
						{config.maxVolume}
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<Label className='w-32 shrink-0'>Step volume</Label>
					<Slider
						data-testid={testid.inputStepVolume}
						value={[config.stepVolume]}
						min={STEP_RANGE.min}
						max={STEP_RANGE.max}
						step={1}
						onValueChange={handleStepVolumeChange}
					/>
					<span className='w-10 text-right tabular-nums text-sm'>
						{config.stepVolume}
					</span>
				</div>
			</div>
		</>
	)
}
