import throttle from 'lodash.throttle'
import { useCallback } from 'react'

/**
 * @example
 *
 * // In component:
 * const throttledVolumeChange = useThrottledCallback(
 *   (outputName: string, volume: number[]) => {
 *     handleSinkVolumeChange(outputName, volume).send()
 *   },
 *   100
 * )
 *
 * const handleChange = (outputName: string) => (volume: number[]) => {
 *   handleSinkVolumeChange(outputName, volume).optimistic()
 *   throttledVolumeChange(outputName, volume)
 * }
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
	return useCallback(throttle(callback, delay), [delay])
}
