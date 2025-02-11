import { useVolumeStatus } from '../api/use-vol-status'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { useConfig } from '../config/use-config'
import { dict } from '../dict'

export const ControllerInput: React.FC = () => {
	const vol = useVolumeStatus()
	const [config] = useConfig()

	const handleSourceVolumeChange = (name: string, [volume]: number[]) => {
		navigator.vibrate([10])
		return vol.setSource(name, volume)
	}

	const handleSourceMuteToggle = (name: string) => () => {
		navigator.vibrate([10])
		vol.toggleSourceMute(name)
	}

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
								onValueChange={volume => handleSourceVolumeChange(source.name, volume).optimistic()}
								onValueCommit={volume => handleSourceVolumeChange(source.name, volume).send()}
							></VolumeSlider>
						),
				)}
			</section>
		</Layout>
	)
}
