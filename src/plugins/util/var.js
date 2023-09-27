export default {
	
	// Basic Information
	name: 'var',
	author: 'Jesse Traynham',
	category: 'Util',
	description: 'Logs a message value to the console.',
	kind: 'single',
	syntax: "[log: 'Something amazing just happened!']",
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
		
		if(!Object.keys(req.cargo.assignment).length){
			return 'ERROR: "var" tag requires a valid asignment parameter.'
		}
		
		if(!req.payload._variables) {
			req.payload._variables = {}
		}
		
		for (const key in req.cargo.assignment) {
			req.payload[key] = req.cargo.assignment[key]
			req.payload._variables[key] = req.cargo.assignment[key] // NOT CURRENTLY USED. RESERVED FOR FUTURE USE.
		}
		
		return ''
		
	}

}