import fs from 'fs'
import path from 'path'


export default {
	
	// Basic Information
	name: 'include',
	author: 'Jesse Traynham',
	category: 'Util',
	description: 'Include a template partial from a specified file and merge it with the current template.',
	kind: 'single',
	syntax: "[include: 'path/to/partial']",
	version: '1.0.0',
	
	// Examples for usage
	examples: [
		{
			input: "[include: 'partials/header.synth']\nWelcome to our website!\n[include: 'partials/footer.synth']\n",
			output: "Heder and footer text retrieved.",
			note: "Include file content from partials."
		},
	],
	
	processor(req) {
		if (req.engine.env.platform === 'node') {
			return this.onProcessNode(req)
		} else {
			return this.onProcessBrowser(req)
		}
	},
	
	onProcessNode(req) {
		
		// TODO: Add ability to get from a url using fetch?
		
		// Check if content (the file to be included) is provided. If not, return an error message.
		if (!req.content) {
			return 'ERROR: No file specified for include tag'
		}
		
		// Check if the included file has an extension. If not, return an error message.
		if(!path.extname(req.content)){
			return 'ERROR: Include file name requires an extension.'
		}
// MOVE TO REQ.ENGINE.ENV.VIEWS??????		
		// Generate the absolute path of the file to be included.
		let includePath = path.join(req.payload._synth.views, req.content)
		
		// Check if the file to be included exists. If not, return an error message.
		if (!fs.existsSync(includePath)) {
			return `ERROR: Include file does not exist: ${includePath}`
		}
		
		// If the file exists, read its content.
		let fileContent = fs.readFileSync(includePath, {encoding:'utf8'})
		
		// -removeTabs flag
		if(req.cargo.flags.includes('removeTabs')){
			fileContent = fileContent.replaceAll('\t', '')
		}
		
		// Process the included file content using the engine, passing in the file's content and the payload.
		// This allows nested includes and processing of other tags within the included file.
		const mergedContent = req.engine.process(fileContent, req.payload)
		
		// Return the processed content of the included file.
		return mergedContent
		
	},

	onProcessBrowser(req) {
		
		if (!req.content) return 'ERROR: No file specified for include tag'
		
		//const content = this.fetchSync(req.content)
		const content = req.engine.fetchSync(req.content)
		const processed = req.engine.process(content, req.payload)
		
		if(req.cargo.flags.includes('markdown')){
			return req.engine.runPlugin('markdown', { content: processed})
		} else {
			return processed
		}
		
	},
/*
	fetchSync(path) {
		
		const xhr = new XMLHttpRequest()
		xhr.open('GET', path, false) // false = synchronous
		xhr.send(null)
		
		if (xhr.status === 200) {
			return xhr.responseText
		}
		
		return `ERROR: Failed to load ${path}: ${xhr.status}`
		//throw new Error(`Failed to load ${path}: ${xhr.status}`)
		
	}
*/
}