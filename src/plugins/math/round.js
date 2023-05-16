export default {
	name: 'round',
	description: 'Rounds a number to the specified number of decimal places.',
	example: '{{round(2): property.path}}',
	usage: '{{round(2): site.value}}',
	category: 'Math',
	type: ['number'],
	processor(req) {
		const factor = Math.pow(10, parseInt(req.params[0]));
		return Math.round(req.content * factor) / factor;
	}
}