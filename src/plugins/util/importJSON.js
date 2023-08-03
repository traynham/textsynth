import fs from 'fs'
import path from 'path'


export default {
	
	// Basic Information
	name: 'importJSON',
	author: 'Jesse Traynham',
	category: 'Util',
	description: 'Imports a JSON file and adds it the to the payload using the provided name or "JSON" by default.',
	kind: 'single',
	syntax: "[importJSON: 'path/to/file.json'] or [importJSON: name using 'path/to/file.json']",
	version: '1.0.0',
	
	// Examples for usage
	examples: [
		{
			input: "[importJSON: 'data/user.json']",
			output: "The content of user.json is now accessible through [JSON] in the template. Example: `[JSON.name]`",
			note: "Import JSON file content."
		},
		{
			input: "[importJSON: user using data/user.json]",
			output: "The content of user.json is now accessible through [user] in the template. Example: `[user.name]`",
			note: "Import JSON file content and assign it to a specific name."
		},
	],
	
	processor(req) {
		
		// Extract the name and path from the request cargo. If not specified, set defaults.
		let name = req.cargo.using?.name || 'JSON'
		let thePath = req.cargo.using?.value || req.content
		
		// If thePath is not defined, return an error message.
		if (!thePath) {
			return 'ERROR: No file specified for importJSON tag'
		}
		
		// Check the extension of thePath. If it's not a JSON file, return an error.
		if(path.extname(thePath) !== '.json'){
			return `ERROR: JSON file requires .JSON extension.`
		}
		
		// Construct the full path to the JSON file.
		let includePath = path.join(req.payload._synth.views, thePath)
		
		// If the JSON file does not exist, return an error.
		if (!fs.existsSync(includePath)) {
			return `ERROR: JSON file does not exist: ${includePath}`
		}
		
		// Read the content of the JSON file.
		const fileContent = fs.readFileSync(includePath, {encoding:'utf8'})
		
		// Try to parse the file content as JSON. If it fails, return an error.
		try {
			req.payload[name] = JSON.parse(fileContent)
		} catch (error) {
			return `ERROR: Failed to parse JSON: › ${error.message}`
		}
		
		// If all steps are successful, return an empty string.
		return ''
		
	}
  
}