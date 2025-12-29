export default {
	
	// Basic Information
	name: 'man',
	author: 'Jesse Traynham',
	category: 'Info',
	description: 'Display a manual.',
	kind: 'single',
	syntax: '[man: "plugin"]',
	version: '1.0.0',

	docs: {
		flags: {
			'html': 'Return out put in html',
			'text': 'Return out put in text',
			'markdown': 'Return out put in markdown'
		}
	},

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
		
		let plugin = req.engine.plugins[req.content]
		
		if(!plugin){
			console.log(`${req.content} not found`)
			return `${req.content} not found`
		}
		
		if(!plugin.docs){
			console.log(`${req.content} docs not found`)
			return `${req.content} docs not found`
		}
		
		let { flags } = req.cargo
		
		// TEXT
		if(flags.includes('text')){
			return this.onText(plugin, req)
			//return console.log('do text format')
		}
		
		// MARKDOWN
		if(flags.includes('markdown')){
			return this.onMarkdown(plugin, req)
			//return console.log('do markdown format')
		}
		
		// HTML
			//console.log('do html format')
		
		return this.onHTML(plugin, req)
		
		//let theThing = req.engine.plugins[req.content]
		

		
		//return req.content + ' content to come.'
		

	},
	
	onText(plugin) {
		console.log(`...doing man text for ${plugin.name}`)
	},
	
	onMarkdown(plugin) {
		console.log(`...doing man markdown for ${plugin.name}`)
	},
	
	onHTML(plugin, req) {
		
		console.log(`...doing man html for ${plugin.name}`)
		
		let template = `
			
			[markdown]
				
				# [name] ([version])
				
				[if: description]
				> [description]
				[/if]
				
				---
					
				| Field         | Value      |
				|---------------|------------|
				| **Author**    | [author]   |
				| **Category**  | [category] |
				| **Kind**      | [kind]     |
				| **Aliases**   | [aliases]  |
				
				## Syntax
				[encode_delimiters: docs.syntax]
				
				## Flags
				
				[if: docs.flags]
					| Field         | Value      |
					|---------------|------------|
					[each: flag using docs.flags]
						| **-[flag.key]**   | [flag.value]  |
					[/each]
				[else]
					_None_
				[/if]
				
				## Content
				
				[if: kind == 'container']
					The **content** of a container tag is the portion between the opening and closing tags.
				[/if]
				
				[if: docs.content]
					[each: field using docs.content]
						| Field         | Value      |
						|---------------|------------|
						| **Type**          | [field.type]         |
						| **Required**      | [field.required]     |
						| **Description**   | [field.description]  |
					[/each]  
				[else]
					_None_
				[/if]
				
				tess
				[if: docs.examples]ting
					[each: example using docs.examples]						
						| Field         | Value      |
						|---------------|------------|
						| **Payload**   | [example.payload]               |
						| **Template**  | [code][example.template][/code] |
						| **Output**    | [example.output]                |
						| **Note**      | [example.note]                  |
					[/each]  
				[/if]
				
				
			[/markdown]
			
			`
			/*	
				### Content
				[docs.content]
				
				###Examples
				[stringify: docs.examples]
				
			
		`*/
		
		let output = req.engine.process(template, plugin)
		
		
		return output
		
	}
	

}