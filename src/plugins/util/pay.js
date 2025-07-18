export default {
	
	// Basic Information
	name: 'pay',
	author: 'Jesse Traynham',
	category: 'Info',
	description: 'Dispaly payload.',
	kind: 'single',
	syntax: '[pay]',
	version: '1.0.0',

	// Content and Params details
	content: [], // No content needed as this works based on the request path


	// Examples for usage
	examples: [
		{
			payload: { _request: { path: '/home/about' } },
			input: '[breadcrumbs]',
			output: '<div style="--bs-breadcrumb-divider: \'›\';" aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="/home">home</a></li><li class="breadcrumb-item">about</li></ol></div>',
			note: 'This example shows how breadcrumb navigation is generated for the path "/home/about".'
		}
	],


	
	processor(req) {
		
		let md = (content) => req.engine.runPlugin('md', {content})
		let md_code = (content) => req.engine.runPlugin('md', {content: '\n```json\n' + content + '\n```\n'})
		
		if(req.cargo.flags.includes('keys')){
			let content =  '## Payload Keys\n' + Object.keys(req.payload).map(key => `* ${key}`).join('\n')
			return md(content)
		}
		
		if(req.contents.length > 0){
			let out =  req.contents.map(content => '\n```json\n' + JSON.stringify(content, null, 2) + '\n```\n' )
			return md(out.join(''))
		}
		
		/*
			# TODO:
			* Should session be there?
			* Session is in both the root and in locals.
			* Should there be an option for --showAll
			* Use encode delimiter for replacing delims.
		*/
		let exclusions = [
			'textSynth',
			'_layoutStack',
			'settings',
			'_locals',
			'_synth'
		]
		
		let pay = Object.keys(req.payload).reduce((acc, key) => {
			if (!exclusions.includes(key)) { acc[key] = req.payload[key] }
			return acc;
		}, {})
		
		return md_code( JSON.stringify(pay, null, 2).replaceAll('[', '\\[').replaceAll(']', '\\]') )
		
	}

}