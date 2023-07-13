export default {
	
	// Basic Information
	name: 'repeat',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Repeats a string a specified number of times.',
	kind: 'single',
	syntax: '[repeat(times): property.path]',
	version: '1.0.0',

	// Content and Params details
	content:[
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to be repeated.'
		}
	],
	params: [
		{
			name: 'times',
			type: 'number',
			required: true,
			description: 'The number of times to repeat the string.'
		}
	],

	// Examples for usage
	examples: [
		{
			input: "[repeat(3): 'Hello']",
			output: "HelloHelloHello",
			note: 'This example repeats the string "Hello" 3 times.'
		},
		{
			payload: { site: { title: 'My Cool Site' } },
			input: "[repeat(2): site.title]",
			output: "My Cool SiteMy Cool Site",
			note: 'This example repeats the site title 2 times.'
		}
	],

	processor(req) {
		return req.content.repeat(parseInt(req.params[0]))
	}
}
