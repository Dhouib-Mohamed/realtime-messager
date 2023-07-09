module.exports = {
root: true,
extends: [
	'eslint:recommended',
	'plugin:@typescript-eslint/recommended',
	'plugin:svelte/recommended',
	'prettier'
],
parser: '@typescript-eslint/parser',
plugins: [ '@typescript-eslint' ],
parserOptions: {
	sourceType: 'module',
	ecmaVersion: 2020,
	extraFileExtensions: [ '.svelte' ]
},
env: {
	browser: true,
	es2017: true,
	node: true
},
overrides: [
	{
		files: [ '*.svelte' ],
		parser: 'svelte-eslint-parser',
		parserOptions: {
			parser: '@typescript-eslint/parser'
		},
		rules: {
			'svelte/valid-compile': 'off',
			'svelte/a11y-click-events-have-key-events': 'off',
			'svelte/a11y-no-static-element-interactions': 'off',
			'svelte/a11y-label-has-associated-control': 'off',
			'@typescript-eslint/no-empty-function': ['warn', {'allow': ['arrowFunctions']}],
		}
	}
]
};
