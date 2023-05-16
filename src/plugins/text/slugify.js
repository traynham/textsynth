export default {
	name: 'slugify',
	description: 'Converts a string into a URL-friendly slug.',
	example: '{{slugify: property.path}}',
	usage: '{{slugify: property.path}}',
	category: 'Text',
	processor({content}) {
		if(typeof content !== 'string') return content
		return content
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}
}