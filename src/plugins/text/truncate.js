export default {
	
	// Basic Information
	name: 'truncate',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Truncates a string to a specified length, optionally appending a custom suffix.',
	kind: 'single',
	syntax: '[truncate(maxLength, suffix): property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to truncate.'
		}
	],
	params: [
		{
			name: 'maxLength',
			type: 'number',
			required: true,
			description: 'The maximum length of the output string.'
		},
		{
			name: 'suffix',
			type: 'string',
			required: false,
			description: 'The suffix to append if the string is truncated.',
			default: '...'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: { example: 'This is a long sentence that will be truncated.' },
			input: "[truncate(20): example]",
			output: "This is a long sent...",
			note: 'This example truncates the string "This is a long sentence that will be truncated." to a maximum length of 20 characters.'
		},
		{
			payload: { example: 'This is another long sentence that will be truncated.' },
			input: "[truncate(20, '~~~'): example]",
			output: "This is another lo~~~",
			note: 'This example truncates the string "This is another long sentence that will be truncated." to a maximum length of 20 characters, and appends "~~~" to the end.'
		}
	],

	processor({content, params}) {
		let [ maxLength = 80, suffix = '...' ] = params
		return content.length <= maxLength ? content : content.slice(0, maxLength) + suffix
	}
	
}