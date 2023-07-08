export default {
	name: 'div',
	description: 'Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.',
	examples: [
		'[div: class="myClass" id="myId" data-custom="customValue"]This is the div content[/div]',
		'[div: .myClass #myId]This is the div content[/div]'
	],
	syntax: '[div: attribute="value" .class #id]content[/div]',
	category: 'HTML',
	kind: 'container',
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
		].join(' ');
		
		let out = `<div${attributeString}>${req.content}</div>`
		
		return out
		
	}
}