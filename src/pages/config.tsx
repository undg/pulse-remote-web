import { Layout } from '../components/layout'
import { defaultConfig, useConfig } from '../config/use-config'
import { testid } from '../constant'
import { dict } from '../dict'
import { Button } from '../primitives/button'
import { Input } from '../primitives/input'
import { Label } from '../primitives/label'
import { Switch } from '../primitives/switch'
import { H3 } from '../primitives/typography'
import { VolumeThreshold } from './config/volume-threshold'

export const Config = () => {
	const [config, updateConfig] = useConfig()

	const handleChange =
		(type: keyof typeof config) => (e: React.ChangeEvent<HTMLInputElement>) => {
			updateConfig({ [type]: e.currentTarget.value })
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
					<VolumeThreshold />
				</section>
			</div>
		</Layout>
	)
}
