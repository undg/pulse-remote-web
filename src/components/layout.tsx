import type { FC, PropsWithChildren } from 'react'
import { useTheme } from '../config/use-theme'
import { cn } from '../utils/cn'
import { TopNav } from './top-nav'
import { H2, H3 } from '../primitives/typography'
import { dict } from '../dict'

export const Layout: FC<PropsWithChildren<{ header?: string }>> = props => {
	const [theme] = useTheme()
	return (
		<div
			className={cn(
				//
				'flex h-full min-h-screen w-full justify-center bg-background text-foreground',
				theme === 'dark' && 'dark',
				theme === 'light' && 'light',
			)}
		>
			<div className='w-full max-w-screen-lg bg-muted p-8 pt-0'>
				<div className='flex justify-between gap-4'>
					<H2 className='invisible'>{dict.appName}</H2>
					<H3>{props.header ?? ''}</H3>
					<H2>{dict.appName}</H2>
				</div>
				<TopNav />
				<main>{props.children}</main>
			</div>
		</div>
	)
}
