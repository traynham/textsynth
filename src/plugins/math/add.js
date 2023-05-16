export default {
	name: 'add',
	description: 'Adds a specified number to a given number.',
	example: '{{add(5): property.path}}',
	usage: '{{add(5): site.value}}',
	category: 'Math',
	type: ['number'],
	processor(req) {
		let { content, params } = req
		return parseFloat(content) + parseFloat(params[0])
	}
}