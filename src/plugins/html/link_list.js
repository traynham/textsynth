export default {

	// Basic Information
	name: 'linkList',
	author: 'Jesse Traynham',
	category: 'HTML',
	description: 'Generates an HTML list of links from an object with name-url pairs.',
	type: ['object'],
	version: '1.0.0',
	
	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'object',
			required: true,
			description: 'An object containing key-value pairs of names and URLs.'
		}
	],
	params: [],
	
	// Examples for usage
	examples: [
		{
			payload: {
				"sidebar": {
					"Home": "/",
					"About": "/about",
					"Contact": "/contact"
				}
			},
			input: '[linkList: sidebar]',
			output: '<ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li></ul>',
			note: 'Generates an unordered list of links using the names and URLs from the "sidebar" object.'
		},
	],

	processor(req) {
		
		if(!req.content) { return req.content }
		
		const listItems = Object.entries(req.content)
			.map(([name, url]) => `<li><a href="${url}">${name}</a></li>`)
			.join('');
			
		return `<ul>${listItems}</ul>`;
		
	}
}
