/*
	TODO:
	* Allow regex q on array?
*/

export default {
	name: 'count',
	description: 'Counts the number of elements in an array, characters in a string, or occurrences of a specified value in the input.',
	_example: '[count: property.path]',
	examples: [
		{
			code: "[count 'This is 10']",
			result: '10'
		},
		{
			code: "[count found_array]",
			result: '15 (Assuming there are 15 array items)'
		},
		{
			code: "[count('t') 'This is a test']",
			result: '2'
		},
	],
	usage: '[count property], [count(query) property]',
	type: ['string', 'array'],
	category: 'Array/Text',
	kind: 'single',
	params: [
		{
			name: 'query',
			type: 'string',
			required: false,
			description: 'String to filter with.'
		}
	],
	content: [
		{
			name: 'content',
			type: 'any',
			required: true,
			description: 'The item be counted.'
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
