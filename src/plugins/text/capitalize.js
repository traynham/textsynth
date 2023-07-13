export default {
	
	// Basic Information
	name: 'capitalize',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Capitalizes the first letter of a string.',
	kind: 'single',
	syntax: '[capitalize: property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The string to be capitalized.'
		}
	],

	// Examples for usage
	examples: [
		{
			input: "[capitalize: 'hello world']",
			output: "Hello world",
			note: 'This example capitalizes the first letter of the string "hello world".'
		}
	],

	processor({content}) {
		return content.charAt(0).toUpperCase() + content.slice(1);
	}
	
}