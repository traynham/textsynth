export default {

	name: 'join',
	
	author: 'Jesse Traynham',
	category: 'Array/Text',
	description: 'Joins the elements of an array with a specified separator. If no separator is specified, the elements are joined with a comma followed by a space.',
	kind: 'single',
	version: '1.0.0',
	docs: {
		content: [
			{
				name: 'content',
				type: 'array',
				required: true,
				description: 'The array to be joined.'
			}
		],
		params: [
			{
				name: 'delimiter',
				type: 'string',
				required: false,
				description: 'The string used to separate the elements in the array. If not provided, a comma and a space are used as the default.'
			}
		],
		
		examples: [
/*	
			{
				input: "[join('-') myNumbers]",
				output: '1-2-3',
				note: `Joins an array of numbers with a hyphen, assuming payload is \\{myNumbers: [1, 2, 3]}`
			},
			{
				input: "[join(', ') myFruit]",
				output: 'Apple, Orange, Grape',
				note: `Joins an array of fruits with a comma and a space, assuming payload is {myFruit: ['Apple', 'Orange', 'Grape']}`
			},
			{
				input: "[join('') myFruit]",
				output: 'AppleOrangeGrape',
				note: "Joins an array of fruits with no separator, assuming payload is {myFruit: ['Apple', 'Orange', 'Grape']}"
			}
*/
		],
		
		syntax: '[join(delimiter) array]',
		type: ['array'],
		
	},
	settings: {
		delimiter: ', ' // Default delimiter to use to join.
	},
	
	processor(req){
		
		if (typeof req.content === 'string') {
			return req.content
		}
		
		let delimiter = req.params[0] || this.settings.delimiter
		
		return req.content?.join(delimiter)
		
	}
}