import { Fragment } from 'react'
import { useVolumeStatus } from '../api/use-vol-status'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { dict } from '../dict'
import { useThrottledCallback } from '../utils/use-throttled-callback'
import { THROTTLE_TIME, VIBRATE_TIME } from '../constant'
import { DndContext } from '@dnd-kit/core'
import { cn } from '../utils/cn'
import { useDragSinkInput } from '../components/drag/use-drag'
import { Droppable } from '../components/drag/droppable'
import { Draggable } from '../components/drag/draggable'

export const ControllerOutput: React.FC = () => {
	const vol = useVolumeStatus()
	const drag = useDragSinkInput(vol.moveSinkInput)

	// SINK volume control (with optimistic and throttle)
	const sinkVolume = (name: string, [volume]: number[]) => {
		navigator.vibrate([VIBRATE_TIME])
		return vol.setSink({ name, volume })
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
		vol.toggleSinkMute({ name })
	}

	// SINK INPUT volume control (with optimistic and throttle)
	const sinkInputVolume = (id: number, [volume]: number[]) => {
		navigator.vibrate([VIBRATE_TIME])
		return vol.setSinkInput({ id, volume })
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
		vol.toggleSinkInputMute({ id })
	}

	return (
		<Layout header={dict.headerOutput}>
			<DndContext //
				sensors={drag.sensors}
				onDragStart={drag.onDragStart}
				onDragEnd={drag.onDragEnd}
			>
				<section className='flex flex-col gap-6 text-xl'>
					{vol.volStatus?.outputs?.map(output => (
						<Droppable key={output.id} id={output.name}>
							<VolumeSlider
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
											<Fragment key={app.id}>
												<div className={cn('mb-4 ml-[14px] flex h-full flex-col pt-1')}>
													{/* tree-branch */}
													<div
														className={cn(
															'h-full w-0 border-4 border-r-0 border-dotted border-foreground',
															drag.activeId === app.id && 'opacity-30',
														)}
													/>
													<Draggable id={app.id} className='ml-[-3px]' />
												</div>
												<VolumeSlider
													className={cn(drag.activeId === app.id && 'opacity-30')}
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
						</Droppable>
					))}
				</section>
			</DndContext>
		</Layout>
	)
}
