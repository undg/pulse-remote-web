import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useAtomDevtools } from 'jotai-devtools'
import { debugAtom } from '../utils/debugAtom'
import type { Config } from './schema'
import { ConfigSchema } from './schema'

export const defaultConfig: Config = {
	hostname: window.location.hostname,
	port: '8448',
	endpoint: '/api/v1/ws',
	serverUrl: `ws://${window.location.hostname}:8448/api/v1/ws`,
	minVolume: 0,
	maxVolume: 150,
	stepVolume: 5,
	showMonitoredSources: true,
} as const

export const configAtom = atomWithStorage<Config>(
	'pr-web-config',
	defaultConfig,
)
debugAtom(configAtom, 'configAtom')

export function useConfig(): [Config, (newConfig: Partial<Config>) => void] {
	const [config, setConfig] = useAtom(configAtom)
	useAtomDevtools(configAtom)

	const updateConfig = (newConfig: Partial<Omit<Config, 'serverUrl'>>) => {
		const updatedConfig = { ...config, ...newConfig }
		const parsedConfig = ConfigSchema.parse(updatedConfig)
		setConfig(parsedConfig)
	}

	return [config, updateConfig]
}
