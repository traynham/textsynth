export default {
	name: 'camelcase',
	description: 'Converts a string to camelCase.',
	example: '{{camelCase: property.path}}',
	category: 'Text',
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, '');
	}
}