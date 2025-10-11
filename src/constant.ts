export const THROTTLE_TIME = 300
export const VIBRATE_TIME = 10
export const RELEASE_OPTIMISTIC_TIME = 150

/**
 * Default configuration values for audio controls and other settings.
 * Can be extended with additional configuration keys.
 */
export const def = {
	VOLUME_STEP: 5,
	MIN_VOLUME_STEP: 1,
	/**
	 * Max volume 150 is 150%. Although you can set it as loud as you like,
	 * value above 150 (150%) can damage your neighbors,
	 * value above 200 (200%) can damage your speakers.
	 */
	MAX_VOLUME: 150,
	MIN_VOLUME: 0,
}

export const testid = {
	// loading spinner
	loadingOrError: 'loading-or-error',

	// navbar
	gotoSinksPage: 'goto-sinks-page',
	gotoSourcesPage: 'goto-sources-page',
	gotoAbout: 'goto-about',
	gotoConfig: 'goto-config',

	// slider
	btnTheme: 'btn-theme',
	btnMuteToggle: 'btn-mute-toggle',
	btnVolumeUp: 'btn-volume-up',
	btnVolumeDown: 'btn-volume-down',

	// config page
	configPage: 'config-page',
	inputMinVolume: 'input-min-volume',
	inputMaxVolume: 'input-max-volume',
	inputStepVolume: 'input-step-volume',
	inputHostname: 'input-hostname',
	inputPort: 'input-port',
	inputEndpoint: 'input-endpoint',
	inputFullUrl: 'input-full-url',
	btnReset: 'input-reset',
	btnDetect: 'input-detect',
} as const
