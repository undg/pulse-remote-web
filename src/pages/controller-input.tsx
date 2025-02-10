import { useVolumeStatus } from '../api/use-vol-status'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { dict } from '../dict'

export const ControllerInput: React.FC = () => {
	const vol = useVolumeStatus()

	const handleSourceVolumeChange = (name: string, [volume]: number[]) => {
		navigator.vibrate([10])
		return vol.setSource(name, volume)
	}

	const handleSourceMuteToggle = (name: string) => () => {
		navigator.vibrate([10])
		vol.toggleSourceMute(name)
	}

	return (
		<Layout header={dict.headerInput}>
			<section className='flex flex-col gap-6 text-xl'>
				{vol.getStatus?.sources?.map(source => (
					<VolumeSlider
						key={source.id}
						muted={source.muted}
						volume={source.volume}
						label={source.label}
						onMuteChange={handleSourceMuteToggle(source.name)}
						onValueChange={volume => handleSourceVolumeChange(source.name, volume).optimistic()}
						onValueCommit={volume => handleSourceVolumeChange(source.name, volume).send()}
					></VolumeSlider>
				))}
			</section>
		</Layout>
	)
}
