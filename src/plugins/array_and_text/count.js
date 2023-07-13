/*
	TODO:
	* Allow regex q on array?
*/

export default {
	name: 'count',
	author: 'Jesse Traynham',
	version: '1.0.0',
	description: 'Counts the number of elements in an array, characters in a string, or occurrences of a specified value in the input.',
	examples: [
		{
			input: "[count 'This is 10']",
			output: '10',
			note: 'Counts the characters in a string.'
		},
		{
			input: "[count found_array]",
			output: '15',
			note: 'Counts the elements in an array, assuming there are 15 array items.'
		},
		{
			input: "[count('t') 'This is a test']",
			output: '2',
			note: 'Counts the occurrences of the letter "t" in the string.'
		},
	],
	syntax: '[count property], [count(query) property]',
	type: ['string', 'array'],
	category: 'Array/Text',
	kind: 'single',
	params: [
		{
			name: 'query',
			type: 'string',
			required: false,
			description: 'The specific value to count in the input. If not provided, all elements or characters are counted.'
		}
	],
	content: [
		{
			name: 'content',
			type: 'any',
			required: true,
			description: 'The input where the count is performed. This can be a string or an array.'
		}
	],
	processor(req) {
		
		let q = req.params[0]
		let content = req.content
		
		if(!Array.isArray(content) && typeof content !== 'string'){
			return req.content
		}
		
		if (q && Array.isArray(content)) {
			return content.filter(el => el === q).length
		}
		
		if (q && typeof content === 'string') {
			return (content.match(new RegExp(q, 'g'))).length
		}
		
		return content.length
		
	}
	
}
