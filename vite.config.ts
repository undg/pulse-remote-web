/// <reference types="vitest" />
import path from 'node:path'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
	test: {
		css: false,
		include: ['**/*.test.{ts,tsx}'],
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setup-tests.ts',
		clearMocks: true,
		coverage: {
			include: ['src/**/*'],
			exclude: ['src/main.tsx'],
			thresholds: {
				'100': false,
			},
			provider: 'istanbul',
			enabled: false,
			reporter: ['text', 'lcov'],
			reportsDirectory: 'coverage',
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(new URL('src', import.meta.url).toString()),
		},
	},
	plugins: [react(), ...(mode === 'test' ? [] : [eslintPlugin()])],
}))
