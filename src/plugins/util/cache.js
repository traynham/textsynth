import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

export default {
	
	// Basic Information
	name: 'cache',
	author: 'Jesse Traynham',
	category: 'Util',
	description: 'Automatically caches the content between the cache tags. If the same content is encountered again, the cached version is used. The cache is automatically invalidated and refreshed when the content changes. Optionally, old cache files can be cleaned up.',
	kind: 'container',
	syntax: "[cache] ... [/cache]",
	version: '1.0.0',
	
	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'any',
			required: true,
			description: 'The content to be cached.'
		}
	],
	
	// Examples for usage
	examples: [
		{
			code: "[cache]This is some content to cache[/cache]",
			result: "This is some content to cache",
			comment: "The content will be cached."
		}
	],
	
	// Settings
	settings: {
		cacheFolder: './cache',  // Directory to store cache files
		cacheDuration: 7,        // Maximum age of cache files in days
		cacheCleanup: false      // Whether to always perform cleanup of old cache files
	},
	
	processor(req) {
		
		let { cacheFolder, cacheDuration, cacheCleanup } = this.settings
		
		console.log('SETTINGS::', this.settings)
		
		// Create cache directory if it doesn't exist
		if (!fs.existsSync(cacheFolder)) {
			fs.mkdirSync(cacheFolder)
		}
		
		// Cleanup cache if the setting is enabled
		if(cacheCleanup){
			this.cleanupCache(cacheFolder, cacheDuration)
		}
		
		// Generate a checksum from the content
		const contentChecksum = this.getChecksum(req.content);
		const cacheFilePath = path.join(cacheFolder, `${contentChecksum}.cache`)
		
		// If cache file exists and its checksum matches the content's checksum, return the cached content
		if (fs.existsSync(cacheFilePath)) {
			const cacheData = fs.readFileSync(cacheFilePath, 'utf-8')
			const { name } = path.parse(cacheFilePath)
			
			if(contentChecksum === name) {
				return cacheData
			}
		}
		
		// Process the content
		const processedContent = req.textMerger.merge(req.content, req.payload)
		
		// Cache the processed content
		fs.writeFileSync(cacheFilePath, processedContent, 'utf-8')
		
		// Return the processed content
		return processedContent
		
	},
	
	// Function to generate a checksum from a string
	getChecksum(str) {
		return crypto
			.createHash('md5')
			.update(str, 'utf8')
			.digest('hex')
	},
	
	/* c8 ignore start */
	cleanupCache(cacheFolder, cacheDuration) {
		
		fs.readdir(cacheFolder, (err, files) => {
			
			if (err) {
				console.log(`Error reading directory: ${err}`)
				return
			}
			
			files.forEach(file => {
				if(path.extname(file) === '.cache') {
					const filePath = path.join(cacheFolder, file)
					fs.stat(filePath, (err, stats) => {
						if (err) {
							console.log(`Error getting stats of file: ${err}`)
							return
						}
						const fileAgeInMilliseconds = new Date() - stats.birthtime
						const fileAgeInDays = fileAgeInMilliseconds / (1000 * 60 * 60 * 24)
						if (fileAgeInDays > cacheDuration) {
							fs.unlink(filePath, err => {
								if (err) {
									console.log(`Error deleting file: ${err}`)
									return
								}
							})
						}
					})
				}
			})
		})
	}
	/* c8 ignore end */

}