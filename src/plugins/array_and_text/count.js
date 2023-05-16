export default {
	name: 'count',
	description: 'Counts the number of elements in an array, characters in a string, or occurrences of a specified value in the input.',
	example: '{{count: property.path}}',
	usage: '{{count: site.categories}}',
	type: ['string', 'array'],
	category: 'Array/Text',
	kind: 'single',
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
			return (content.match(new RegExp(q, 'g')) || []).length
		}
		
		return content.length
		
	}
	
}
