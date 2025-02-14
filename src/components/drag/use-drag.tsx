'use client'

import {
	UniqueIdentifier,
	DragStartEvent,
	DragEndEvent,
	useSensors,
	useSensor,
	TouchSensor,
	MouseSensor,
	KeyboardSensor,
} from '@dnd-kit/core'
import { useState } from 'react'
import { MessageMoveSinkInput } from '../../api/types'

export const useDragSinkInput = (moveFn: ({ name, id }: MessageMoveSinkInput['payload']) => void) => {
	const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>(undefined)
	const mouseSensor = useSensor(MouseSensor)
	const touchSensor = useSensor(TouchSensor)
	const keyboardSensor = useSensor(KeyboardSensor)
	const sensors = useSensors(touchSensor, mouseSensor, keyboardSensor)

	const onStart = (e: DragStartEvent) => {
		setActiveId(e.active.id)
	}

	const onEnd = (e: DragEndEvent) => {
		setActiveId(undefined)
		if (!e.over) {
			console.error('missing name')
			return
		}
		if (typeof e.over.id !== 'string') {
			console.error('name should be a string')
			return
		}
		if (!e.active) {
			console.error('missing id')
			return
		}
		if (typeof e.active.id !== 'number') {
			console.error('id should be a number')
			return
		}
		moveFn({ name: e.over.id, id: e.active.id })
	}

	return {
		activeId,
		sensors,
		onDragStart: onStart,
		onDragEnd: onEnd,
	}
}
