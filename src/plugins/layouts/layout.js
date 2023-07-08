import fs from 'fs'
import path from 'path'

/*
	TODO:
	* Throw error or check for valid path in layoutContent.
	* Add a way to pass a layout as a string in addition to a file.
	* Update delimiters reference.
*/

export default {
	name: 'layout',
	kind: 'container',
	description: 'Loads a base template and inserts child template content into blocks.',
	category: 'Layout',
	example: '[layout "main.synth"] [block_set "title"]Page Title[/block_set] [block_set "body"]Page content[/block_set] [/layout]',
	processor(request) {
		
		// TODO: Use textMerger.delimters object.
		this.opener_enc = request.textMerger.opener_enc
		this.closer_enc = request.textMerger.closer_enc
		
		// if(!request.params[0]){
		// 	return
		// }
		
		const layoutPath = path.join(request.payload._synth.views, request.params[0])
		const layoutContent = fs.readFileSync(layoutPath, 'utf-8')
		const childContent = request.content
		
		const blockContent = {}
		
		// Prepopulate blockContent with block content from layoutContent
		this.processTag(layoutContent, 'block', (tagName, blockName, content) => {
			blockContent[blockName] = content
		});
		
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
		//const finalContent = this.processTag(layoutContent, 'block', (tagName, blockName, content) => {
		const finalContent = this.processTag(layoutContent, 'block', (tagName, blockName) => {
			//return blockContent[blockName] !== undefined ? blockContent[blockName] : content
			return blockContent[blockName]
		}, true)
		
		return finalContent
		
	},

	processTag(input, tagNames, callback, returnReplaced = false) {
		if(!Array.isArray(tagNames)) {
			tagNames = [tagNames]
		}
		// updated regex
		const regex = new RegExp(`${this.opener_enc}(${tagNames.join('|')})\\s+["']([^"']+)["']\\]([\\s\\S]*?)${this.opener_enc}\\/\\1${this.closer_enc}`, 'gm')
	
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