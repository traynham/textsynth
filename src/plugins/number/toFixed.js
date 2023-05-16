export default {
	name: 'toFixed',
	description: 'Formats a number using fixed-point notation with a specified number of decimal places.',
	example: '{{toFixed(decimalPlaces): property.path}}',
	category: 'Number',
	type: ['number'],
	processor(req) {
		let { content, params } = req
		return parseFloat(content).toFixed(parseInt(params[0]))
	}
}