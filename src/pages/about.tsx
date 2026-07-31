import type { ReactElement } from 'react'
import { Layout } from '../components/layout'
import { ServerInfo } from '../components/server-info'
import { dict } from '../dict'
import { H2, P } from '../primitives/typography'

export default function About(): ReactElement {
	return (
		<Layout header={dict.headerAbout}>
			<section>
				<H2>Pulse Remote</H2>
				<P>
					App for Linux. Control PC volume remotely. Works with PulseAudio and
					PipeWire.
				</P>
				<P>
					<a href='https://github.com/undg/pulse-remote'>
						github.com/undg/pulse-remote
					</a>
				</P>
			</section>

			<section>
				<ServerInfo />
			</section>
		</Layout>
	)
}
