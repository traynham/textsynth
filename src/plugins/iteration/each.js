export default {
	
	// Basic Information
	name: 'each',
	author: 'Jesse Traynham',
	category: 'Iteration',
	description: 'Iterate over an array or an object.',
	kind: 'container',
	syntax: '[each: items]\n\tYour content here\n[/each]',
	version: '1.0.0',
	
	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The template to process for each iteration.'
		}
	],
	params: [
		{
			name: 'items',
			type: ['array', 'object'],
			required: true,
			description: 'The array or object to iterate over.'
		}
	],
	
	// Examples for usage
	examples: [
		{
			payload: {
				"user": {
					"hobbies": ["Reading", "Coding", "Music"]
				}
			},
			input: '[each: user.hobbies]\n\t- [value]\n[/each]',
			output: '\\t- Reading\\n\\t- Coding\\n\\t- Music',
			note: 'Iterates over the array "user.hobbies" and prints each value.'
		},
		{
			payload: {
				"items": {
					"name": "John Doe",
					"age": 30
				}
			},
			input: '[each: items]\n\t[key]: [value]\n[/each]',
			output: '\\tname: John Doe\\n\\tage: 30',
			note: 'Iterates over the object "items" and prints each key-value pair.'
		}
	],

	processor(req) {
		
		let payload = {...req.payload}
		
		const iterable = req.params[0]
		
		let output = ''
		
		if (Array.isArray(iterable)) {
			
			iterable.forEach((item) => {
				
				payload.value = item
				
				output += req.textMerger.process(req.content, payload)
				
			})
			
		} else if (typeof iterable === 'object') {
		
		Object.entries(iterable).forEach(([key, value]) => {
			
			payload.name = key
			payload.key = key
			payload.value = value
			
			output += req.textMerger.process(req.content, payload)
			
		})
		
	}
	
	return output
	
	}
  
}