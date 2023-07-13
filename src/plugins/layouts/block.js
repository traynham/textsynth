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
	]

	// PROCESSING LOGIC IS COVERED IN THE LAYOUT PLUGIN.

	// The basic block tag does not need to do any processing on its own,
	// it's more about how it's used in a layout plugin.

}