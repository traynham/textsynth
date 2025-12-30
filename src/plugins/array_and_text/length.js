export default {
	
	name: 'length',
	
	author: 'Jesse Traynham',
	category: 'Array/Text',
	description: 'Returns the length of a string or the number of elements in an array.',
	kind: 'single',
	version: '1.0.0',
	
	docs: {
		
		content: [
			{
				name: 'content',
				type: ['string', 'array'],
				required: true,
				description: 'Content (string or array) whose length is to be determined.'
			}
		],
		
		/*
		examples: [
			{
				payload: "{ text: 'This is 10' }",
				input: '[length: text]',
				output: '10',
				note: 'The content is a string of length 10.'
			},
			{
				payload: "{ array: ['one', 'two', 'three', 'four', 'five'] }",
				input: '[length: array]',
				output: '5',
				note: 'The content is an array of length 5.'
			},
		],
		*/
		
		syntax: '[length: property.path]',
	},
	
	processor(req) {
		if(!req.content){ return 0 }
		return req.content.length;
	}
}
