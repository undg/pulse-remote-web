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

/** Message send to the server via websocket */
export type Message =
	| {
			action: 'SetSinkVolume'
			payload: { name: string; volume: number }
	  }
	| {
			action: 'SetSinkMuted'
			payload: { name: string; muted: boolean }
	  }
	| {
			action: 'SetSinkInputVolume'
			payload: { id: number; volume: number }
	  }
	| {
			action: 'SetSinkInputMuted'
			payload: { id: number; muted: boolean }
	  }
	| { action: 'GetStatus' }
