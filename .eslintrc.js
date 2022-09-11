module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module"
	},
	extends: [
		"airbnb-base",
		"airbnb-typescript/base",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:eslint-comments/recommended",
		"plugin:prettier/recommended",
		"plugin:compat/recommended"
	],
	env: {
		es6: true,
		node: true,
		browser: true
	},
	plugins: ["@typescript-eslint", "eslint-comments", "prettier"],
	rules: {
		quotes: ["error", "double"],
		"class-methods-use-this": "off",
		"no-restricted-syntax": "off",
		"no-use-before-define": "off",
		"import/extensions": "off",
		"import/prefer-default-export": "off",
		"no-plusplus": "off",
		"max-len": [
			"error",
			{
				code: 100,
				tabWidth: 4
			}
		],
		"no-param-reassign": "off",
		"no-underscore-dangle": "off",
		"import/no-unresolved": "off",
		"consistent-return": "off",
		"no-prototype-builtins": "off",
		"no-nested-ternary": "off",
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto"
			}
		],
		"no-unsafe-member-access": "off",
		"no-unsafe-call": "off"
	}
};
