export default {
	
	// Basic Information
	name: 'unescape_delimiters',
	author: 'Jesse Traynham',
	category: 'Encoding',
	description: 'Unescapes TextSynth tag delimiters.',
	kind: 'single',
	syntax: '[unescape_delimiters: property.path]',
	version: '1.0.0',

	// Content details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The path or content to unescape delimiters.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: `{ text: '& lbrack;uppercase "boom"& rbrack;' }`,
			input: '[unescape_delimiters: text]',
			output: '&lbrack;uppercase "boom"&rbrack;',
			note: 'Escaped delimiters are converted back to their original form.'
		},
	],

	// Processor logic
	processor(req) {
		
		if(!req.content) { return req.content }
		
		let { raw, esc } = req.textMerger.delimiters
		
		return req.content
			.split(esc.start).join(raw.start)
			.split(esc.end).join(raw.end)
			
	}
	
}
