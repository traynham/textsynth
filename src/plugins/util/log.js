export default {
	name: 'log',
	description: 'Logs a message value to the console.',
	examples: [
		{
			code: '[log: "Hello, World!"]',
			result: 'Logs "Hello, World!" to the console',
			comment: "Use the log plugin to log a string."
		},
		{
			code: '[log: property.path]',
			result: 'Logs the value of property.path to the console',
			comment: "Use the log plugin to log the value of an object's property."
		}
	],
	syntax: "[log: 'Something amazing just happened!']",
	category: 'Util',
	type: 'string',
	kind: 'single',
	processor(req) {
		return console.log(req.content)
	}
}