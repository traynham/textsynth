const plugin = {
	name: 'length',
	description: 'Returns the length of a string or the number of elements in an array.',
	example: '{{length: property.path}}',
	usage: '{{length: site.name}}',
	category: 'Array/Text',
	type: ['string', 'array'],
	processor(req) {
		return req.content.length;
	}
}

export default plugin
