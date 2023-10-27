export default {
	
	// Basic Information
	name: 'block_append',
	author: 'Jesse Traynham',
	category: 'Layout',
	description: 'Appends to the content of a block.',
	kind: 'container',
	syntax: "[block_append 'blockName']...content...[/block_append]",
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The content to append to the block.'
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
			input: "[block_append 'header']Additional Header Content[/block_append]",
			output: 'The output depends on the initial content of the block in the layout.',
			note: 'This example appends additional content to a block named "header".'
		}
	],

	processor({ content, params, payload, engine}) {
		
		if(!payload._layoutStack){
			return ''
		}
		
		// GET THE BLOCK NAME FROM THE PARAMS
		const blockName = params[0].value
		
		// ACCESS THE CURRENT LAYOUT BY GETTING THE TOP ITEM FROM THE LAYOUT STACK
		let currentLayout = payload._layoutStack[payload._layoutStack.length - 1]

		// APPEND PROCESSED CONTENT TO THE CURRENT BLOCK. IF THE BLOCK DOES NOT EXIST,
		// IT CREATES A NEW BLOCK WITH THE PROCESSED CONTENT.
		currentLayout[blockName] = currentLayout[blockName] + engine.process(content, payload)
		
		// SINCE THIS IS A BLOCK_APPEND PROCESSOR, IT DOESN'T NEED TO RETURN ANY CONTENT 
		// FOR THE CURRENT PROCESSING STAGE, HENCE IT RETURNS AN EMPTY STRING.
		return ''
	}

}