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
		//let { content, params, payload, engine } = req
		let { contentRaw, params, payload, engine } = req
		
		// LOAD THE LAYOUT CONTENT
//		let layoutContent = this.loadLayout(payload, params)
		let layoutContent = this.loadLayout(payload, params, req)
		
		// CREATE A STACK TO HANDLE NESTED LAYOUT RENDERING
		// INITIALIZE IT IF IT DOESN'T EXIST YET
		payload._layoutStack = payload._layoutStack || []
		
		// PUSH AN EMPTY OBJECT INTO THE STACK TO HANDLE THE CURRENT LAYOUT
		payload._layoutStack.push({})
		
		// REMOVE COMMENTS FROM THE LAYOUT CONTENT
		layoutContent = engine.removeComments(layoutContent)
		
		// REMOVE LEADING TABS FROM THE LAYOUT CONTENT
		layoutContent = engine.removeLeadingTabs(layoutContent)
		
		// POPULATE THE BLOCKS OBJECT WITH THE INITIAL BLOCK CONTENT FROM THE LAYOUT
		this.populateLayoutBlocksObj(engine, payload, params, layoutContent) 
		
		// RENDER THE LAYOUT WITH THE BLOCK CONTENT AND RETURN THE RESULT
		//let renderedLayout = this.renderLayout(engine, content, layoutContent, params, payload)
		let renderedLayout = this.renderLayout(engine, contentRaw, layoutContent, params, payload)
		
		// ONCE THE LAYOUT IS RENDERED, POP THE STACK TO CLEAN UP
		payload._layoutStack.pop()
		
		// RETURN THE RENDERED LAYOUT
		return renderedLayout
		
	},
	
	loadLayout(payload, params, req) {
	//loadLayout(payload, params) {
		
		
		// IF THE PAYLOAD CONTAINS THE LAYOUT, JUST RETURN IT
		if(payload.layout){ return payload.layout }
		
		if (req.engine.env.platform === 'browser') {
			return req.engine.fetchSync(params[0].value)
		}
		
		// CONSTRUCT THE FULL PATH TO THE LAYOUT FILE
		const layoutPath = path.join(payload._synth.views, params[0].value)
		
		// CHECK IF THE LAYOUT FILE EXISTS BEFORE READING IT
		if (!fs.existsSync(layoutPath)) {
			return `ERROR: Layout file does not exist: ${layoutPath}`
		}
		
		// READ AND RETURN THE CONTENT OF THE LAYOUT FILE
		return fs.readFileSync(layoutPath, 'utf-8')
		
	},
	
	// POPULATE INITIAL BLOCKS
	populateLayoutBlocksObj(engine, payload, params, layoutContent) {
		
		// USE THE TOP OBJECT IN THE LAYOUT STACK
		let blocks = payload._layoutStack[payload._layoutStack.length - 1]
		
		engine.process(layoutContent, { ...payload, blocks })
		
	},
	
	renderLayout(engine, content, layoutContent, params, payload) {
		
		let rendered = ''
		
		// PROCESS THE CONTENT OF THE LAYOUT
		if(content){
			rendered = engine.process(content, payload)
		}
		
		// USE THE TOP OBJECT IN THE LAYOUT STACK
		let blocks = payload._layoutStack[payload._layoutStack.length - 1]
		
		engine.process(layoutContent, { ...payload, blocks})
		
		// IF THE PAYLOAD HAS A 'PAGE.BLOCK' PROPERTY, USE THE BLOCK FOR THE RENDERED CONTENT
		if(payload.page?.block){
			blocks[payload.page.block] = rendered
		}
		
		layoutContent = engine.process(layoutContent, payload)
		
		// RETURN THE FINAL LAYOUT CONTENT WITH ALL BLOCK PLACEHOLDERS REPLACED
		return layoutContent
		
	}

}