export default {
	name: 'block_append',
	kind: 'container',
	description: 'Appends to the content of a block',
	category: 'Layout',
	//usage: '[block_append \'blockName\']...content...[/block_append]',
	//example: '[block_append \'header\']Welcome to our site![/block_append]',
	/*
	processor: (request) => {
		
		// PROCESSING IS DONE IN THE LAYOUT PLUGIN.
		return ''
		
		// console.log('IN BLOCK APPEND')
		// const blockName = request.params[0];
		// if (!(blockName in request.payload)) {
		// 	request.payload[blockName] = '';
		// }
		// request.payload[blockName] += request.content;
		// return '';
	},
	*/
};
