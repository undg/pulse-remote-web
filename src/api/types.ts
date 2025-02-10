import { PrapiStatus } from '../generated/status'

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

// @TODO (undg) 2025-02-10: generate it from go-prapi/json/json.go `AvailableCommands`
/** Message send to the server via websocket */
export type Message =
	// Get composed informations about all sinks, sources, inputs and build
	| { action: 'GetStatus' }

	// Metadata about build
	| { action: 'GetBuildInfo' }

	// SINKS, e.g. Speakers
	| {
			action: 'SetSinkVolume'
			payload: { name: string; volume: number }
	  }
	| {
			action: 'SetSinkMuted'
			payload: { name: string; muted: boolean }
	  }

	// Apps playing audio
	| {
			action: 'SetSinkInputVolume'
			payload: { id: number; volume: number }
	  }
	| {
			action: 'SetSinkInputMuted'
			payload: { id: number; muted: boolean }
	  }
	// SOURCES, Microphone
	| {
			action: 'SetSourceVolume'
			payload: { name: string; volume: number }
	  }
