export default {
	name: 'random',
	description: 'Selects a random element from an array or a random character from a string.',
	example: '{{random: property.path}}',
	usage: '{{random: site.categories}}',
	category: 'Array/Text',
	type: ['string', 'array'],
	processor(req) {
		
		let content = req.content
		
		if(!content.length){ return '' }
		
		const index = Math.floor(Math.random() * content.length)
		return content[index]
		
	}
}