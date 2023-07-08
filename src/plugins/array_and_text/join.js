export default {
	name: 'join',
	description: 'Joins the elements of an array with a specified separator.',
	_example: '[join(", "): property.path]',
	usage: '[join(delimiter) site.items]',
	
	examples: [
		{
			code: "[join('-') site.items]",
			result: '1-2-3 //Given that site.items is an array like [1,2,3]'
		},
		{
			code: "[join(', ') fruit]",
			result: `Apple, Orange, Grape //Given that site.items is an array like ['Apple', 'Organge', 'Grape']`
		},
		{
			code: "[join(', ') fruit]",
			result: `AppleOrangeGrape //Given that site.items is an array like ['Apple', 'Organge', 'Grape']`
		}
	],
	
	settings: {
		delimiter: ', ' // Default delimiter to use to join.
	},
	
	params: [
		{
			name: 'delimiter',
			type: 'string',
			required: false,
			description: 'String to join items with.'
		}
	],
	
	category: 'Array/Text',
	kind: 'single',
	type: ['array'],
	processor(req){
		
		if (typeof req.content === 'string') {
			return req.content
		}
		
		let delimiter = req.params[0] || this.settings.delimiter
		
		return req.content?.join(delimiter)
		
	}
}