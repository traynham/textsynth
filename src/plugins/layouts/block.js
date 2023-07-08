export default {
	name: 'block',
	kind: 'container',
	description: 'Defines a block that can be filled later',
	category: 'Layout',
	//usage: '[block \'blockName\']...content...[/block]',
	example: '[block \'header\']Welcome to our site![/block]',
	/*
	processor: (request) => {
		
		// PROCESSING IS DONE IN THE LAYOUT PLUGIN.
		return ''
		
		
		// console.log('IN BLOCK')
		// const blockName = request.params[0];
		// if (!(blockName in request.payload)) {
		// 	request.payload[blockName] = request.content;
		// }
	},
	*/
};
