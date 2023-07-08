import fs from 'fs'
import path from 'path'


export default {
	name: 'include',
	kind: 'single',
	category: 'Util',
	description: 'Include a template partial from a specified file and merge it with the current template.',
	usage: `[include: 'path/to/partial]`,
	example: `[include: 'partials/header.synth']\nWelcome to our website!\n[include: 'partials/footer.synth']`,
	processor(req) {
		
		// console.log(
		// 	'CONTENT::',
		// 	req.content.length
		// )
		
		// If no content is provided, throw an error
		if (req.content.length === 0) {
			console.log('No file specified for include tag')
			return ''
			//throw new Error('No file specified for include tag')
		}
		
		// Add ".synth" extension to the file if it doesn't have any extension
		if(path.extname(req.content) === ''){
			req.content = req.content + '.synth'
		}
		
		// Check if the file has the correct ".synth" extension, and throw an error if it doesn't
		if(path.extname(req.content) !== '.synth'){
			console.log(`Include file has wrong extension: ${path.extname(req.content)}`)
			return ''
			// throw new Error(
			// 	`Include file has wrong extension: ${path.extname(req.content)}`
			// )
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