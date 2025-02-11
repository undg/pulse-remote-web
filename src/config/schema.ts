import { z } from 'zod'
import { def } from '../constant'

// @TODO (undg) 2024-09-15: I need  two schemas. One for throwing errors, second for UI errors.

export const ConfigSchema = z
	.object({
		minVolume: z.number().min(def.MIN_VOLUME).max(def.MAX_VOLUME).catch(def.MIN_VOLUME),
		maxVolume: z.number().max(def.MAX_VOLUME).catch(def.MAX_VOLUME),
		stepVolume: z.number().catch(def.VOLUME_STEP),
		hostname: z.string().describe('Server host address').optional(),
		port: z
			.string()
			.regex(/^\d+$/, { message: 'Port must be a number' })
			.refine(
				val => {
					const num = parseInt(val, 10)
					return num >= 1024 && num <= 65535
				},
				{ message: 'Port must be between 1024 and 65535' },
			)
			.optional()
			.describe('Valid port between 1024 and 65535'),
		endpoint: z.string().startsWith('/').describe('API endpoint path starting with /'),
		serverUrl: z.string().optional().describe('Full server URL. Do not edit directly.'),
		showMonitoredSources: z.boolean().describe('Show monitored sources.'),
	})
	.transform(({ hostname, port, endpoint, maxVolume, minVolume, stepVolume, showMonitoredSources }) => ({
		/** Min volume for slider, default 0 */
		minVolume,
		/** Max volume for slider, default 150 */
		maxVolume,
		/** Step volume for slider, default 10 */
		stepVolume,
		/** Host address for the server */
		hostname,
		/** Port number for the server */
		port,
		/** API endpoint path */
		endpoint,
		/** Full server URL. Automatically generated. Do not edit directly. */
		serverUrl: `ws://${hostname}:${port}${endpoint}`,
		/** Filter out sources that are just sink monitors */
		showMonitoredSources,
	}))

export type Config = z.infer<typeof ConfigSchema>
