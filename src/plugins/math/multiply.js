export default {
	name: 'multiply',
	description: 'Multiplies a given number by a specified number.',
	example: '{{multiply(5): property.path}}',
	usage: '{{multiply(5): site.value}}',
	category: 'Math',
	type: ['number'],
	processor(req) {
		let { content, params } = req
		return parseFloat(content) * parseFloat(params[0])
	}
}