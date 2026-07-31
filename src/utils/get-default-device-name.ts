import { Sink, Source } from '../generated/status'

/**
 * Return the name of the default device from the backend status.
 * Backend now exposes `isDefault` flag on each sink/source.
 */
export const getDefaultDeviceName = (
	devices?: (Sink | Source)[],
): string | undefined => {
	return devices?.find(d => d.isDefault)?.name
}
