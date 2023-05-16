export default {
	name: 'snakecase',
	description: 'Converts a string to snake_case.',
	example: '{{snakecase: property.path}}',
	category: 'Text',
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase();
	}
}