export default {
	name: 'stripHtml',
	description: 'Removes HTML tags from a string, leaving only plain text.',
	example: '{{stripHtml: property.path}}',
	usage: '{{stripHtml: property.path}}',
	category: 'HTML',
	processor(req) {
		return req.content.replace(/<\/?[^>]+(>|$)/g, '');
	}
}