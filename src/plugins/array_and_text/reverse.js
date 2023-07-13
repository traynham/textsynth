export default {
	
	// Basic Information
	name: 'reverse',
	author: 'Jesse Traynham',
	category: 'Array/Text',
	description: 'Reverses a string or the order of elements in an array.',
	kind: 'single',
	syntax: '[reverse: property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'any',
			required: true,
			description: 'The input value, which should be a string or an array.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: "{ title: 'Hello World' }",
			input: '[reverse: title]',
			output: 'dlroW olleH',
			note: 'The string is reversed.'
		},
		{
			payload: "{ numbers: [1, 2, 3, 4, 5] }",
			input: '[reverse: numbers]',
			output: '[5, 4, 3, 2, 1]',
			note: 'The order of elements in the array is reversed.'
		}
	],

	// Processor logic
	processor(req) {
		let {content} = req
		return Array.isArray(content) ? content.reverse() : content.split('').reverse().join('')	
	}
}
