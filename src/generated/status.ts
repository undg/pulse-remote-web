export interface PrapiStatus {
	/**
	 * Build information
	 */
	buildInfo: BuildInfo
	/**
	 * List of applications that are playing audio
	 */
	sinkInputs: SinkInput[]
	/**
	 * List of audio devices
	 */
	sinks: Sink[]
	/**
	 * List of microphones and other sources
	 */
	sources: Source[]
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

export interface SinkInput {
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
	 * Id of parrent device, same as sink.id
	 */
	sinkId: number
	/**
	 * Current volume level of the sink
	 */
	volume: number
}

export interface Sink {
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
	 * Name of monitor source
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
