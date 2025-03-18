import { Info, Mic, Moon, Settings, Sun, Volume2 } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useTheme } from '../config/use-theme'
import { testid } from '../constant'
import { Button } from '../primitives/button'
import { routes } from '../router'

export const TopNav: FC = () => {
	const [theme, setTheme] = useTheme()

	const handleThemeToggle = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<nav className='mb-8 flex flex-wrap-reverse justify-between gap-4'>
			<div className='flex justify-between gap-2'>
				<ButtonNavLink to={routes.sinks} testid={testid.gotoSinksPage}>
					<Volume2 />
				</ButtonNavLink>
				<ButtonNavLink to={routes.sources} testid={testid.gotoSourcesPage}>
					<Mic />
				</ButtonNavLink>
			</div>

			<div className='flex justify-between gap-2'>
				<ButtonNavLink to={routes.about} testid={testid.gotoAbout}>
					<Info />
				</ButtonNavLink>
				<ButtonNavLink to={routes.config} testid={testid.gotoConfig}>
					<Settings />
				</ButtonNavLink>
				<Button variant='outline' size='sm' data-testid={testid.btnTheme} onClick={handleThemeToggle}>
					{theme === 'light' && <Sun />}
					{theme === 'dark' && <Moon />}
				</Button>
			</div>
		</nav>
	)
}

const ButtonNavLink: FC<{ to: string; children: ReactNode; testid: string }> = ({ to, children, testid }) => {
	const curr = useMatch(to)
	return (
		<Link to={to} data-testid={testid}>
			<Button variant={curr ? 'default' : 'outline'} size='sm'>
				{children}
			</Button>
		</Link>
	)
}
