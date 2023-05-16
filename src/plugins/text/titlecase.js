export default {
	name: 'titlecase',
	description: 'Converts a string to title case, capitalizing the first letter of each word.',
	example: '{{titleCase: property.path}}',
	usage: '{{titleCase: property.path}}',
	category: 'Text',
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
	}
}