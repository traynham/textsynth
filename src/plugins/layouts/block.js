export default {
	
	// Basic Information
	name: 'block',
	author: 'Jesse Traynham',
	category: 'Layout',
	description: 'Defines a block that can be filled later.',
	kind: 'container',
	syntax: "[block 'blockName']...content...[/block]",
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: false,
			description: 'The default content for the block.'
		}
	],
	params: [
		{
			name: 'blockName',
			type: 'string',
			required: true,
			description: 'The name of the block.'
		}
	],

	// Examples for usage
	examples: [
		{
			input: "[block 'header']Default Header Content[/block]",
			output: 'The output depends on how the block is later used in the layout.',
			note: 'This block named "header" can be filled later in a layout.'
		}
	],
	
	processor(req) {
		
		let { payload } = req
		let name = req.params[0].value
		
		if(!payload._layoutStack){
			payload._layoutStack = [{}]
		}
		
		let stack = payload._layoutStack[0]
		
		if(!stack[name]){
			stack[name] = req.content
		}
		
		let content = stack[req.params[0].value]
		
		if(req.cargo.flags.includes('markdown')){
			return req.textMerger.runPlugin('md', {content: content})	
		}
		
		return content
		
	}

}