export default {
	
	// Basic Information
	name: 'titlecase',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Converts a string to title case, capitalizing the first letter of each word.',
	kind: 'single',
	syntax: '[titlecase: property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to convert to title case.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: { example: 'example title case' },
			input: "[titlecase: example]",
			output: "Example Title Case",
			note: 'This example converts "example title case" to "Example Title Case".'
		}
	],

	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
	}
	
}