export default {
	
	// Basic Information
	name: 'replace',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Replaces all occurrences of a search string with a replacement string.',
	kind: 'single',
	syntax: '[replace(search, replacement): property.path]',
	version: '1.0.0',

	// Content and Params details
	content:[
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property where replacements will be made.'
		}
	],
	params: [
		{
			name: 'search',
			type: 'string',
			required: true,
			description: 'The string to be replaced.'
		},
		{
			name: 'replacement',
			type: 'string',
			required: true,
			description: 'The string to replace with.'
		}
	],

	// Examples for usage
	examples: [
		{
			input: "[replace('Hello', 'Hi'): 'Hello World']",
			output: "Hi World",
			note: 'This example replaces "Hello" with "Hi" in the string "Hello World".'
		},
		{
			payload: { site: { title: 'My Cool Site' } },
			input: "[replace(' ', '-'): site.title]",
			output: "My-Cool-Site",
			note: 'This example replaces spaces with hyphens in the site title.'
		}
	],

	processor(req) {
		const [ search, replacement ] = req.params
		const replacer = new RegExp(search, 'g')
		return req.content.replace(replacer, replacement)
	}
	
}