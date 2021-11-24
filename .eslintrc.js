module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 13,
	},
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		semi: [2, 'never'],
		'no-restricted-globals': 0,
		'consistent-return': 0,
	},
}
