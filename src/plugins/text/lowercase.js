export default {
	
	// Basic Information
	name: 'lowercase',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Converts a string to lowercase.',
	kind: 'single',
	syntax: '[lowercase: property.path]',
	aliases: ['lower', 'lc'],
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to be converted to lowercase.'
		}
	],

	// Examples for usage
	examples: [
		{
			input: "[lowercase: 'Hello World']",
			output: "hello world",
			note: 'This example converts the string "Hello World" to lowercase.'
		},
		{
			payload: { site: { title: 'My Cool Site' } },
			input: "[lowercase: site.title]",
			output: "my cool site",
			note: 'This example converts the site title to lowercase.'
		}
	],

	processor({content}) {
		if(typeof content !== 'string') return content
		return content.toLowerCase()
	}
	
}