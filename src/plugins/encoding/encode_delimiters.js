export default {
	
	// Basic Information
	name: 'encode_delimiters',
	author: 'Jesse Traynham',
	description: 'Encodes TextSynth tag delimiters in the provided content.',
	version: '1.0.0',
	category: 'Encoding',
	kind: 'single',
	syntax: '[encode_delimiters: property.path]',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'Content within which the delimiters need to be encoded.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: "{ text: '[uppercase 'boom']' }",
			input: '[encode_delimiters text]',
			output: '&amp;lbrack;uppercase \'boom\'&amp;rbrack;',
			note: 'The delimiters within the text have been replaced by their escape sequences.'
		},
	],

	// Processor logic
	processor(req) {
		
		if(!req.content) { return req.content }
		if(typeof req.content !== 'string') { return req.content }
		
		let { raw, enc } = req.textMerger.delimiters
		return req.content?.split(raw.start).join(enc.start).split(raw.end).join(enc.end)
		
	}
	
}
