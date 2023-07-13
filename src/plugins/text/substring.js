export default {
	
	// Basic Information
	name: 'substring',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Returns a substring from the specified start and end indices.',
	kind: 'single',
	syntax: '[substring(start, end): property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to get a substring from.'
		}
	],
	params: [
		{
			name: 'start',
			type: 'number',
			required: true,
			description: 'The starting index of the substring.'
		},
		{
			name: 'end',
			type: 'number',
			required: true,
			description: 'The ending index of the substring.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: { example: 'exampleSubstring' },
			input: "[substring(0, 5): example]",
			output: "examp",
			note: 'This example retrieves the substring of "exampleSubstring" from index 0 to 5.'
		}
	],

	processor({content, params}) {
		let [start = 0, end = 0] = params
		
		if(typeof content !== 'string') return content
		if(start + end === 0) return content
		
		return content.substring(parseInt(start), parseInt(end))
	}
	
}