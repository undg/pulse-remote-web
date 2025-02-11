'use client'

// eslint-disable-next-line no-restricted-imports
import * as SliderPrimitive from '@radix-ui/react-slider'
// eslint-disable-next-line no-restricted-imports
import * as React from 'react'
import { cn } from '../utils/cn'

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { className?: string; thumbContent?: React.ReactNode }
>(({ className, thumbContent, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn('relative flex w-full touch-none select-none items-center', className)}
		{...props}
	>
		<SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-primary/20'>
			<SliderPrimitive.Range className='absolute h-full bg-primary' />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className='flex size-9 items-center justify-center rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
			{thumbContent}
		</SliderPrimitive.Thumb>
	</SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
