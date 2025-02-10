export interface PrapiMessage {
	/**
	 * Action to perform fe. GetVolume, SetVolume, SetMute...
	 */
	action: Action
	/**
	 * Paylod send with Set* actions if necessary
	 */
	payload?: any
}

/**
 * Action to perform fe. GetVolume, SetVolume, SetMute...
 */
export enum Action {
	GetBuildInfo = 'GetBuildInfo',
	GetStatus = 'GetStatus',
	MoveSinkInput = 'MoveSinkInput',
	MoveSourceOutput = 'MoveSourceOutput',
	SetSinkInputMuted = 'SetSinkInputMuted',
	SetSinkInputVolume = 'SetSinkInputVolume',
	SetSinkMuted = 'SetSinkMuted',
	SetSinkVolume = 'SetSinkVolume',
	SetSourceInputMuted = 'SetSourceInputMuted',
	SetSourceInputVolume = 'SetSourceInputVolume',
	SetSourceMuted = 'SetSourceMuted',
	SetSourceVolume = 'SetSourceVolume',
}
