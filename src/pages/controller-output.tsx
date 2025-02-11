import { Fragment } from 'react'
import { useVolumeStatus } from '../api/use-vol-status'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { dict } from '../dict'
import { useThrottledCallback } from '../utils/use-throttled-callback'
import { THROTTLE_TIME, VIBRATE_TIME } from '../constant'

export const ControllerOutput: React.FC = () => {
	const vol = useVolumeStatus()

	// SINK volume control (with optimistic and throttle)
	const sinkVolume = (name: string, [volume]: number[]) => {
		navigator.vibrate([VIBRATE_TIME])
		return vol.setSink(name, volume)
	}

	const throttledSinkHandler = useThrottledCallback((outputName: string, volume: number[]) => {
		sinkVolume(outputName, volume).send()
	}, THROTTLE_TIME)

	const handleSinkVolumeChange = (outputName: string, volume: number[]) => {
		sinkVolume(outputName, volume).optimistic()
		throttledSinkHandler(outputName, volume)
	}

	// SINK mute toggle
	const handleSinkMuteToggle = (name: string) => () => {
		navigator.vibrate([VIBRATE_TIME])
		vol.toggleSinkMute(name)
	}

	// SINK INPUT volume control (with optimistic and throttle)
	const sinkInputVolume = (id: number, [volume]: number[]) => {
		navigator.vibrate([VIBRATE_TIME])
		return vol.setSinkInput(id, volume)
	}

	const throttledSinkInputHandler = useThrottledCallback((id: number, volume: number[]) => {
		sinkInputVolume(id, volume).send()
	}, THROTTLE_TIME)

	const handleSinkInputVolumeChange = (id: number, volume: number[]) => {
		sinkInputVolume(id, volume).optimistic()
		throttledSinkInputHandler(id, volume)
	}

	// SINK INPUT mute toggle
	const handleSinkInputMuteToggle = (id: number) => () => {
		navigator.vibrate([VIBRATE_TIME])
		vol.toggleSinkInputMute(id)
	}

	return (
		<Layout header={dict.headerOutput}>
			<section className='flex flex-col gap-6 text-xl'>
				{vol.volStatus?.outputs?.map(output => (
					// droppable
					<VolumeSlider
						key={output.id}
						muted={output.muted}
						volume={output.volume}
						label={output.label}
						onMuteChange={handleSinkMuteToggle(output.name)}
						onValueChange={volume => handleSinkVolumeChange(output.name, volume)}
						onValueCommit={volume => sinkVolume(output.name, volume).send()}
					>
						{vol.volStatus?.apps?.map(
							app =>
								app.outputId === output.id && (
									// draggable
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
											onValueChange={volume => handleSinkInputVolumeChange(app.id, volume)}
											onValueCommit={volume => sinkInputVolume(app.id, volume).send()}
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
