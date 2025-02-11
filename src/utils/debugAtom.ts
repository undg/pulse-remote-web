import { WritableAtom } from 'jotai'

export function debugAtom(atom: WritableAtom<any, [any], void>, name: string) {
	if (process.env.NODE_ENV !== 'production') {
		atom.debugLabel = name
	}
}
