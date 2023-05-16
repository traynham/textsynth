export default {
	name: 'repeat',
	description: 'Repeats a string a specified number of times.',
	example: '{{repeat(3): property.path}}',
	usage: '{{repeat(3): site.title}}',
	category: 'Text',
	kind: 'single',
	processor(req) {
		return req.content.repeat(parseInt(req.params[0]))
	}
}