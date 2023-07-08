/*
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
*/
/*
export default {
	name: 'if',
	kind: 'container',
	description: 'Displays content conditionally.',
	usage: '[if condition]...content...[else]...alternate content...[/if]',
	category: 'Control Flow',
	processor(request) {
		
		let opener_enc = request.textMerger.opener_enc
		let closer_enc = request.textMerger.closer_enc
		
		// Check if all provided boolean values are true
		const allTrue = request.params.every((item) => Boolean(item));

		// Split the content into main content and else content
		const [mainContent, elseContent] = request.content.split(/\[else\]/, 2);
		//const [mainContent, elseContent] = request.content.split(`/${opener_enc}else${closer_enc}/`, 2);
//console.log('HERE::', `/${opener_enc}else${closer_enc}/`)
		// Return the appropriate content
		if (allTrue) {
			return mainContent;
		} else {
			return elseContent || '';
		}
	}
}
*/

export default {
	name: 'if',
	kind: 'container',
	description: 'Displays content conditionally.',
	//usage: '[if condition1 condition2 ...]...content...[else]...alternate content...[/if]',
	//usage: '[if condition1]...content[/if]',
	category: 'Conditional',
	processor(request) {
		
	//	console.log('REQUEST::', request)

		//throw new Error('Sorry. This is malogical.');

		// Get the tag delimiters
		let opener_enc = request.textMerger.opener_enc
		let closer_enc = request.textMerger.closer_enc

		// Check if all provided boolean values are true
		const allTrue = request.params.every((item) => Boolean(item));

		// Prepare elseTag for splitting and counting occurrences
		const elseTag = `${opener_enc}else${closer_enc}`;

		// Count the occurrences of elseTag in the content
		const elseCount = (request.content.match(new RegExp(elseTag, 'g')) || []).length;

		// Check if elseTag appears more than once
		if (elseCount > 1) {
			throw new Error("Invalid usage: ifelse can only have one else clause");
		}

		// Split the content into main content and else content
		let [mainContent, elseContent] = request.content.split(new RegExp(elseTag), 2);

		// Trim white spaces
		mainContent = mainContent.trim();
		elseContent = (elseContent || '').trim();

		// Return the appropriate content based on the condition
		return allTrue ? mainContent : elseContent;
	}
}
