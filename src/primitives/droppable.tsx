'use client'

import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'
import { cn } from '../utils/cn'

export function Droppable({ id, children }: { id: UniqueIdentifier; children: ReactNode }) {
	const { setNodeRef, isOver } = useDroppable({
		id,
	})

	return (
		<div ref={setNodeRef} className={cn(isOver && 'outline outline-primary')}>
			{children}
		</div>
	)
}
