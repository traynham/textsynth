export default {
	
	// Basic Information
	name: 'uppercase',
	aliases: ['upper', 'up'],
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Converts a string to uppercase.',
	kind: 'single',
	syntax: '[uppercase: property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to convert to uppercase.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: { example: 'This is a sentence.' },
			input: "[uppercase: example]",
			output: "THIS IS A SENTENCE.",
			note: 'This example converts the string "This is a sentence." to uppercase.'
		},
		{
			payload: { site: { title: 'my website title' } },
			input: "[uppercase: site.title]",
			output: "MY WEBSITE TITLE",
			note: 'This example converts the site title "my website title" to uppercase.'
		}
	],

	processor(req) {
		if(!req.content) { return ''}
		return req.content.toUpperCase()
	}

}