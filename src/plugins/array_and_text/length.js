export default {
	
	// Basic Information
	name: 'length',
	author: 'Jesse Traynham',
	description: 'Returns the length of a string or the number of elements in an array.',
	version: '1.0.0',
	category: 'Array/Text',
	kind: 'single',
	syntax: '[length: property.path]',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: ['string', 'array'],
			required: true,
			description: 'Content (string or array) whose length is to be determined.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: "{ text: 'This is 10' }",
			input: '[length: text]',
			output: '10',
			note: 'The content is a string of length 10.'
		},
		{
			payload: "{ array: ['one', 'two', 'three', 'four', 'five'] }",
			input: '[length: array]',
			output: '5',
			note: 'The content is an array of length 5.'
		},
	],

	// Processor logic
	processor(req) {
		return req.content.length;
	}
}
