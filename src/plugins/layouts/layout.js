import fs from 'fs'
import path from 'path'

/*
	TODO:
	* Throw error or check for valid path in layoutContent.
	* Add a way to pass a layout as a string in addition to a file.
*/

export default {
	
	// Basic Information
	name: 'layout',
	author: 'Jesse Traynham',
	category: 'Layout',
	description: 'Loads a base template and inserts child template content into blocks.',
	kind: 'container',
	syntax: '[layout "templatePath"]\n\t[block_set "blockName"]Block content[/block_set]\n[/layout]',
	version: '1.0.0',
	
	// Content and Params details
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
	
	// Examples for usage
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

	processor(request) {
		
		this.start = request.textMerger.delimiters.enc.start
		this.end = request.textMerger.delimiters.enc.end
		
		const layoutPath = path.join(request.payload._synth.views, request.params[0])
		const layoutContent = fs.readFileSync(layoutPath, 'utf-8')
		const childContent = request.content
		
		const blockContent = {}
		
		// Prepopulate blockContent with block content from layoutContent
		this.processTag(layoutContent, 'block', (tagName, blockName, content) => {
			blockContent[blockName] = content
		})
		
		// Process block_set, block_prepend and block_append in order of appearance in childContent
		this.processTag(childContent, ['block_set', 'block_prepend', 'block_append'], (tagName, blockName, content) => {
			
			switch(tagName) {
				case 'block_set':
					blockContent[blockName] = content
					break
				case 'block_prepend':
					blockContent[blockName] = content + blockContent[blockName]
					break
				case 'block_append':
					blockContent[blockName] = blockContent[blockName] + content
					break
			}
		});
		
		//Replace block placeholders with block content
		const finalContent = this.processTag(layoutContent, 'block', (tagName, blockName) => {
			return blockContent[blockName]
		}, true)
		
		return finalContent
		
	},

	processTag(input, tagNames, callback, returnReplaced = false) {
		
		if(!Array.isArray(tagNames)) {
			tagNames = [tagNames]
		}
		// updated regex
		const regex = new RegExp(
			`${this.start}(${tagNames.join('|')})\\s+["']([^"']+)["']\\]([\\s\\S]*?)${this.start}\\/\\1${this.end}`, 
			'gm'
		)
		
		let match
		let result = input
		
		while ((match = regex.exec(input)) !== null) {
			const [fullMatch, tagName, blockName, content] = match
			const processedContent = callback(tagName, blockName, content)
			if (returnReplaced) {
				result = result.replace(fullMatch, processedContent)
			}
		}
		
		return result
		
	}

}