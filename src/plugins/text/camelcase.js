export default {
	
	// Basic Information
	name: 'camelcase',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Converts a string to camelCase.',
	kind: 'single',
	syntax: '[camelcase: property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The string to be converted to camelCase.'
		}
	],

	// Examples for usage
	examples: [
		{
			input: "[camelcase: 'hello world']",
			output: "helloWorld",
			note: 'This example converts the string "hello world" to "helloWorld".'
		}
	],

	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, '');
	}

}