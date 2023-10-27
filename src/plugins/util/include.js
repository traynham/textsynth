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
		
		// Check if content (the file to be included) is provided. If not, return an error message.
		if (!req.content) {
			return 'ERROR: No file specified for include tag'
		}
		
		// Check if the included file has an extension. If not, return an error message.
		if(!path.extname(req.content)){
			return 'ERROR: Include file name requires an extension.'
		}
		
		// Generate the absolute path of the file to be included.
		let includePath = path.join(req.payload._synth.views, req.content)
		
		// Check if the file to be included exists. If not, return an error message.
		if (!fs.existsSync(includePath)) {
			return `ERROR: Include file does not exist: ${includePath}`
		}
		
		// If the file exists, read its content.
		const fileContent = fs.readFileSync(includePath, {encoding:'utf8'})
		
		// Process the included file content using the engine, passing in the file's content and the payload.
		// This allows nested includes and processing of other tags within the included file.
		const mergedContent = req.engine.process(fileContent, req.payload)
		
		// Return the processed content of the included file.
		return mergedContent
		
	}
  
}