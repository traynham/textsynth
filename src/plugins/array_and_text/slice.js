export default {

	// Basic Information
	name: 'slice',
	author: 'Jesse Traynham',
	category: 'Array/Text',
	description: 'Extracts a section of a string or array from the specified start and end indices.',
	kind: 'single',
	syntax: '[slice(start, end): property.path]',
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
	params: [
		{
			name: 'start',
			type: 'integer',
			required: true,
			description: 'Start index of the section to extract.'
		},
		{
			name: 'end',
			type: 'integer',
			required: true,
			description: 'End index of the section to extract.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: "{ title: 'Hello World' }",
			input: '[slice(0, 5): title]',
			output: 'Hello',
			note: 'The substring from index 0 to 5 (exclusive) is extracted.'
		},
		{
			payload: "{ numbers: [1, 2, 3, 4, 5] }",
			input: '[slice(1, 4): numbers]',
			output: '[2, 3, 4]',
			note: 'The subarray from index 1 to 4 (exclusive) is extracted.'
		}
	],

	// Processor logic
	processor(req) {
		let [ start, end ] = req.params
		return req.content.slice(parseInt(start), parseInt(end))
	}
}
