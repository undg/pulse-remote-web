import type { FC } from 'react'
import { Layout } from '../components/layout'
import { defaultConfig, useConfig } from '../config/use-config'
import { MAX_VOL_THRESHOLD, STEP_RANGE, testid } from '../constant'
import { dict } from '../dict'
import { Button } from '../primitives/button'
import { Input } from '../primitives/input'
import { Label } from '../primitives/label'
import { Slider } from '../primitives/slider'
import { Switch } from '../primitives/switch'
import { H3 } from '../primitives/typography'

export const Config: FC = () => {
	const [config, updateConfig] = useConfig()

	const handleChange =
		(type: keyof typeof config) => (e: React.ChangeEvent<HTMLInputElement>) => {
			updateConfig({ [type]: e.currentTarget.value })
		}

	const handleMaxVolumeChange = (value: number[]) => {
		updateConfig({ maxVolume: value[0] })
	}

	const handleStepVolumeChange = (value: number[]) => {
		updateConfig({ stepVolume: value[0] })
	}

	const handleConfigDetect = () => {
		updateConfig({
			hostname: window.location.hostname,
			port: window.location.port,
			endpoint: '/api/v1/ws',
		})
	}

	const handleShowMonitedSourceChange = (monitored: boolean) => {
		updateConfig({
			showMonitoredSources: monitored,
		})
	}

	const handleConfigReset = () => {
		updateConfig(defaultConfig)
	}
	return (
		<Layout header={dict.headerConfig}>
			<div className='flex flex-col gap-4' data-testid={testid.configPage}>
				<section>
					<H3>Sources</H3>
					<div className='flex justify-start gap-2'>
						<div className='flex items-center space-x-2'>
							<Switch
								id='show-monitors'
								checked={config.showMonitoredSources}
								onCheckedChange={handleShowMonitedSourceChange}
							/>
							<Label htmlFor='show-monitors'>Show Monitors</Label>
						</div>
					</div>
				</section>
				<section>
					<H3>Server</H3>
					<div className='flex justify-start gap-2'>
						<Input
							data-testid={testid.inputHostname}
							label='hostname'
							value={config.hostname}
							onChange={handleChange('hostname')}
						/>
						<Input
							data-testid={testid.inputPort}
							label='port'
							className='w-16'
							value={config.port}
							onChange={handleChange('port')}
						/>
						<Input
							data-testid={testid.inputEndpoint}
							label='endpoint'
							value={config.endpoint}
							onChange={handleChange('endpoint')}
						/>
					</div>
					<Input
						data-testid={testid.inputFullUrl}
						label='Full serverUrl'
						disabled
						value={config.serverUrl}
					/>

					<div className='mt-4 flex justify-between gap-4'>
						<Button
							data-testid={testid.btnReset}
							variant='destructive'
							onClick={handleConfigReset}
						>
							Reset to default
						</Button>
						<Button data-testid={testid.btnDetect} onClick={handleConfigDetect}>
							Auto detect
						</Button>
					</div>
				</section>

				<section>
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
				</section>
			</div>
		</Layout>
	)
}
