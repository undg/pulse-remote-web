'use client'

import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Grip } from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export function Draggable({
	id,
	className,
	children = <Grip />,
}: {
	id: UniqueIdentifier
	className?: string
	children?: ReactNode
}) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id,
	})
	const style = {
		transform: CSS.Translate.toString(transform),
	}

	return (
		<div>
			{isDragging && <div className={cn(className, 'absolute opacity-30')}>{children}</div>}
			<div ref={setNodeRef} style={style} className={className} {...listeners} {...attributes}>
				{children}
			</div>
		</div>
	)
}
