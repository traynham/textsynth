export default {
	name: 'substring',
	description: 'Returns a substring from the specified start and end indices.',
	example: '{{substring(0, 5): property.path}}',
	usage: '{{substring(0, 5): site.title}}',
	category: 'Text',	
	processor({content, params}) {
		
		let [start = 0, end = 0] = params
		
		if(typeof content !== 'string') return content
		if(start + end === 0) return content
		
		return content.substring(parseInt(start), parseInt(end))
		
	}
}