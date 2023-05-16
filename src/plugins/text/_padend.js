export default {
	name: 'padEnd',
	description: 'Pads a string on the right with a specified character up to a specified length.',
	example: '{{padEnd(5, "0"): property.path}}',
	usage: '{{padEnd(targetLength, padString): property.path}}',
	category: 'Text',
	_processor(value, targetLength = 3, padString = ' ') {
		return value.padEnd(targetLength, padString);
	},
	
	processor({content, params}) {
		console.log('CONTENT::', typeof content)
		console.log('PARAMS::', params)
		let [ targetLength = 3, padString = ' ' ] = params
		console.log('targetLength', targetLength)
		console.log('padString', padString)
		return content.padEnd(targetLength, padString);
	}
	
	
}
