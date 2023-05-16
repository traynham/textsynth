export default {
	name: 'trim',
	description: 'Trims whitespace from the beginning and end of a string.',
	example: '{{trim: property.path}}',
	usage: '{{trim: site.title}}',
	category: 'Text',
	processor({content}) {
		return content.trim()
	}
}