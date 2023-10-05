export default {
	name: 'stringify',
	author: 'Jesse Traynham',
	version: '1.0.0',
	description: 'Converts a JavaScript value (such as an object, array, number, or string) to a JSON string.',
	examples: [
		{
			payload: `{ stringy: { key: 'value', key2: 'value2' } }`,
			input: "[stringify stringy]",
			output: '{"key":"value","key2":"value2"}',
			note: 'Converts an object to a JSON string.'
		},
		{
			payload: `{ fruit: ['apple', 'orange', 'banana'] }`,
			input: "[stringify fruit]",
			output: '["apple","orange","banana"]',
			note: 'Converts an array to a JSON string.'
		},
		{
			input: "[stringify 'Hello, World!']",
			output: '"Hello, World!"',
			note: 'Converts a string to a JSON string.'
		},
	],
	syntax: '[stringify value]',
	content: [
		{
			name: 'content',
			type: 'any',
			required: true,
			description: 'The JavaScript value to be converted to a JSON string.'
		}
	],
	category: 'Encoding',
	kind: 'single',
	processor(req) {
		
		if(req.cargo.flags.includes('pretty')){
			return JSON.stringify(req.content, null, 2)
		}
		
		return JSON.stringify(req.content)
		
	}
}