export default {
	name: 'escapeHtml',
	description: 'Escapes HTML entities in a string to prevent code injection.',
	example: '{{escapeHtml: property.path}}',
	usage: '{{escapeHtml: property.path}}',
	category: 'Encoding',
	processor(req) {
		
		let escapeCodes = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&apos;',
			'[': '&lbrack;',
			']': '&rbrack;'
		}
		
		return req.content.replace(/[&<>"'[\]]/g, tag => escapeCodes[tag])
		
	}
}
