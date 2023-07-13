export default {
	// Basic Information
	name: 'escape_html',
	author: 'Jesse Traynham',
	category: 'Encoding',
	description: 'Escapes HTML entities in a string to prevent code injection.',
	kind: 'single',
	syntax: '[escapeHtml: property.path]',
	version: '1.0.0',

	// Params details
	params: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path to the property to escape HTML characters.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: "{ text: '<div>Hello</div>' }",
			input: "[escapeHtml: text]",
			output: '&lt;div&gt;Hello&lt;/div&gt;',
			note: 'HTML tags are escaped to prevent code injection.'
		}
	],

	// Processor logic
	processor(req) {

		let escapeCodes = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&apos;',
			'[': '&lbrack;',
			']': '&rbrack;'
		}

		return req.content?.replace(/[&<>"'[\]]/g, tag => escapeCodes[tag])

	}
}
