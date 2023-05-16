export default {
	name: 'padStart',
	description: 'Pads a string on the left with a specified character up to a specified length.',
	example: '{{padStart(5, "0"): property.path}}',
	usage: '{{padStart(targetLength, padString): property.path}}',
	category: 'Text',
	processor(value, targetLength = 3, padString = ' ') {
		return value.padStart(targetLength, padString);
	}
}