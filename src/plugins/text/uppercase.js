export default {
	name: 'uppercase',
	description: 'Converts a string to uppercase.',
	example: '{{uppercase: property.path}}',
	usage: '{{uppercase: site.title}}',
	category: 'Text',
	type: 'string',
	kind: 'single',
	processor(req) {
		return req.content.toUpperCase()
	}
}