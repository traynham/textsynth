export default {
	
	// Basic Information
	name: 'log',
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
		{
			payload: {property: {path: 'propertyValue'}},
			input: "[log: 'THE PATH:', property.path]",
			note: "Use the log plugin to log the value of an object's property with a grouping.",
			output: 'Logs the value of property.path to the console',
		},
		{
			payload: {property: {path: 'propertyValue'}, another: 'value'},
			input: "[log: 'THE PATH:', property.path]",
			note: "Use the log plugin to log the multiple objects with a grouping.",
			output: 'Logs the value of property.path to the console',
		},
		{
			payload: {property: {path: 'propertyValue', name: 'Bob'}},
			input: "[log: 'THE VALUES:', property, -table]",
			note: "Use the log plugin to log object as a table with a grouping.",
			output: 'Logs the value of property.path to the console',
		},
	],

	processor(req) {
		
		let group
		let log = console.log
		
		// AUTO GROUP
		if(typeof req.contents[0] == 'string' & req.contents.length > 1){
			group = req.contents[0]
			req.contents.shift()
		}
		
		// AS TABLE
		if(req.cargo.flags.includes('table')){
			log = console.table	
		}
		
		if(group){
			console.group(group)
			log(...req.contents)
			console.groupEnd()
			return ''
		}
		
		log(...req.contents)
		return ''
		
	}

}