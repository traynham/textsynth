export default {
	
	// Basic Information
	name: 'slugify',
	author: 'Jesse Traynham',
	category: 'Text',
	description: 'Converts a string into a URL-friendly slug.',
	kind: 'single',
	syntax: '[slugify: property.path]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'property.path',
			type: 'string',
			required: true,
			description: 'The path of the property to be slugified.'
		}
	],

	// Examples for usage
	examples: [
		{
			input: "[slugify: 'Hello World!']",
			output: "hello-world",
			note: 'This example slugifies the string "Hello World!".'
		},
		{
			payload: { site: { title: 'My Cool Site' } },
			input: "[slugify: site.title]",
			output: "my-cool-site",
			note: 'This example slugifies the site title.'
		}
	],

	processor({content}) {
		if(typeof content !== 'string') return content
		return content
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

}