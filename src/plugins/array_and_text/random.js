export default {
	name: 'random',
	description: 'Selects a random element from an array or a random character from a string.',
	_example: '{{random: property.path}}',
	
	examples: [
		{
			code: "[random fruits]",
			result: 'Dragon // Assuming fruits is an array and also happens to include "dragon"'
		},
		{
			code: "[random 'What letter will it pick?']",
			result: 't'
		},
	],
	
	usage: '[random site.categories]',
	category: 'Array/Text',
	type: ['string', 'array'],
	processor(req) {
		
		let content = req.content
		
		if(!content.length){ return '' }
		
		const index = Math.floor(Math.random() * content.length)
		return content[index]
		
	}
}