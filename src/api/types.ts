import { Action } from '../generated/message'
import { App, Output, PrapiStatus, Source } from '../generated/status'

// @TODO (undg) 2024-09-19: generate those types on the BE or generate them from GetSchema API provided by the server.
type ActionIn = 'GetStatus'
// And more

/** Message received from the server */
export type IncomingMessage = {
	action: ActionIn
	status: number // 400x
	payload?: PrapiStatus
	error?: string
}

// [Status] Get composed informations about all sinks, sources, inputs and build
//////////////////////////////////////////////////////////////////
export type MessageGetStatus = {
	action: Action.GetStatus
}

// [BuildInfo]
//////////////////////////////////////////////////////////////////
export type MessageGetBuildInfo = {
	action: Action.GetBuildInfo
}

// [SINK] SINKS, e.g. Speakers
//////////////////////////////////////////////////////////////////
export type MessageSetSinkVolume = {
	action: Action.SetSinkVolume
	payload: { name: Output['name']; volume: Output['volume'] }
}

export type MessageSetSinkMuted = {
	action: Action.SetSinkMuted
	payload: { name: Output['name']; muted: Output['muted'] }
}

// [SinkInput] APPs playing audio
//////////////////////////////////////////////////////////////////
export type MessageSetSinkInputVolume = {
	action: Action.SetSinkInputVolume
	payload: { id: App['id']; volume: App['volume'] }
}

export type MessageSetSinkInputMuted = {
	action: Action.SetSinkInputMuted
	payload: { id: App['id']; muted: App['muted'] }
}

export type MessageMoveSinkInput = {
	action: Action.MoveSinkInput
	payload: { name: Output['name']; id: App['id'] }
}

// [Source] Microphones and recording devices
//////////////////////////////////////////////////////////////////
export type MessageSetSourceVolume = {
	action: Action.SetSourceVolume
	payload: { name: Source['name']; volume: Source['volume'] }
}

export type MessageSetSourceMuted = {
	action: Action.SetSourceMuted
	payload: { name: Source['name']; muted: Source['muted'] }
}

// @TODO (undg) 2025-02-10: generate it from go-prapi/json/json.go `AvailableCommands`
/** Message send to the server via websocket */
export type Message =
	// Get composed informations about all sinks, sources, inputs and build
	| MessageGetStatus

	// Metadata about build
	| MessageGetBuildInfo

	// SINKS, e.g. Speakers
	| MessageSetSinkVolume
	| MessageSetSinkMuted

	// Apps playing audio
	| MessageSetSinkInputVolume
	| MessageSetSinkInputMuted
	| MessageMoveSinkInput

	// SOURCES, Microphone
	| MessageSetSourceVolume
	| MessageSetSourceMuted
