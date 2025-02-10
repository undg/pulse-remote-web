import type { FC } from 'react'
import { useVolumeStatus } from '../api/use-vol-status'
import { H2, Muted, Small } from '../primitives/typography'

export const ServerInfo: FC = () => {
	const { volStatus } = useVolumeStatus()

	return (
		<>
			<H2>Server info</H2>
			<div className='mt-2 grid grid-cols-2 gap-2'>
				<div className='flex flex-col'>
					<Small>Version</Small>
					<Muted>{volStatus?.buildInfo?.gitVersion}</Muted>
				</div>
				<div className='flex flex-col'>
					<Small>Commit SHA</Small>
					<Muted>{volStatus?.buildInfo?.gitCommit}</Muted>
				</div>
				<div className='flex flex-col'>
					<Small>Platform</Small>
					<Muted>{volStatus?.buildInfo?.platform}</Muted>
				</div>
				<div className='flex flex-col'>
					<Small>Build Date</Small>
					<Muted>{volStatus?.buildInfo?.buildDate}</Muted>
				</div>
				<div className='flex flex-col'>
					<Small>Go Version</Small>
					<Muted>{volStatus?.buildInfo?.goVersion}</Muted>
				</div>
				<div className='flex flex-col'>
					<Small>Compiler</Small>
					<Muted>{volStatus?.buildInfo?.compiler}</Muted>
				</div>
			</div>
		</>
	)
}
