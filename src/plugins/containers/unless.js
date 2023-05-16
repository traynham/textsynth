export default {
	name: 'unless',
	description: 'Renders content only if the specified payload path evaluates to a falsy value.',
	example: `{{unless: user.isAdmin}}\nYou're not an admin.\n{{/unless}}`,
	usage: `{{unless: condition}}\nYour content here\n{{/unless}}`,
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