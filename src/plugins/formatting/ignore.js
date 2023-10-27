export default {
	
	// Basic Information
	name: 'ignore',
	author: 'Jesse Traynham',
	category: 'Formatting',
	aliases: ['md'],
	description: 'Ignores the content and returns it as a raw string, escaping any special characters.',
	kind: 'container',
	syntax: '[ignore] Your raw content here [/ignore]',
	version: '1.0.0',
	
	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'Content to be returned as a raw string.'
		}
	],
	
	// Examples for usage
	examples: [
		{
			payload: "{ }",
			input: '[ignore]# Header \n **Bold Text** [/ignore]',
			output: '# Header \n **Bold Text**',
			note: 'Content is returned as raw text.'
		},
	],

	// FUNCTIONALITY IS IN GRAMMAR.
	// processor(req) {
	// 	let { esc, raw } = req.engine.delimiters
	// 	let out = req.content?.split(raw.start).join(esc.start).split(raw.end).join(esc.end)
	// 	return out
	// }
	
}