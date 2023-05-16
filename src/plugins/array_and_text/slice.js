export default {
	name: 'slice',
	description: 'Extracts a section of a string or array from the specified start and end indices.',
	example: '{{slice(0, 5): property.path}}',
	usage: '{{slice(0, 5): site.title}}',
	category: 'Array/Text',
	processor(req) {
		let [ start, end ] = req.params
		return req.content.slice(parseInt(start), parseInt(end));
	}
}