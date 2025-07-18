import globals from "globals"
import pluginJs from "@eslint/js"


/** @type {import('eslint').Linter.Config[]} */
export default [
	
	// GLOBAL SETTINGS
	{
		languageOptions: {
			globals: {
				...globals.browser,
				process: "readonly"
			}
		},
	},
	
	// MOCHA+CHAI SETTINGS
	{
		files: ["static/public/tests/**/*.js"],
		languageOptions: {
			globals: {
				afterEach: "readonly",
				beforeEach: "readonly",
				describe: "readonly",
				it: "readonly",
				before: "readonly",
				after: "readonly",
			}
		}
	},
	pluginJs.configs.recommended
]