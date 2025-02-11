import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ControllerOutput } from './pages/controller-output'
import { ControllerInput } from './pages/controller-input'
import About from './pages/about'
import { Config } from './pages/config'

export const routes = {
	home: '/',
	input: '/input',
	about: '/about',
	config: '/config',
}

export const Router: FC<{}> = () => {
	return (
		<Routes>
			<Route path={routes.home} element={<ControllerOutput />} />
			<Route path={routes.input} element={<ControllerInput />} />
			<Route path={routes.about} element={<About />} />
			<Route path={routes.config} element={<Config />} />
		</Routes>
	)
}
