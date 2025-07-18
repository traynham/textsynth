export default {
	
	// Basic Information
	name: 'plat',
	author: 'Jesse Traynham',
	category: 'Util',
	description: 'Return the platform. This is just a test.',
	kind: 'single',
	syntax: "[plat]",
	version: '1.0.0',

	// Content key
	content: [
		{
			name: 'message',
			type: 'string',
			description: 'The message to log to the console.',
			required: true
		}
	],

	// Examples for usage
	examples: [
		{
			input: '[log: "Hello, World!"]',
			note: "Use the log plugin to log a string.",
			output: 'Logs "Hello, World!" to the console',
		},
		{
			payload: {property: {path: 'propertyValue'}},
			input: '[log: property.path]',
			note: "Use the log plugin to log the value of an object's property.",
			output: 'Logs the value of property.path to the console',
		},
	],

	processor(req) {
		
		if(req.engine.env.platform == 'node'){
			return this.onProcessNode(req)
		} else {
			return this.onProcessBrowser(req)
		}
		
	},
	
	onProcessNode(req) {
		console.log('REQ::', req)
		return 'node'
	},
	
	onProcessBrowser(req){
		console.log('REQ::', req)
		return 'browser'
	}

}