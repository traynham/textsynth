export default {
	name: 'escape_delimiters',
	description: 'Escapes TextSynth tag delimiters.',
	usage: '[escape_delimiters: property.path]',
	examples: [
		{
			code: `[escape_delimiters "[uppercase 'boom']"]`,
			result: "&lbrack;uppercase 'boom'&rbrack;"
		},
	],
	category: 'Encoding',
	processor(req) {
		
		let { raw, esc } = req.textMerger.delimiters
		
		return req.content
			.split(raw.start).join(esc.start)
			.split(raw.end).join(esc.end)
		
	}
}