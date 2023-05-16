export default {
	name: 'escapeHtml',
	description: 'Escapes HTML entities in a string to prevent code injection.',
	example: '{{escapeHtml: property.path}}',
	usage: '{{escapeHtml: property.path}}',
	category: 'HTML',
	processor(req) {
		return req.content.replace(/[&<>"']/g, tag => ({
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;'
		}[tag]));
	}
}