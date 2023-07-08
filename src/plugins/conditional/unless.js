export default {

	name: 'unless',

	description: 'Renders the content only if the condition is falsy. Useful for displaying a specific message or content when a certain condition is not met.',

	examples: [
		{
			code: "[unless(isAdmin)]You're not an admin.[/unless]",
			result: "You're not an admin."
		},
		{
			code: "[unless(hasPremiumSubscription)]Upgrade to Premium for more features.[/unless]",
			result: "Upgrade to Premium for more features."
		}
	],
	
	syntax: "[unless(condition)]\nYour content here\n[/unless]",

	category: 'Conditional',
	
	kind: 'container',
	
	processor(req) {
		
		// Check if all provided boolean values are true
		const allTrue = req.params.every((item) => Boolean(item))
		
		// Return content if all values are false, otherwise return an empty string
		if (!allTrue) {
			return req.content
		}
		
		return ''
		
	}

}