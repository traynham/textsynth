export default {
	
	// Basic Information
	name: 'unescape_html',
	author: 'Jesse Traynham',
	category: 'Encoding',
	description: 'Unescapes HTML entities in a string, converting them back to their original characters.',
	version: '1.0.0',
	
	// Content details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The string with escaped HTML entities.'
		}
	],
	
	// Examples for usage
	examples: [
		{
			payload: `{ text: "The &quot;quick&quot; brown fox jumps over the &lt;lazy&gt; dog."}`,
			input: '[unescape_html: text]',
			output: 'The "quick" brown fox jumps over the <lazy> dog.',
			note: 'Converts escaped HTML entities back to their original characters.'
		},
	],
	
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