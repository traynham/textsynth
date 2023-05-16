export default {
	name: 'capitalize',
	description: 'Capitalizes the first letter of a string.',
	example: '{{capitalize: property.path}}',
	category: 'Text',
	processor({content}) {
		return content.charAt(0).toUpperCase() + content.slice(1);
	}
}