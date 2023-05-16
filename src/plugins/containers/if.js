export default {
  name: 'if',
  description:
	'Conditionally render content if all provided boolean values are true.',
  example: '{{if: user.isAdmin, user.isMod}}\n\tWelcome, Mr Admin Mod!\n{{/if}}',
  usage:
	'{{if: booleanValue1, booleanValue2, ...}}\n\tYour content here\n{{/if}}',
  category: 'Conditional',
  kind: 'container',
  parameters: [
	{
		name: 'booleanValue',
		description: 
			'A boolean value or an expression that evaluates to a boolean value. Multiple boolean values can be provided, separated by commas.',
		required: true
	}
  ],
  processor(req) {

	// Check if all provided boolean values are true
	const allTrue = req.params.every((item) => Boolean(item))

	// Return content if all values are true, otherwise return an empty string
	if (allTrue) {
		return req.content
	}

	return ''
	
  }

}