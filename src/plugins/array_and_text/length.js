const plugin = {
	name: 'length',
	description: 'Returns the length of a string or the number of elements in an array.',
	_example: '{{length: property.path}}',
	examples: [
		{
			code: "[length 'This is 10']",
			result: '10'
		},
		{
			code: "[length found_array]",
			result: '15 (Assuming there are 15 array items)'
		}
	],
	usage: '[length items]',
	category: 'Array/Text',
	type: ['string', 'array'],
	processor(req) {
		return req.content.length;
	}
}

export default plugin
