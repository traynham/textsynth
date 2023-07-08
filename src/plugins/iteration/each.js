export default {
	name: 'each',
	description: 'Iterate over an array or an object.',
	example: `
		[each: user.hobbies]
			- [value]
		[/each]
	`,
	usage: '[each: items]\n\tYour content here\n[/each]',
	category: 'Iteration',
	kind: 'container',
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