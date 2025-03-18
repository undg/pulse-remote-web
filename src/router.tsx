import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ControllerSinks } from './pages/controller-sinks'
import { ControllerSources } from './pages/controller-sources'
import About from './pages/about'
import { Config } from './pages/config'

export const routes = {
	sinks: '/',
	sources: '/sources',
	about: '/about',
	config: '/config',
}

export const Router: FC<{}> = () => {
	return (
		<Routes>
			<Route path={routes.sinks} element={<ControllerSinks />} />
			<Route path={routes.sources} element={<ControllerSources />} />
			<Route path={routes.about} element={<About />} />
			<Route path={routes.config} element={<Config />} />
		</Routes>
	)
}
