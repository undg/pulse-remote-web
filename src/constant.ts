export const def = {
	VOLUME_STEP: 10,
	/**
	 * Max volume 150 is 150%. Although you can set it as loud as you like,
	 * value above 200 (200%) can damage your speakers.
	 */
	MAX_VOLUME: 150,
	MIN_VOLUME: 0,
}

export const testid = {
	// loading spinner
	loadingOrError: 'loading-or-error',

	// navbar
	gotoOutputDevices: 'goto-output-devices',
	gotoInputDevices: 'goto-input-devices',
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
