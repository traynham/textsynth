export default {
	name: 'uppercase',
	description: 'Converts a string to uppercase.',
	example: '{{uppercase: property.path}}',
	usage: '{{uppercase: site.title}}',
	category: 'Text',
	content: [
		{
			name: 'content',
			type: 'any',
			required: true,
			description: 'The text to be transformed.'
		}
	],
	type: 'string',
	kind: 'single',
	aliases: ['upper', 'up'],
	processor(req) {
		return req.content.toUpperCase()
	}
}