export default {
	name: 'encodeURIComponent',
	description: 'Applies the JavaScript encodeURIComponent() function to a string value.',
	example: '{{encodeURIComponent: property.path}}',
	category: 'URL',
	processor({content}) {
		return encodeURIComponent(content);
	}
}