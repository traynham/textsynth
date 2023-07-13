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

	// PROCESSING LOGIC IS COVERED IN THE LAYOUT PLUGIN.
	
	// The block_prepend tag does not need to do any processing on its own,
	// it's more about how it's used in a layout plugin.
	// The actual prepending operation is handled by the layout plugin.
	
}
