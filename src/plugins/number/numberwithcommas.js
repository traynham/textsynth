export default {
	name: 'numberWithCommas',
	description: 'Formats a number with commas as thousand separators.',
	example: '{{numberWithCommas: property.path}}',
	usage: '{{numberWithCommas: property.path}}',
	category: 'Number',
	type: ['number'],
	processor(req) {
		return req.content.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
}