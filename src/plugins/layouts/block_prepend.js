export default {
	
	// Basic Information
	name: 'block_prepend',
	author: 'Jesse Traynham',
	category: 'Layout',
	description: 'Prepends to the content of a block.',
	kind: 'container',
	syntax: "[block_prepend 'blockName']...content...[/block_prepend]",
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The content to prepend to the block.'
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
			input: "[block_prepend 'header']Prepend Header Content[/block_prepend]",
			output: 'The output depends on the initial content of the block in the layout.',
			note: 'This example prepends additional content to a block named "header".'
		}
	],
	
	processor({ content, params, payload, textMerger}) {
		
		// EXTRACT THE BLOCK NAME FROM THE PARAMETERS PASSED IN
		const blockName = params[0]
		
		// ACCESS THE MOST RECENT LAYOUT FROM THE STACK IN TEXTMERGER
		let currentLayout = textMerger.layoutStack[textMerger.layoutStack.length - 1]
		
		// PREPEND PROCESSED CONTENT TO THE CURRENT BLOCK. IF THE BLOCK DOES NOT EXIST, 
		// IT CREATES A NEW BLOCK WITH THE PROCESSED CONTENT.
		currentLayout[blockName] = textMerger.process(content, payload) + currentLayout[blockName]
		
		// AS THIS IS A BLOCK_PREPEND PROCESSOR, IT DOESN'T NEED TO RETURN ANY CONTENT 
		// FOR THE CURRENT PROCESSING STAGE, SO IT RETURNS AN EMPTY STRING.
		return ''
	}
	
}