export interface PrapiStatus {
	/**
	 * List of applications
	 */
	apps: App[]
	/**
	 * Build information
	 */
	buildInfo: BuildInfo
	/**
	 * List of output devices
	 */
	outputs: Output[]
	/**
	 * List of microphones and other sources
	 */
	sources: Source[]
}

export interface App {
	/**
	 * The id of the sink. Same  as name
	 */
	id: number
	/**
	 * Human-readable label for the sink
	 */
	label: string
	/**
	 * Whether the sink is muted
	 */
	muted: boolean
	/**
	 * Id of parrent device, same as output.id
	 */
	outputId: number
	/**
	 * Current volume level of the sink
	 */
	volume: number
}

/**
 * Build information
 */
export interface BuildInfo {
	/**
	 * The date and time of the build in ISO8601 format
	 */
	buildDate: string
	/**
	 * The compiler used for building
	 */
	compiler: string
	/**
	 * The Git commit hash
	 */
	gitCommit: string
	/**
	 * The version of the Git repository
	 */
	gitVersion: string
	/**
	 * The version of Go used for compilation
	 */
	goVersion: string
	/**
	 * The operating system and architecture
	 */
	platform: string
}

export interface Output {
	/**
	 * The id of the sink. Same  as name
	 */
	id: number
	/**
	 * Human-readable label for the sink
	 */
	label: string
	/**
	 * Whether the sink is muted
	 */
	muted: boolean
	/**
	 * The name of the sink. Same as id
	 */
	name: string
	/**
	 * Current volume level of the sink
	 */
	volume: number
}

export interface Source {
	/**
	 * Unique numeric identifier of the source
	 */
	id: number
	/**
	 * Human-readable label for the source
	 */
	label: string
	/**
	 * Name of monitor source capturing this source's output
	 */
	monitor: string
	/**
	 * Whether source is being monitored
	 */
	monitored: boolean
	/**
	 * Whether the source is muted
	 */
	muted: boolean
	/**
	 * Unique string identifier of the source
	 */
	name: string
	/**
	 * Current volume level of the source
	 */
	volume: number
}
