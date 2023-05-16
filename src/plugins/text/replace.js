export default {
	name: 'replace',
	description: 'Replaces all occurrences of a search string with a replacement string.',
	example: '{{replace(" ", "-"): property.path}}',
	usage: '{{replace(" ", "-"): site.title}}',
	category: 'Text',
	processor(req) {
		let [ search, replacement ] = req.params
		return req.content.replaceAll(search, replacement);
	}
}