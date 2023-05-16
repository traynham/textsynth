export default {
	name: 'reverse',
	description: 'Reverses a string or the order of elements in an array.',
	example: '{{reverse: property.path}}',
	usage: '{{reverse: site.title}}',
	category: 'Text',
	type: ['array', 'string'],
	processor(req) {
		let {content} = req
		return Array.isArray(content) ? content.reverse() : content.split('').reverse().join('')	
	}
}