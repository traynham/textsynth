export default {
	name: 'join',
	description: 'Joins the elements of an array with a specified separator.',
	example: '{{join(", "): property.path}}',
	usage: '{{join(", "): site.items}}',
	category: 'Array/Text',
	type: ['array'],
	processor(req){
		return req.content.join(req.params[0])
	}
}