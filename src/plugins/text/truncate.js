export default {
	name: 'truncate',
	description: 'Truncates a string to a specified length, optionally appending a custom suffix.',
	example: '{{truncate(10, "..."): property.path}}',
	usage: '{{truncate(maxLength, suffix): property.path}}',
	category: 'Text',
	processor({content, params}) {
		let [ maxLength = 80, suffix = '...' ] = params
		return content.length <= maxLength ? content : content.slice(0, maxLength) + suffix;
	}
}