import fs from 'fs'
import path from 'path'

export default {
	
	// BASIC INFORMATION
	name: 'layout',
	author: 'Jesse Traynham',
	category: 'Layout',
	description: 'Loads a base template and inserts child template content into blocks.',
	kind: 'container',
	syntax: '[layout "templatePath"]\n\t[block_set "blockName"]Block content[/block_set]\n[/layout]',
	version: '1.0.0',
	
	// CONTENT AND PARAMS DETAILS
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'The template to inject into the layout.'
		}
	],
	params: [
		{
			name: 'layout',
			type: 'string',
			required: true,
			description: 'Path to the base layout.'
		}
	],
	
	// EXAMPLES FOR USAGE
	examples: [
		{
			input:
				'[layout "main.synth"]\n' + 
				'	[block_set "title"]My Site[/block_set]\n' +
				'	[block_append "title"] › Home[/block_append]\n' +
				'	[block_prepend "title"]Welcome to [/block_prepend]\n' +
				'	[block_set "body"]Page content[/block_set]\n' +
				'[/layout]\n',
			output: 'Depends on the content of the "main.synth" template.',
			note: 'Loads the "main.synth" layout and sets the "title" and "body" blocks.'
		}
	],
	
	processor(req) {
		
		// DESTRUCTURE THE REQUEST OBJECT
		let { content, params, payload, textMerger } = req
		
		// LOAD THE LAYOUT CONTENT
		let layoutContent = this.loadLayout(payload, params)
		
		// CREATE A STACK TO HANDLE NESTED LAYOUT RENDERING
		// INITIALIZE IT IF IT DOESN'T EXIST YET
		payload._layoutStack = payload._layoutStack || []
		
		// PUSH AN EMPTY OBJECT INTO THE STACK TO HANDLE THE CURRENT LAYOUT
		payload._layoutStack.push({})
		
		// REMOVE COMMENTS FROM THE LAYOUT CONTENT
		layoutContent = textMerger.removeComments(layoutContent)
		
		// REMOVE LEADING TABS FROM THE LAYOUT CONTENT
		layoutContent = textMerger.removeLeadingTabs(layoutContent)
		
		// POPULATE THE BLOCKS OBJECT WITH THE INITIAL BLOCK CONTENT FROM THE LAYOUT
		this.populateLayoutBlocksObj(textMerger, payload, params, layoutContent) 
		
		// RENDER THE LAYOUT WITH THE BLOCK CONTENT AND RETURN THE RESULT
		let renderedLayout = this.renderLayout(textMerger, content, layoutContent, params, payload)
		
		// ONCE THE LAYOUT IS RENDERED, POP THE STACK TO CLEAN UP
		payload._layoutStack.pop()
		
		// RETURN THE RENDERED LAYOUT
		return renderedLayout
		
	},
	
	loadLayout(payload, params) {
		
		// IF THE PAYLOAD CONTAINS THE LAYOUT, JUST RETURN IT
		if(payload.layout){ return payload.layout }
		
		// CONSTRUCT THE FULL PATH TO THE LAYOUT FILE
		const layoutPath = path.join(payload._synth.views, params[0].value)
		
		// CHECK IF THE LAYOUT FILE EXISTS BEFORE READING IT
		if (!fs.existsSync(layoutPath)) {
			return `ERROR: Layout file does not exist: ${layoutPath}`
		}
		
		// READ AND RETURN THE CONTENT OF THE LAYOUT FILE
		return fs.readFileSync(layoutPath, 'utf-8')
		
	},
	
	//populateLayoutBlocksObj(textMerger, params, layoutContent) {
	populateLayoutBlocksObj(textMerger, payload, params, layoutContent) {
		
		// DESTRUCTURE THE DELIMITERS OBJECT FOR EASIER USE
		let {start, end} = textMerger.delimiters.esc
		
		// USE THE TOP OBJECT IN THE LAYOUT STACK
		let blocks = payload._layoutStack[payload._layoutStack.length - 1]
		
		// FIND INITIAL BLOCK CONTENT IN THE LAYOUT AND POPULATE THE BLOCKS OBJECT
		let initialBlockContentMatches
		const initialBlockContentRegex = new RegExp(`${start}block:?\\s+["']([^"']+)["']\\]([\\s\\S]*?)${start}\\/block${end}`, 'gm')
		
		// ITERATE OVER ALL MATCHES IN THE LAYOUT CONTENT
		while ((initialBlockContentMatches = initialBlockContentRegex.exec(layoutContent)) !== null) {
			
			// EXTRACT THE BLOCK NAME AND THE INITIAL CONTENT
			const blockName = initialBlockContentMatches[1]
			const initialContent = initialBlockContentMatches[2]
			
			// POPULATE THE BLOCKS OBJECT WITH THE INITIAL BLOCK CONTENT
			blocks[blockName] = initialContent
			
		}
		
	},
	
	renderLayout(textMerger, content, layoutContent, params, payload) {
		
		let rendered = ''
		
		// DESTRUCTURE THE DELIMITERS OBJECT FOR EASIER USE
		let {start, end} = textMerger.delimiters.esc
		
		// PROCESS THE CONTENT OF THE LAYOUT
		if(content){
			rendered = textMerger.process(content, payload)
		}
		
		
		// USE THE TOP OBJECT IN THE LAYOUT STACK
		let blocks = payload._layoutStack[payload._layoutStack.length - 1]
		
		// IF THE PAYLOAD HAS A 'PAGE.BLOCK' PROPERTY, USE THE BLOCK FOR THE RENDERED CONTENT
		if(payload.page.block){
			blocks[payload.page.block] = rendered
		}
		
		// ITERATE OVER ALL ENTRIES IN THE BLOCKS OBJECT
		for (const [blockName, blockContent] of Object.entries(blocks)) {
			
			// CREATE A REGEX TO MATCH THE CURRENT BLOCK PLACEHOLDER
			const regex = new RegExp(`${start}block:?\\s+["']${blockName}["']\\]([\\s\\S]*?)${start}\\/block${end}`, 'gm')
			
			// REPLACE THE BLOCK PLACEHOLDER WITH THE BLOCK CONTENT
			layoutContent = layoutContent.replace(regex, blockContent)
			
			// CREATE A REGEX TO MATCH THE CURRENT SELF CLOSING BLOCK PLACEHOLDER
			// NOTE: Allows for [block: 'name' /] or [block: 'name'.]. Matched in grammar.js
			const regex2 = new RegExp(`${start}block:?\\s+["']${blockName}["'] ?[/.]?${end}`, 'gm')
			
			// REPLACE THE BLOCK PLACEHOLDER WITH THE BLOCK CONTENT
			layoutContent = layoutContent.replace(regex2, blockContent)
			
			
		}
		
		layoutContent = textMerger.process(layoutContent, payload)
		
		// RETURN THE FINAL LAYOUT CONTENT WITH ALL BLOCK PLACEHOLDERS REPLACED
		return layoutContent
		
	}

}