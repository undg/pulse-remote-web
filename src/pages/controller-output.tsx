import { Fragment } from 'react'
import { useVolumeStatus } from '../api/use-vol-status'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { dict } from '../dict'

export const ControllerOutput: React.FC = () => {
	const vol = useVolumeStatus()

	const handleSinkVolumeChange = (name: string, [volume]: number[]) => {
		navigator.vibrate([10])
		return vol.setSink(name, volume)
	}

	const handleSinkMuteToggle = (name: string) => () => {
		navigator.vibrate([10])
		vol.toggleSinkMute(name)
	}

	const handleSinkInputVolumeChange = (id: number, [volume]: number[]) => {
		navigator.vibrate([10])
		return vol.setSinkInput(id, volume)
	}

	const handleSinkInputMuteToggle = (id: number) => () => {
		navigator.vibrate([10])
		vol.toggleSinkInputMute(id)
	}

	return (
		<Layout header={dict.headerOutput}>
			<section className='flex flex-col gap-6 text-xl'>
				{vol.getStatus?.outputs?.map(output => (
					<VolumeSlider
						key={output.id}
						muted={output.muted}
						volume={output.volume}
						label={output.label}
						onMuteChange={handleSinkMuteToggle(output.name)}
						onValueChange={volume => handleSinkVolumeChange(output.name, volume).optimistic()}
						onValueCommit={volume => handleSinkVolumeChange(output.name, volume).send()}
					>
						{vol.getStatus?.apps?.map(
							app =>
								app.outputId === output.id && (
									<Fragment key={app.id}>
										<div className='relative ml-4 flex h-full items-end justify-end'>
											<span
												/* tree-branch */
												className='absolute bottom-1 h-full w-full border-2 border-r-0 border-t-0 border-b-foreground border-l-foreground'
											/>
										</div>
										<VolumeSlider
											muted={app.muted}
											label={app.label}
											volume={app.volume}
											onMuteChange={handleSinkInputMuteToggle(app.id)}
											onValueChange={volume => handleSinkInputVolumeChange(app.id, volume).optimistic()}
											onValueCommit={volume => handleSinkInputVolumeChange(app.id, volume).send()}
										/>
									</Fragment>
								),
						)}
					</VolumeSlider>
				))}
			</section>
		</Layout>
	)
}
