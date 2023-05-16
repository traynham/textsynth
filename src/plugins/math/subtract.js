export default {
	name: 'subtract',
	description: 'Subtracts a specified number from a given number.',
	example: '{{subtract(5): property.path}}',
	usage: '{{subtract(5): site.value}}',
	category: 'Math',
	type: ['number'],
	processor(req) {
		let { content, params } = req
		return parseFloat(content) - parseFloat(params[0])
	}
}