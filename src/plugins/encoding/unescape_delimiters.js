export default {
	name: 'unescape_delimiters',
	description: 'Unescapes TextSynth tag delimiters.',
	usage: '[unescape_delimiters: property.path]',
	examples: [
		{
			code: `[unescape_delimiters "[uppercase 'boom']"]`,
			result: 'Magic'
		},
	],
	category: 'Encoding',
	processor(req) {
		
		let { raw, esc } = req.textMerger.delimiters
		
		return req.content
			.split(esc.start).join(raw.start)
			.split(esc.end).join(raw.end)
		
	}
}