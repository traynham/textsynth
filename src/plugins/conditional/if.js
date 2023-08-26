export default {
	
	// Basic Information
	name: 'if',
	author: 'Jesse Traynham',
	category: 'Conditional',
	description: 'Displays content conditionally based on provided parameters.',
	kind: 'container',
	syntax: '[if: params] content... [/if]',
	version: '1.0.0',

	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'Content to be displayed based on the condition.'
		}
	],
	params: [
		{
			name: 'params',
			type: 'boolean',
			required: true,
			description: 'Boolean values for conditional check.'
		}
	],

	// Examples for usage
	examples: [
		{
			payload: "{ isAdmin: true }",
			input: '[if: isAdmin] Welcome admin. [/if]',
			output: 'Welcome admin.',
			note: 'The content is shown as the condition evaluates to true.'
		},
		{
			payload: "{ isAdmin: false }",
			input: '[if isAdmin] Welcome admin. [/if]',
			output: '',
			note: 'No content is shown as the condition evaluates to false.'
		},
		{
			payload: "{ isAdmin: false }",
			input: '[if isAdmin] Welcome admin. [else] Welcome user. [/if]',
			output: 'Welcome user.',
			note: 'The else content is shown as the condition evaluates to false.'
		},
	],

	// Processor logic
	processor(request) {
		
		const { start, end } = request.textMerger.delimiters.esc
		
		// Check if all provided boolean values are true
		let conditionIsTrue = request.params.every( item => Boolean(item) )
		
		if(request.cargo.condition !== null){
			conditionIsTrue = request.cargo.condition
		}
		
		// Prepare elseTag for splitting and counting occurrences
		const elseTag = `${start}else${end}`
		
		// Count the occurrences of elseTag in the content
		const elseCount = (request.content.match(new RegExp(elseTag, 'g')) || []).length
		
		// Check if elseTag appears more than once
		if (elseCount > 1) {
			throw new Error("Invalid usage: ifelse can only have one else clause")
		}
		
		// Split the content into main content and else content
		let [mainContent, elseContent] = request.content.split(new RegExp(elseTag), 2)
		
		// Trim white spaces
		mainContent = mainContent.trim()
		elseContent = (elseContent || '').trim()
		
		// Return the appropriate content based on the condition
		return conditionIsTrue ? mainContent : elseContent
	}
	
}