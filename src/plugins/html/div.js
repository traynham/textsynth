export default {
	
	// Basic Information
	name: 'div',
	author: 'Jesse Traynham',
	category: 'HTML',
	description: 'Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.',
	kind: 'container',
	syntax: '[div: attribute="value" .class #id]content[/div]',
	version: '1.0.0',
	
	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The inner HTML content for the div element.'
		}
	],
	params: [
		{
			name: 'params',
			type: 'string',
			required: false,
			description: 'Optional HTML attributes for the div element.'
		}
	],
	
	// Examples for usage
	examples: [
		{
			payload: "{ }",
			input: '[div: width="500" #myId data-custom="customValue"]This is the div content[/div]',
			output: '<div width="500" id="myId" data-custom="customValue">This is the div content</div>',
			note: 'Generates a div tag with the provided attributes and content.'
		},
		{
			payload: "{ }",
			input: '[div: .myClass #myId]This is the div content[/div]',
			output: '<div class="myClass" id="myId">This is the div content</div>',
			note: 'Generates a div tag with the provided classes, id, and content.'
		},
	],
	
	processor(req) {
	
		let attr = {...req.cargo.attributes}
		
		// CLASSES
		if(req.cargo.classes){ attr.class = req.cargo.classes.join(' ') }
		
		// ID
		if(req.cargo.id){ attr.id = req.cargo.id }
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...req.cargo.values
		].join(' ')
		
		let out = `<div${attributeString}>${req.content}</div>`
		
		return out
		
	}
}