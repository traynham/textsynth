export default {
	
	// Basic Information
	name: 'snakecase',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Converts a string to snake_case.',
	kind: 'single',
	syntax: '[snakecase: property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to convert to snake_case.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: { example: 'exampleTextForSnakeCase' },
			input: "[snakecase: example]",
			output: "example_text_for_snake_case",
			note: 'This example converts "exampleTextForSnakeCase" to snake_case.'
		}
	],

	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase();
	}

}