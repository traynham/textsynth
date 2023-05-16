export default {
	name: 'stringify',
	description: 'Converts a JavaScript value to a JSON string.',
	example: '{{stringify: property}}',
	usage: '{{stringify: site}}',
	category: 'Util',
	type: 'string',
	kind: 'single',
	processor(req) {
		return JSON.stringify(req.content)
	}
}