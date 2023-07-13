export default {
	
	// Basic Information
	name: 'trim',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Trims whitespace from the beginning and end of a string.',
	kind: 'single',
	syntax: '[trim: property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to trim.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: { example: ' example trim ' },
			input: "[trim: example]",
			output: "example trim",
			note: 'This example trims the whitespace from the string " example trim ".'
		}
	],

	processor({content}) {
		return content.trim()
	}

}