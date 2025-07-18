export default {

	// Basic Information
	name: 'random',
	author: 'Your Name', // Replace with your name
	category: 'Array/Text',
	description: 'Selects a random element from an array or a random character from a string.',
	version: '1.0.0',
	syntax: '[random: property.path]',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'any',
			required: true,
			description: 'The input value, which should be an array or a string.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: "{ fruits: ['Apple', 'Banana', 'Dragon'] }",
			input: '[random: fruits]',
			output: 'Dragon', // Output can be any of the array elements
			note: 'Output can be any of the array elements, as it is selected randomly.'
		},
		{
			input: "[random: 'What letter will it pick?']",
			output: 't', // Output can be any of the string characters
			note: 'Output can be any of the string characters, as it is selected randomly.'
		},
	],

	// Processor logic
	processor(req) {
		
		let content = req.content
		
		if(!req.content){ return '' }
		
		const index = Math.floor(Math.random() * content.length)
		return content[index]
		
	}
}