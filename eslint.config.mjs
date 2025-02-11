import tseslint from 'typescript-eslint'
import eslintPluginImport from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import eslintPluginEslintComments from 'eslint-plugin-eslint-comments'

import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
	includeIgnoreFile(gitignorePath),
	{
		files: ['src/**/*.ts', 'src/**/*.tsx'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			parser: tseslint.parser,
			parserOptions: {
				project: ['./tsconfig.json'],
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			'eslint-comments': eslintPluginEslintComments,
			'unused-imports': eslintPluginUnusedImports,
			react: reactPlugin,
			reactHooks,
			import: eslintPluginImport,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'no-dupe-else-if': 'error',
			'no-promise-executor-return': 'error',
			'no-unreachable-loop': 'error',
			'no-useless-backreference': 'error',
			'require-atomic-updates': 'error',
			'default-case-last': 'error',
			'grouped-accessor-pairs': 'error',
			'no-constructor-return': 'error',
			'no-implicit-coercion': 'error',
			'prefer-destructuring': 'off',
			'prefer-regex-literals': 'error',
			'capitalized-comments': 'off',
			'no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			'no-restricted-syntax': [
				'error',
				{
					selector: 'ForInStatement',
					message:
						'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
				},
				{
					selector: 'LabeledStatement',
					message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
				},
				{
					selector: 'WithStatement',
					message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
				},
			],
			'arrow-body-style': 'off',
			'no-param-reassign': 'off',
			'no-void': 'off',
			'eslint-comments/no-unused-disable': 'warn',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/init-declarations': 'off',
			'@typescript-eslint/member-ordering': 'off',
			'@typescript-eslint/no-implicit-any-catch': 'off',
			'@typescript-eslint/no-magic-numbers': 'off',
			'@typescript-eslint/no-restricted-imports': 'off',
			'@typescript-eslint/no-use-before-define': 'off',
			'@typescript-eslint/non-nullable-type-assertion-style': 'off',
			'@typescript-eslint/padding-line-between-statements': 'off',
			'@typescript-eslint/prefer-enum-initializers': 'off',
			'@typescript-eslint/prefer-destructuring': 'off',
			'@typescript-eslint/prefer-includes': 'off',
			'@typescript-eslint/prefer-readonly-parameter-types': 'off',
			'@typescript-eslint/prefer-regexp-exec': 'off',
			'@typescript-eslint/return-await': 'off',
			'@typescript-eslint/sort-type-constituents': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/prefer-ts-expect-error': 'error',
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{
					'ts-ignore': 'allow-with-description',
					'ts-expect-error': 'allow-with-description',
				},
			],
			'@typescript-eslint/no-confusing-void-expression': [
				'error',
				{
					ignoreArrowShorthand: true,
				},
			],
			'import/prefer-default-export': 'off',
			'import/order': 'off',
			'import/no-deprecated': 'error',
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: [
						'cypress.config.ts',
						'vite.config.ts',
						'src/setup-tests.ts',
						'src/test-utils.tsx',
						'src/mocks/**',
						'**/*.test.{ts,tsx}',
					],
				},
			],
			'react/function-component-definition': 'off',
			'react/destructuring-assignment': 'off',
			'react/jsx-curly-brace-presence': 'off',
			'react/jsx-handler-names': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/no-did-update-set-state': 'off',
			'react/no-find-dom-node': 'off',
			'react/no-is-mounted': 'off',
			'react/no-redundant-should-component-update': 'off',
			'react/no-render-return-value': 'off',
			'react/no-string-refs': 'off',
			'react/no-this-in-sfc': 'off',
			'react/no-unescaped-entities': 'off',
			'react/no-unused-state': 'off',
			'react/no-will-update-set-state': 'off',
			'react/prefer-es6-class': 'off',
			'react/prefer-stateless-function': 'off',
			'react/prop-types': 'off',
			'react/require-default-props': 'off',
			'react/require-render-return': 'off',
			'react/sort-comp': 'off',
			'react/state-in-constructor': 'off',
			'react/static-property-placement': 'off',
			'react/boolean-prop-naming': [
				'error',
				{
					validateNested: true,
				},
			],
			'react/no-unstable-nested-components': 'error',
			'react/jsx-key': 'error',
			'react/jsx-no-bind': [
				'error',
				{
					ignoreRefs: false,
					allowArrowFunctions: true,
					allowFunctions: true,
					allowBind: false,
					ignoreDOMComponents: false,
				},
			],
			'react/jsx-no-constructed-context-values': 'error',
			'react/jsx-no-script-url': 'error',
			'react/jsx-no-useless-fragment': 'error',
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							regex: '^(?!.*/primitives/button$).*$',
							importNames: ['Button'],
							message: 'This is most likely mistake, did you want to import from /primitives/(...) instead?',
						},
						{
							regex: '^(?!.*/primitives/switch$).*$',
							importNames: ['Switch'],
							message: 'This is most likely mistake, did you want to import from /primitives/(...) instead?',
						},
						{
							regex: '^(?!.*/primitives/label$).*$',
							importNames: ['Label'],
							message: 'This is most likely mistake, did you want to import from /primitives/(...) instead?',
						},
						{
							regex: '^(?!.*/primitives/input$).*$',
							importNames: ['Input'],
							message: 'This is most likely mistake, did you want to import from /primitives/(...) instead?',
						},
						{
							regex: '^(?!.*/primitives/slider$).*$',
							importNames: ['Slider'],
							message: 'This is most likely mistake, did you want to import from /primitives/(...) instead?',
						},
						{
							regex: '^(?!.*/primitives/toggle$).*$',
							importNames: ['Toggle'],
							message: 'This is most likely mistake, did you want to import from /primitives/(...) instead?',
						},
					],
				},
			],
		},
	},
	{
		files: ['vite.config.ts', 'cypress.config.ts'],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json'],
			},
		},
	},
]
