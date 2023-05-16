export default {
	name: 'decodeURIComponent',
	description: 'Applies the JavaScript decodeURIComponent() function to a string value.',
	example: '{{decodeURIComponent: property.path}}',
	category: 'URL',
	processor({content}) {
		return decodeURIComponent(content);
	}
}