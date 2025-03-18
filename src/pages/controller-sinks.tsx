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

export const ControllerSinks: React.FC = () => {
	const vol = useVolumeStatus()
	const drag = useDragSinkInput(vol.moveSinkInput)

	// SINK volume control (with optimistic and throttle)
	const sinkVolume = (name: string, [volume]: number[]) => {
		navigator.vibrate([VIBRATE_TIME])
		return vol.setSink({ name, volume })
	}

	const throttledSinkHandler = useThrottledCallback((sinkName: string, volume: number[]) => {
		sinkVolume(sinkName, volume).send()
	}, THROTTLE_TIME)

	const handleSinkVolumeChange = (sinkName: string, volume: number[]) => {
		sinkVolume(sinkName, volume).optimistic()
		throttledSinkHandler(sinkName, volume)
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
		<Layout header={dict.headerSinks}>
			<DndContext //
				sensors={drag.sensors}
				onDragStart={drag.onDragStart}
				onDragEnd={drag.onDragEnd}
			>
				<section className='flex flex-col gap-6 text-xl'>
					{vol.volStatus?.sinks?.map(sink => (
						<Droppable key={sink.id} id={sink.name}>
							<VolumeSlider
								muted={sink.muted}
								volume={sink.volume}
								label={sink.label}
								onMuteChange={handleSinkMuteToggle(sink.name)}
								onValueChange={volume => handleSinkVolumeChange(sink.name, volume)}
								onValueCommit={volume => sinkVolume(sink.name, volume).send()}
							>
								{vol.volStatus?.sinkInputs?.map(
									si =>
										si.sinkId === sink.id && (
											<Fragment key={si.id}>
												<div className={cn('mb-4 ml-[14px] flex h-full flex-col pt-1')}>
													{/* tree-branch */}
													<TreeBranchUi active={drag.activeId === si.id} />
													<Draggable id={si.id} className='ml-[-3px]' />
												</div>
												<VolumeSlider
													className={cn(drag.activeId === si.id && 'opacity-30')}
													muted={si.muted}
													label={si.label}
													volume={si.volume}
													onMuteChange={handleSinkInputMuteToggle(si.id)}
													onValueChange={volume => handleSinkInputVolumeChange(si.id, volume)}
													onValueCommit={volume => sinkInputVolume(si.id, volume).send()}
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

const TreeBranchUi: React.FC<{ active: boolean }> = props => (
	<div className={cn('h-full w-0 border-4 border-r-0 border-dotted border-foreground', props.active && 'opacity-30')} />
)
