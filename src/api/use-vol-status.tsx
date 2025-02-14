import { atom } from 'jotai'
import { useAtomDevtools } from 'jotai-devtools'
import { useImmerAtom } from 'jotai-immer'
import { useEffect } from 'react'
import type {
	IncomingMessage,
	MessageMoveSinkInput,
	MessageSetSinkInputMuted,
	MessageSetSinkInputVolume,
	MessageSetSinkMuted,
	MessageSetSinkVolume,
	MessageSetSourceMuted,
	MessageSetSourceVolume,
} from './types'
import { useWebSocketApi } from './use-web-socket-api'
import { PrapiStatus } from '../generated/status'
import { Action } from '../generated/message'
import { debugAtom } from '../utils/debugAtom'

export const volStatusAtom = atom<PrapiStatus>()
debugAtom(volStatusAtom, 'volStatusAtom')

export const useVolumeStatus = () => {
	const [volStatus, updateVolStatus] = useImmerAtom(volStatusAtom)
	useAtomDevtools(volStatusAtom)
	const { lastMessage, sendMessage } = useWebSocketApi()

	// It updates status when backend server broadcasts new state
	useEffect(() => {
		if (lastMessage && typeof lastMessage.data === 'string') {
			const incomingMessage = JSON.parse(lastMessage.data) as IncomingMessage
			updateVolStatus(draft => {
				if (incomingMessage.action === 'GetStatus' && Boolean(incomingMessage.payload)) {
					return incomingMessage.payload
				}
				return draft
			})
		}
	}, [lastMessage, updateVolStatus])

	const setSink = ({ name, volume }: MessageSetSinkVolume['payload']) => {
		function optimistic() {
			updateVolStatus(draft => {
				const sink = draft?.outputs?.find(s => s.name === name)
				if (sink) {
					sink.volume = volume
				}
			})
		}

		function send() {
			sendMessage({
				action: Action.SetSinkVolume,
				payload: { name, volume },
			})
		}

		return {
			optimistic,
			send,
		}
	}

	const setSinkInput = ({ id, volume }: MessageSetSinkInputVolume['payload']) => {
		function optimistic() {
			updateVolStatus(draft => {
				const sink = draft?.apps?.find(s => s.id === id)
				if (sink) {
					sink.volume = volume
				}
			})
		}

		function send() {
			sendMessage({
				action: Action.SetSinkInputVolume,
				payload: { id, volume },
			})
		}

		return {
			optimistic,
			send,
		}
	}

	const moveSinkInput = ({ name, id }: MessageMoveSinkInput['payload']) => {
		updateVolStatus(draft => {
			const app = draft?.apps.find(a => a.id === id)

			const newOutputId = draft?.outputs.find(o => o.name === name)?.id

			if (app && newOutputId) {
				app.outputId = newOutputId
			}
		})
		sendMessage({
			action: Action.MoveSinkInput,
			payload: { name, id },
		})
	}

	const toggleSinkMute = ({ name }: Pick<MessageSetSinkMuted['payload'], 'name'>) => {
		updateVolStatus(draft => {
			const sink = draft?.outputs?.find(s => s.name === name)
			if (sink) {
				sink.muted = !sink.muted
			}
		})

		sendMessage({
			action: Action.SetSinkMuted,
			payload: { name, muted: !volStatus?.outputs?.find(s => s.name === name)?.muted },
		})
	}

	const toggleSinkInputMute = ({ id }: Pick<MessageSetSinkInputMuted['payload'], 'id'>) => {
		sendMessage({
			action: Action.SetSinkInputMuted,
			payload: { id, muted: !volStatus?.apps?.find(s => s.id === id)?.muted },
		})
	}

	const setSource = ({ name, volume }: MessageSetSourceVolume['payload']) => {
		function optimistic() {
			updateVolStatus(draft => {
				const source = draft?.sources?.find(s => s.name === name)
				if (source) {
					source.volume = volume
				}
			})
		}

		function send() {
			sendMessage({
				action: Action.SetSourceVolume,
				payload: { name, volume },
			})
		}

		return {
			optimistic,
			send,
		}
	}

	const toggleSourceMute = ({ name }: Pick<MessageSetSourceMuted['payload'], 'name'>) => {
		updateVolStatus(draft => {
			const source = draft?.sources?.find(s => s.name === name)
			if (source) {
				source.muted = !source.muted
			}
		})

		sendMessage({
			action: Action.SetSourceMuted,
			payload: { name, muted: !volStatus?.sources?.find(s => s.name === name)?.muted },
		})
	}

	return {
		volStatus,

		// Sink
		setSink,
		toggleSinkMute,

		// SinkInput
		setSinkInput,
		moveSinkInput,
		toggleSinkInputMute,

		// Source
		setSource,
		toggleSourceMute,
	}
}
