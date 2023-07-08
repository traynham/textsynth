export default {

	name: 'ifHasKey',

	description: 'Renders the content only if the specified key exists in the payload. Useful for conditional rendering of content based on the existence of a certain key.',

	examples: [
		{
			code: "[ifHasKey: user.isAdmin]You're an admin.[/ifHasKey]",
			result: "You're an admin."
		},
		{
			code: "[ifHasKey: user.hasPremiumSubscription]You have a Premium subscription.[/ifHasKey]",
			result: "You have a Premium subscription."
		}
	],
	
	syntax: "[ifHasKey: keyPath]\nYour content here\n[/ifHasKey]",

	category: 'Conditional',
	
	kind: 'container',
	
	processor(req) {
		
		let key = req.cargo.values[0]
		
		const value = key.split(/[.[\]]+/).reduce((o, i) => (i && o ? o[i] : undefined), req.payload)
		
		if(value){
			return req.content
		}
		
		return ''
		
	}

}