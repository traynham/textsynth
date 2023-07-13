export default {

	// Basic Information
	name: 'unless',
	author: 'Jesse Traynham',
	category: 'Conditional',
	description: 'Renders the content only if the condition is falsy. Useful for displaying a specific message or content when a certain condition is not met.',
	kind: 'container',
	syntax: '[unless(condition)] Your content here [/unless]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'Content to be displayed when the condition is not met.'
		}
	],
	params: [
		{
			name: 'condition',
			type: 'boolean',
			required: true,
			description: 'Boolean condition for content rendering.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: "{ isAdmin: false }",
			input: "[unless(isAdmin)] You're not an admin. [/unless]",
			output: "You're not an admin.",
			note: 'Content is shown as the condition evaluates to false (user is not an admin).'
		},
		{
			payload: "{ hasPremiumSubscription: false }",
			input: "[unless(hasPremiumSubscription)] Upgrade to Premium for more features. [/unless]",
			output: "Upgrade to Premium for more features.",
			note: 'Content is shown as the condition evaluates to false (user does not have a Premium subscription).'
		},
	],

	// Processor logic
	processor(req) {

		// Check if all provided boolean values are true
		const allTrue = req.params.every((item) => Boolean(item))

		// Return content if all values are false, otherwise return an empty string
		return !allTrue ? req.content : ''

	}

}
