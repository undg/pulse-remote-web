'use client'

import type { FC, PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

export const H1: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<h1
			className={cn(
				'scroll-m-20 pb-8 font-extrabold text-2xl tracking-tight lg:text-5xl',
				props.className,
			)}
		>
			{props.children}
		</h1>
	)
}

export const H2: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<h2
			className={cn(
				'first:mt- mt-6 scroll-m-20 pb-2 font-semibold text-1xl tracking-tight',
				props.className,
			)}
		>
			{props.children}
		</h2>
	)
}

export const H3: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<h3
			className={cn(
				'mt-6 scroll-m-20 font-semibold text-xl tracking-tight',
				props.className,
			)}
		>
			{props.children}
		</h3>
	)
}

export const H4: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<h4
			className={cn(
				'mt-6 scroll-m-20 font-semibold text-lg tracking-tight',
				props.className,
			)}
		>
			{props.children}
		</h4>
	)
}

export const P: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<p className={cn('leading-7 [&:not(:first-child)]:mt-6', props.className)}>
			{props.children}
		</p>
	)
}

export const Large: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<p className={cn('font-semibold text-lg', props.className)}>
			{props.children}
		</p>
	)
}

export const Small: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<small className={cn('font-medium text-sm leading-none', props.className)}>
			{props.children}
		</small>
	)
}

export const Muted: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<p className={cn('text-muted-foreground text-sm', props.className)}>
			{props.children}
		</p>
	)
}

export const Ul: FC<PropsWithChildren<{ className?: string }>> = props => {
	return (
		<ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', props.className)}>
			{props.children}
		</ul>
	)
}
