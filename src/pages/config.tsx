import type { FC } from 'react'
import { Layout } from '../components/layout'
import { defaultConfig, useConfig } from '../config/use-config'
import { testid } from '../constant'
import { dict } from '../dict'
import { Button } from '../primitives/button'
import { Input } from '../primitives/input'
import { H3 } from '../primitives/typography'

export const Config: FC = () => {
	const [config, updateConfig] = useConfig()

	const handleChange = (type: keyof typeof config) => (e: React.ChangeEvent<HTMLInputElement>) => {
		let value: string | number = e.currentTarget.value
		if (type === 'maxVolume' || type === 'minVolume' || type === 'stepVolume') value = Number(value)
		updateConfig({ [type]: value })
	}

	const handleConfigDetect = () => {
		updateConfig({
			hostname: window.location.hostname,
			port: window.location.port,
			endpoint: '/api/v1/ws',
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
					<div className='flex justify-start gap-2'>switch placeholder</div>
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
					<Input data-testid={testid.inputFullUrl} label='Full serverUrl' disabled value={config.serverUrl} />

					<div className='mt-4 flex justify-between gap-4'>
						<Button data-testid={testid.btnReset} variant='destructive' onClick={handleConfigReset}>
							Reset to default
						</Button>
						<Button data-testid={testid.btnDetect} onClick={handleConfigDetect}>
							Auto detect
						</Button>
					</div>
				</section>

				<section>
					<H3>Volume threshold</H3>
					<div className='flex justify-start gap-2'>
						<Input
							data-testid={testid.inputMinVolume}
							label='Min volume'
							onFocus={e => e.target.select()}
							value={config.minVolume}
							type='number'
							onChange={handleChange('minVolume')}
						/>
						<Input
							data-testid={testid.inputMaxVolume}
							label='Max volume'
							onFocus={e => e.target.select()}
							value={config.maxVolume}
							type='number'
							onChange={handleChange('maxVolume')}
						/>
						<Input
							data-testid={testid.inputStepVolume}
							label='Step volume'
							onFocus={e => e.target.select()}
							value={config.stepVolume}
							type='number'
							onChange={handleChange('stepVolume')}
						/>
					</div>
				</section>
			</div>
		</Layout>
	)
}
