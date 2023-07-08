export default {
	name: 'block_set',
	kind: 'container',
	description: 'Sets the content of a block',
	category: 'Layout',
	usage: "[block_set 'blockName']...content...[/block_set]",
	example: "[block_set 'header']Welcome to our site![/block_set]",
	examples: [
		{
			code: "[block_set 'header']Welcome to our site![/block_set]",
			result: "Welcome to our site!"
		}
	],
	/*
	processor: (req) => {
		
		// PROCESSING IS DONE IN THE LAYOUT PLUGIN.
		return ''
		
		// console.log('IN BLOCK SET')
		// // console.log(
		// // 	'Hello and Merry Christmas::',
		// // 	req
		// // )
		// 
		// const blockName = req.params[0];
		// 
		// req.payload[blockName] = req.content;
		// 
		// return '';
		
	},
	*/
};
