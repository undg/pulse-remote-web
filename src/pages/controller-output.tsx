import { Fragment, useCallback } from 'react'
import { useVolumeStatus } from '../api/use-vol-status'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { dict } from '../dict'
import throttle from 'lodash.throttle'

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

	const throttledHandler = useCallback(
		throttle((outputName: string, volume: number[]) => {
			handleSinkVolumeChange(outputName, volume).send()
		}, 500),
		[],
	)

	const handleChange = (outputName: string) => (volume: number[]) => {
		handleSinkVolumeChange(outputName, volume).optimistic()

		console.log('change')
		throttledHandler(outputName, volume)
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
						onValueChange={handleChange(output.name)}
						onValueCommit={volume => handleSinkVolumeChange(output.name, volume).send()}
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
