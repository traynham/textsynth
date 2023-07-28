export default {
	
	// Basic Information
	name: 'block_set',
	author: 'Jesse Traynham',
	category: 'Layout',
	description: 'Sets (replaces) the content of a block.',
	kind: 'container',
	syntax: "[block_set 'blockName']...content...[/block_set]",
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The content to set for the block.'
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
			input: "[block_set 'header']Welcome to our site![/block_set]",
			output: 'The output depends on the initial content of the block in the layout.',
			note: 'This example sets the content of a block named "header".'
		}
	],
	
	processor({ content, params, payload, textMerger}) {
		
		// EXTRACT THE BLOCK NAME FROM THE PARAMETERS PASSED IN
		const blockName = params[0]
		
		// ACCESS THE MOST RECENT LAYOUT FROM THE STACK IN TEXTMERGER
		let currentLayout = textMerger.layoutStack[textMerger.layoutStack.length - 1]
		
		// ASSIGN THE PROCESSED CONTENT TO THE BLOCK WITH THE SPECIFIED NAME IN THE CURRENT LAYOUT.
		// IF THE BLOCK DOES NOT EXIST, IT WILL CREATE A NEW ONE WITH THE PROCESSED CONTENT.
		currentLayout[blockName] = textMerger.process(content, payload)
		
		// AS THIS IS A BLOCK_SET PROCESSOR, IT DOESN'T NEED TO RETURN ANY CONTENT 
		// FOR THE CURRENT PROCESSING STAGE, SO IT RETURNS AN EMPTY STRING.
		return ''
	}

}