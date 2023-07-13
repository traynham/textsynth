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
	]
	
	// PROCESSING LOGIC IS COVERED IN THE LAYOUT PLUGIN.

	// The block_append tag does not need to do any processing on its own,
	// it's more about how it's used in a layout plugin.
	// The actual appending operation is handled by the layout plugin.

}