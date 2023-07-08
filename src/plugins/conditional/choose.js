export default {

	name: 'choose',
	
	aliases: 'contingent',

	description: 'Selects one of three possible values based on a boolean condition. If the condition is true, the first value is selected. If false, the second value is selected. If the condition is neither true nor false (i.e., it is null or undefined), the third value is returned.',

	examples: [
		{
			code: "[choose(isAdmin) 'Hello, admin!', 'Hello, user!']",
			result: 'The result depends on the boolean value of isAdmin. If isAdmin is true, the result is "Hello, admin!". Otherwise, the result is "Hello, user!".'
		},
		{
			code: "[choose(hasDiscount) 'You have a discount!', 'No discounts available.', 'Please login to check for discounts.']",
			result: 'The result depends on the boolean value of hasDiscount. If hasDiscount is true, the result is "You have a discount!". If false, the result is "No discounts available.". If hasDiscount is null or undefined, the result is "Please login to check for discounts.".'
		}
	],
	
	kind: 'single',
	
	syntax: '[choose(condition) trueCase, falseCase, defaultCase]',

	params: [
		{
			name: 'condition',
			type: 'boolean',
			description: 'The condition to evaluate.',
			required: true
		}
	],
	
	content: [
		{
			name: 'trueCase',
			type: 'string',
			description: 'The content to output if the condition is true.',
			required: true
		},
		{
			name: 'falseCase',
			type: 'string',
			description: 'The content to output if the condition is false.',
			required: false
		},
		{
			name: 'defaultCase',
			type: 'string',
			description: 'The content to output if the condition is neither true nor false.',
			required: false
		}
	],

	category: 'Conditional',

	processor(req) {
		
		let { content, params } = req
		
		// IF TRUE
		if(params[0] == true){
			//return content[0]
			return content.params[0]
		}
		
		// IF FALSE
		if(params[0] == false){
			//return content[1]
			return content.params[1]
		}
		
		// OTHERWISE
		return content.params[2]
		
	}

}