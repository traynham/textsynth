export default {
	name: 'unescapeHtml',
	description: 'Unescapes HTML entities in a string, converting them back to their original characters.',
	example: '{{unescapeHtml: property.path}}',
	usage: '{{unescapeHtml: property.path}}',
	category: 'HTML',
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
		
		let escapeCodes_flipped = Object.entries(escapeCodes).reduce((acc, [key, value]) => {
			acc[value] = key
			return acc
		}, {})
		
		const pattern = Object.values(escapeCodes).join('|')
		const regex = new RegExp(pattern, 'g')
		
		return req.content.replace(regex, tag => escapeCodes_flipped[tag])
		
	}
	
}