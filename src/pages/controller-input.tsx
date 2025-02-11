import { useVolumeStatus } from '../api/use-vol-status'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { useConfig } from '../config/use-config'
import { THROTTLE_TIME, VIBRATE_TIME } from '../constant'
import { dict } from '../dict'
import { useThrottledCallback } from '../utils/use-throttled-callback'

export const ControllerInput: React.FC = () => {
	const vol = useVolumeStatus()
	const [config] = useConfig()

	// SOURCE volume control (with optimistic update and throttle)
	const sourceVolume = (name: string, [volume]: number[]) => {
		navigator.vibrate([VIBRATE_TIME])
		return vol.setSource(name, volume)
	}

	const throttledSourceVolumeHandler = useThrottledCallback((name: string, volume: number[]) => {
		sourceVolume(name, volume).send()
	}, THROTTLE_TIME)

	const handleSourceVolumeChange = (name: string, volume: number[]) => {
		sourceVolume(name, volume).optimistic()
		throttledSourceVolumeHandler(name, volume)
	}

	const handleSourceMuteToggle = (name: string) => () => {
		navigator.vibrate([VIBRATE_TIME])
		vol.toggleSourceMute(name)
	}

	// other handlers
	const showSourceMonitors = (sourceMonitored: boolean) =>
		config.showMonitoredSources || (!config.showMonitoredSources && !sourceMonitored)

	return (
		<Layout header={dict.headerInput}>
			<section className='flex flex-col gap-6 text-xl'>
				{vol.volStatus?.sources?.map(
					source =>
						showSourceMonitors(source.monitored) && (
							<VolumeSlider
								key={source.id}
								muted={source.muted}
								volume={source.volume}
								label={source.label}
								onMuteChange={handleSourceMuteToggle(source.name)}
								onValueChange={volume => handleSourceVolumeChange(source.name, volume)}
								onValueCommit={volume => sourceVolume(source.name, volume).send()}
							></VolumeSlider>
						),
				)}
			</section>
		</Layout>
	)
}
