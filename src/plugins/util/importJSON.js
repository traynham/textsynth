import fs from 'fs'
import path from 'path'

import JSON6 from 'json-6'
import Lorry from '@jessetraynham/lorry'


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
		let name = req.cargo?.using?.name || 'JSON'
		let uri = req.cargo?.using?.value || req.content
		let views = path.resolve(req.payload?._synth.views)
		
		if(!uri){
			return `ERROR: No file specified for importJSON tag`
		}
		
		let parsedURL = this.createURL(uri, views)
		
		if(parsedURL.err){
			return `ERROR: ${parsedURL.err.message} › ${uri}`
		}
		
		// IF FILE
		if(parsedURL.protocol === 'file:'){
			
			let { pathname } = parsedURL
			
			let validExtension = ['.json', '.json5', '.json6'].includes(path.extname(pathname).toLowerCase())
			
			if(!validExtension){
				return `ERROR: Invalid extension › '${path.extname(uri)}'`
			}
			
			// If the JSON file does not exist, return an error.
			if (!fs.existsSync(pathname)) {
				return `ERROR: JSON file does not exist: ${pathname}`
			}
			
			let fileContent = fs.readFileSync(pathname, {encoding:'utf8'})
			
			try {
				req.payload[name] = JSON6.parse(fileContent)
			} catch (error) {
				return `ERROR: Failed to parse JSON: › ${error.message}`
			}
			
			return ''
			
		}
		
		let fileContent = req.engine.fetchSyncJSON(parsedURL.href)
		
		if(fileContent.err){
			return `${fileContent.err.message}`
		}
		
		req.payload[name] = fileContent.value
		
		return ''
		
	},
	
	createURL(input, base){
		
		let lorry = new Lorry()
		
		input = decodeURIComponent(input).trim()
		
		try {
			let obj = new URL(input, `file://${base}/`)
			return obj
		} catch (e) {
			return lorry.Throw(400, e.message)
		}
	}
	
}