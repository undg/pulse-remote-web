import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import LoadingOrError from './components/loading-or-error'
import { Router } from './router'

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Router />
			</Suspense>
		</BrowserRouter>
	)
}
