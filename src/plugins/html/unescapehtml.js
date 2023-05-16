export default {
	name: 'unescapeHtml',
	description: 'Unescapes HTML entities in a string, converting them back to their original characters.',
	example: '{{unescapeHtml: property.path}}',
	usage: '{{unescapeHtml: property.path}}',
	category: 'HTML',
	processor(req) {
		return req.content.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, tag => ({
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#39;': "'"
		}[tag]));
	}
}