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
	]
	
	// PROCESSING LOGIC IS COVERED IN THE LAYOUT PLUGIN.

	// The block_set tag doesn't need to do any processing on its own,
	// it's about how it's used in a layout plugin.
	// The actual setting operation is handled by the layout plugin.

}
