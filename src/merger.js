import fs from 'fs'
import path from 'path'
import process from 'process'

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import walk from 'walk-sync'


class TextMerger {
	
	// PLUGINS/TAGS
	plugins = {}
	tags = {}
	
	// DELIMITERS
	opener_raw
	closer_raw
	opener_enc
	closer_enc
	
	// SETTINGS
	flush_comments = true
	removeTabs
	views
	
	constructor(options = {}) {
		
		this.opener_raw = options.opener || '['
		this.closer_raw = options.closer || ']'
		
		this.opener_enc = this.opener_raw.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
		this.closer_enc = this.closer_raw.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
		
		this.removeTabs = options.removeTabs !== false
		
		this.views = path.join(
			this._getAppRoot(), 
			options.views ? options.views : 'views'
		)
		
	}

	_getAppRoot = () => {
		
		/*
			Starting at the current working directory, this method locates and returns 
			the path of the closest parent directory containing 'node_modules', 
			or null if none found.
		*/
		
		let currentPath = process.cwd()
		
		while (currentPath !== path.parse(currentPath).root) {
			const dirListing = fs.readdirSync(currentPath)
			if (dirListing.includes('node_modules')) { return currentPath }
			currentPath = path.dirname(currentPath)
		}
		
		return null
		
	}


	// Load default plugins from the "plugins" directory
	async _loadDefaultPlugins() {
		const __filename = fileURLToPath(import.meta.url)
		const __dirname = dirname(__filename)
		const pluginDirectory = join(__dirname, 'plugins')
		await this._loadPluginsDir(pluginDirectory)
	}
	
	async _loadCustomPlugins(pluginDirectory){
		if(!pluginDirectory){ return }
		await this._loadPluginsDir(pluginDirectory)
	}
	
	async _loadPluginsDir(pluginDirectory) {
		
		// TODO: Test to see if path is valid before continuing.
		
		const pluginFiles = walk(pluginDirectory, {
			globs: ['**/*.js'],
			ignore: ['**/_*'],
		})
		
		const pluginImports = pluginFiles.map((file) => import(join(pluginDirectory, file)))
		const plugins = await Promise.all(pluginImports)
		
		this._registerPlugins(plugins)
		
	}
	
	_registerPlugins(plugins){
		for (const pluginModule of plugins) {
			const plugin = pluginModule.default
			this.use(plugin)
		}
		
	}

	// Register one or more plugins
	use = (...plugins) => {
		plugins.forEach((plugin) => {
			this.plugins[plugin.name] = plugin
			this.tags[plugin.name] = plugin
			if(plugin.aliases){
				this.alias(plugin.name, plugin.aliases)
			}
		})
	}
	
	// Register one or more aliases for a tag.
	alias = (tag, alias) => {
		if(!Array.isArray(alias)) { alias = [alias] }
		alias.forEach( alias => {
			this.tags[alias] = this.plugins[tag]
		})
	}
	
	// INIT
	async init(opt = {}) {
		
		if(!opt.custom){
			opt.custom = 'examples/express/plugins' // CHANGE TO A BETTER DEFAULT
		}
		
		// LOAD DEFAULT PLUGINS
		await this._loadDefaultPlugins()
		
		// LOAD CUSTOM PLUGINS
		let custom = path.join(this._getAppRoot(), opt.custom)
		await this._loadCustomPlugins(custom)
		
	}

	// MERGE
	merge(template, payload) {
		
		if(!payload._synth?.views){
			payload._synth = {}
			payload._synth.views = this.views
		}
		
		if('flush_comments' in payload._synth){
			this.flush_comments = payload._synth.flush_comments
		}
		
		// REMOVE COMMENTS
		if(this.flush_comments){
			
			// Remove single-line comments
			template = template.replace(/(?<!:)(\/\/[^\n]*)/g, '')
			
			// Remove multi-line C-style comments
			template = template.replace(/\/\*[\s\S]*?\*\//g, '')
			
			// Remove multi-line HTML comments
			template = template.replace(/<!--[\s\S]*?-->/g, '')
			
		}
		
		// REMOVE LEADING TABS
		if (this.removeTabs) {
			template = template.replace(/^\t+/gm, '')
		}
		
		// PROCESS
		
		let processed
		
		// Process containers
		processed = this._processContainers(template, payload)
		
		// Process single merge tags
		processed = this._processSingles(processed, payload)
		
		return processed
		
	}

	async mergeFile(filePath, payload) {
		
		if(!payload._synth?.views){
			payload._synth = {}
			payload._synth.views = this.views
		}
		
		if(!payload._synth.isExpress){
			const entryPath = path.dirname(process.argv[1])
			filePath = path.join(entryPath, filePath)
		}
		
		try {
			
			const template = fs.readFileSync(filePath, 'utf-8')
			
			// Merge the template with the provided data
			const mergedText = await this.merge(template, payload)
			
			return mergedText
			
		} catch (error) {
			console.error('Error rendering file:', error)
			throw error
		}
		
	}
	
	_processSingles(input, payload) {
		
		// Match unescaped TextSynth tags, ignoring surrounding whitespaces within the tags.
		const mergeTagRegex = new RegExp(
			`(?<!\\\\)${this.opener_enc}\\s*(.*?)\\s*(?<!\\\\)${this.closer_enc}`,
			'g'
		)
		
		return input.replace(mergeTagRegex, (match, mergeTag) => {
			
			const { kind, processors, name } = this._parseMergeTag(mergeTag)
			
			if (kind !== 'single') {
				return match
			}
			
			let content = this._getValueFromPath(name, payload)
			
			if (content === undefined) {
				//console.log(`Property path "${name}" absent in payload, merge tag replaced with empty string.`)
				content = ''
			}
			
			for (const { name, params } of processors) {
				
				const plugin = this.tags[name]
				
				if (plugin) {
					const request = {
						content: content,
						params,
						payload,
						textMerger: this
					}
					const response = plugin.processor(request);
					content = response;
				}
				
			}
			
			return content
			
		})
		.replace(new RegExp(`\\\\(${this.opener_enc}|${this.closer_enc})`, 'g'), '$1'); // Removes preceding escape characters for [ and ]
		
	}


	_processContainers(input, payload) {

		let output = input
		let foundContainer
		
		do {
			
			foundContainer = false
			
			const mergeTagRegex = new RegExp(
				`${this.opener_enc}\\s*(.*?)\\s*${this.closer_enc}(\\n)?`, 
				'gs'
			)
			
			let match
			
			while ((match = mergeTagRegex.exec(output))) {
				
				const [fullMatch, mergeTag] = match
				const { kind, processors, name } = this._parseMergeTag(mergeTag)
				
				if (kind !== 'container') {
					continue
				}
				
				foundContainer = true;
				const closingTag = `${this.opener_raw}/${processors[0].name}${this.closer_raw}`;
				const closingIndex = this._findClosingTagIndex(output, match.index, processors[0].name)
				
				const content = output.substring(match.index + fullMatch.length, closingIndex)
				// Updated code to support multiple params
				const params = name ? name.split(',').map(param => this._getValueFromPath(param.trim(), payload)) : [];
				
				let processedContent = content; // Do not process nested containers at this point
					
				// Apply each processor (plugin) in order
				processors.forEach(({ name }) => {
					
					const plugin = this.tags[name];
					
					if (plugin) {
						const request = {
							content: processedContent,
							params,
							payload,
							textMerger: this,
						};
						const response = plugin.processor(request);
						processedContent = response;
					}
				})
				
				// Process nested containers after processing the outer container
				processedContent = this._processContainers(processedContent, payload);
				
				// Replace the entire content between the opening and closing tags, including the closing tag
				output = output.slice(0, match.index) + processedContent + output.slice(closingIndex + closingTag.length);
				
				// Reset regex index due to output modifications
				mergeTagRegex.lastIndex = match.index + processedContent.length;
				
				break
			}
			
		} while (foundContainer)
		
		return output
		
	}

	
	_findClosingTagIndex(input, startIndex, tagName) {
		
		const openingTagPattern = new RegExp(`${this.opener_enc}${tagName}`, 'g')
//		const openingTagPattern = new RegExp(`${this.opener_enc}${tagName}(\\n)?`, 'g')

		const closingTagPattern = new RegExp(`${this.opener_enc}\\/${tagName}${this.closer_enc}`, 'g')
		
		let index = startIndex
		let count = 1
		
		while (count > 0) {
			
			const openingIndex = this._findNextIndex(input, openingTagPattern, index + this.opener_raw.length + tagName.length)
			const closingIndex = this._findNextIndex(input, closingTagPattern, index + this.opener_raw.length + tagName.length + 1) // +1 for the "/"
			
			if (closingIndex === -1) {
				throw new Error(
					`No matching closing tag found for ${this.opener_raw}${tagName}${this.closer_raw}`
				)
			} else if (openingIndex === -1 || closingIndex < openingIndex) {
				count--
				index = closingIndex
			} else {
				count++
				index = openingIndex
			}
		}
		
		return index
		
	}
	
	_findNextIndex(input, pattern, startIndex) {
		pattern.lastIndex = startIndex
		const match = pattern.exec(input)
		return match ? match.index : -1
	}



	_parseMergeTag(mergeTag) {
		
		// TAG SHAPE: Colon after name is optional, space is not.
		const [tagParams, name] = mergeTag.split(/(?<!\([^)]*):? (.+)/).map((part) => part.trim());
		
		// IF CONTAINER TAG WITH NO PARAMS OR CONTENT.
		if (this.tags[mergeTag]) {
			return { kind: 'container', processors: [{name: mergeTag, params: []}], name: mergeTag }
		}
		
		// If there are no processors, treat it as a simple merge tag
		if (!name) {
			return { kind: 'single', processors: [], name: tagParams }
		}
		
		const tagParamPairs = tagParams.match(/[\w]+(\([^)]*\))?/g)
		const processors = tagParamPairs.map((tagParamPair) => {
			
			const [tagName, ...paramsStr] = tagParamPair.split(/[()]/).filter((part) => part !== '')
			
			const params = paramsStr.length
				? paramsStr[0]
					.split(/,(?=(?:[^"']*["'][^"']*["'])*[^"']*$)/)
					.map((param) => {
						param = param.trim().replace(/^["']+|["']+$/g, '');
						if (param.toLowerCase() === 'true') return true;
						if (param.toLowerCase() === 'false') return false;
						return param;
					})
				: [];
			
			return { name: tagName, params }
			
		})
		
		const plugin = this.tags[processors[0].name]
		const kind = plugin?.kind ? plugin.kind : 'single' // SINGLE IS DEFAULT.
		
		return { kind, processors, name }
		
	}

	// Get value from the payload using the path
	_getValueFromPath(path, obj) {
		
		// isUndefined
		if(path === undefined){ return '' }
		
		// isArray
		if(Array.isArray(path)){ return path}
		
		// isObject
		if(typeof path === 'object'){ return path }
		
		// isString
		if (/^["'].*["']$/.test(path)) { return path.slice(1, -1) }
		
		// isNumber
		const maybeNumber = Number(path)
		if (!isNaN(maybeNumber) || path === '0') { return maybeNumber }
		
		// isBOOLEAN
		// Check if the path is a string before calling toLowerCase()
		if (typeof path === 'string') {
			if (path.toLowerCase() === 'true') {
				return true;
			} else if (path.toLowerCase() === 'false') {
				return false;
			}
		}
		
		// Default case: treat path as a string representing a property path
		const value = path.split(/[.[\]]+/).reduce((o, i) => (i && o ? o[i] : undefined), obj)
		
		// Return a shallow copy of the array if it's an array, or return the value directly
		return Array.isArray(value) ? [...value] : value
		
	}

}

/* c8 ignore start */
async function expressTextSynthEngine(filePath, options, callback) {
	
	if(!options._synth) {
		options._synth = {}
	}	
	
	// SET _SYNTH VALUES
	options._synth.isExpress = true
	options._synth.views = options.settings?.views
	options._synth.template = filePath

	// Merge the template with the provided data
	const mergedText = await options.textSynth.mergeFile(filePath, options)

	// Call the callback with the merged text
	callback(null, mergedText)
	
}
/* c8 ignore end */


// CREATE A NEW TEXTMERGER AND INIT.
async function createTextSynth(opt) {
	const textMerger = new TextMerger(opt);
	await textMerger.init()
	return textMerger;
}


export default createTextSynth; // textSynth
export { createTextSynth, expressTextSynthEngine };
