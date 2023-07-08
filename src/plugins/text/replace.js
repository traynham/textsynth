export default {
	name: 'replace',
	description: 'Replaces all occurrences of a search string with a replacement string.',
	example: '{{replace(" ", "-"): property.path}}',
	usage: '{{replace(" ", "-"): site.title}}',
	category: 'Text',
	processor(req) {
		const [ search, replacement ] = req.params
		const replacer = new RegExp(search, 'g')
		return req.content.replace(replacer, replacement)
	}
}