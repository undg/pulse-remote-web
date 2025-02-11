'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

export function Draggable() {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: 'unique-id',
	})
	const style = {
		transform: CSS.Translate.toString(transform),
	}

	return (
		<button ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<GripVertical size={20} />
		</button>
	)
}
