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
		
		// If no content is provided, throw an error
		if (req.content.length === 0) {
			console.log('No file specified for include tag')
			return ''
		}
		
		// Add ".synth" extension to the file if it doesn't have any extension
		if(path.extname(req.content) === ''){
			req.content = req.content + '.synth'
		}
		
		// Check if the file has the correct ".synth" extension, and throw an error if it doesn't
		if(path.extname(req.content) !== '.synth'){
			console.log(`Include file has wrong extension: ${path.extname(req.content)}`)
			return ''
		}
		
		let thePath = path.join(req.payload._synth.views, req.content)
		
		// Check if the file is outside of the views folder for Express requests, and throw an error if it is
			
		/*
		if(!thePath.startsWith(req.payload.settings.views)){
			throw new Error(
				`Include file is outside of views folder: ${req.content} requested from ${req.payload.settings.template}`
			)
		}
		*/
		
		// Read the content of the file
		const fileContent = fs.readFileSync(thePath, {encoding:'utf8'})
		
		// Merge the included file content with the payload
		const mergedContent = req.textMerger.process(fileContent, req.payload)
		
		return mergedContent
		
	}
  
}