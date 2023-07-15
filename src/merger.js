import fs from 'fs'
import path from 'path'
import process from 'process'

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import * as entities from 'entities'
import walk from 'walk-sync'


/**
 * Class for merging text using plugins and tags.
 */
class TextMerger {
	
	// PLUGINS/TAGS
	plugins = {}                  // BASE PLUGINS
	tags = {}                     // ALL TAGS INCLUDING ALIASES
	
	// DELIMITERS
	delimiters = {
		raw: {},                  // RAW START/END DELIMITERS
		esc: {},		          // HTML ESCAPED START/END DELIMITERS
		enc: {}		              // REGEX ESCAPED START/END DELIMITERS
	}
	
	opener_raw                     // OPEN TAG DELIMITER
	closer_raw                     // CLOSE TAG DELIMITER
	opener_enc                     // OPEN TAG DELIMITER ENCODED
	closer_enc                     // CLOSE TAG DELIMITER ENCODED
	
	// SETTINGS
	custom_plugins    = 'plugins'  // CUSTOM PLUGINS DIR FROM APP ROOT
	flush_comments    = true       // REMOVE COMMENTS BEFORE PROCESSING
	removeTabs        = true       // REMOVE LEADING TABS BEFORE PROCESSING
	showUndefinedTags = true       // SHOW/HIDE UNDEFINED TAGS
	verbose           = false      // ALLOW VERBOSE CONSOLE LOG CHATER
	views                          // VIEWS DIRECTORY
	
	/**
	 * Constructor for TextMerger class.
	 * @param {Object} options - Optional settings for the merger.
	 */
	constructor(options = {}) {
		
		this.setDelimiters(options)
		this.removeTabs = options.removeTabs !== false
		
		if(options.plugins){
			this.custom_plugins = options.plugins
		}
		
// NEED A MORE DESCRIPTIVE NAME!!!
		if(options.verbose){
			this.verbose = options.verbose
		}
		
		this.views = path.join(
			this._getAppRoot(), 
			options.views ? options.views : 'views'
		)
		
	}

	/**
	 * Initialize the TextMerger by loading default and custom plugins.
	 */
	async init() {
		
		// LOAD DEFAULT PLUGINS
		const __filename = fileURLToPath(import.meta.url) // PATH TO MERGER.JS
		const __dirname = dirname(__filename)
		const pluginDirectory = join(__dirname, 'plugins')
		await this._loadPluginsDir(pluginDirectory, 'Core')
		
		// LOAD CUSTOM PLUGINS
		let custom = path.join(this._getAppRoot(), this.custom_plugins)
		await this._loadPluginsDir(custom, 'Custom')
		
	}
	
	// !PUBLIC METHODS
	
	/**
	 * Register one or more aliases for a tag.
	 * @param {string} tag - Tag to be aliased.
	 * @param {Array|string} alias - Alias or aliases for the tag.
	 */
	alias = (tag, alias) => {
		if(!Array.isArray(alias)) { alias = [alias] }
		alias.forEach( alias => {
			this.tags[alias] = this.plugins[tag]
		})
	}

	/**
	 * Merge a template with a payload.
	 * @param {string} template - Template to be merged.
	 * @param {Object} payload - Payload to be used for merging.
	 * @returns {string} Merged template.
	 */
	merge(template, payload) {
		
		payload ??= { _synth: {} };
		payload._synth ??= {};
		payload._synth.views ??= this.views;
		
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
		return this.process(template, payload)
		
	}
	
	/**
	 * Merge a file with a payload.
	 * @param {string} filePath - Path of the file to be merged.
	 * @param {Object} payload - Payload to be used for merging.
	 * @returns {Promise<string>} Merged file.
	 */
	async mergeFile(filePath, payload) {
		
		payload ??= { _synth: {} };
		payload._synth ??= {};
		payload._synth.views ??= this.views;
		
		let thePath = path.join(payload._synth.views, filePath)
		
		// IF EXPRESS, FILEPATH IS ALREADY FULL PATH
		if(payload._synth.isExpress){
			thePath = filePath
		}
		
		if(!fs.existsSync(thePath)){
			let nicePath = thePath.replace(this._getAppRoot(), '')
			console.log(`ERROR: Merge path "${nicePath}" does not exist`)
			return `ERROR: Merge path "${nicePath}" does not exist`
		}
		
		// MERGE
		const template = fs.readFileSync(thePath, 'utf-8')
		return await this.merge(template, payload)
		
	}
	
	// CAN BE CALLED BY PLUGINS INSTEAD OF MERGE().
	
	/**
	 * Process a template using a given payload.
	 * 
	 * @param {string} template - The template to be processed. This should contain the structures that need to be replaced with payload values.
	 * @param {Object} payload - The object containing the data that will replace the structures in the template.
	 * 
	 * @returns {string} The processed template with all the structures replaced by the corresponding data from the payload.
	 */
	process(template, payload) {
		
		let processed
		
		// Process containers
		processed = this._processContainers(template, payload)
		
		// Process single merge tags
		processed = this._processSingles(processed, payload)
		
		return processed
		
	}
	
	/*
	pluginSettings(pluginName, settingName, value) {
		
		// Check if the plugin exists
		if (!this.tags[pluginName]) {
			//throw new Error(`Plugin ${pluginName} does not exist.`);
			console.log(`Plugin Settings: Plugin ${pluginName} does not exist.`)
			return
		}
	
		// If the plugin doesn't have a settings object, create one
		if (!this.tags[pluginName].settings) {
			this.tags[pluginName].settings = {};
		}
	
		// If a value is provided, set the setting
		if (value !== undefined) {
			this.tags[pluginName].settings[settingName] = value;
		}
	
		// Return the current setting value
		return this.tags[pluginName].settings[settingName];
	}
*/

	pluginSettings(pluginName, settingsObj) {
// SHOULD I RETURN AN ERROR
		// Check if the plugin exists
		if (!this.tags[pluginName]) {
			console.error(`Plugin ${pluginName} does not exist.`); 
			return;
		}
	
		// If the plugin doesn't have a settings object, create one
		if (!this.tags[pluginName].settings) {
			this.tags[pluginName].settings = {};
		}
	
		// If settingsObj is provided, merge the existing settings with the new ones
		if(settingsObj) {
			this.tags[pluginName].settings = { ...this.tags[pluginName].settings, ...settingsObj };
		}
	
		// Return the settings object
		return this.tags[pluginName].settings;
	}

	
	
	/**
	 * Executes a specific plugin with the provided arguments.
	 *
	 * @param {string} name - The name of the plugin to be run.
	 * @param {Object} args - The arguments to be passed to the plugin. It should include:
	 *  - content: The content to be processed by the plugin.
	 *  - params: The parameters required by the plugin for its operation.
	 *  - payload: The data that the plugin may require for its operation.
	 *
	 * @returns {*} The result of the plugin operation.
	 *
	 * @throws {Error} If the plugin specified by the "name" parameter does not exist.
	 */
	runPlugin(name, args) {
		
		// Check if the plugin exists
		if (this.tags[name]) {
			
			const req = {
				content: args.content,
				params: args.params,
				payload: args.payload,
				textMerger: this
			}
			
			// Run the plugin
			const result = this.plugins[name].processor(req)
			
			// Return the result
			return result
			
		} else {
			
			//throw new Error(`Plugin "${name}" does not exist.`);
			return `Plugin "${name}" does not exist.`
			
		}
	}
	
	/**
	 * Set delimiters for tags.
	 * @param {Object} options - Options for setting delimiters.
	 */
	setDelimiters(opt){
		
		let start = opt.opener || '['
		let end = opt.closer || ']'
		
		this.delimiters = {
			raw: {
				start: start,
				end:   end
			},
			esc: {
				start: entities.encodeHTML(start),
				end:   entities.encodeHTML(end)
			},
			enc: {
				start: start.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'),
				end:   end.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
			}
		}
		
		// TODO: PHASE OUT IN FAVOR OF THIS.DELIMITERS
		this.opener_raw = this.delimiters.raw.start
		this.closer_raw = this.delimiters.raw.end
		this.opener_enc = this.delimiters.enc.start
		this.closer_enc = this.delimiters.enc.end
		
	}
	
	/**
	 * Registers one or more plugins to be used by the instance.
	 *
	 * @param {...Object} plugins - The plugins to be registered. Each plugin should be an object with:
	 *  - name: The unique identifier for the plugin.
	 *  - aliases: (optional) Additional names by which the plugin can be accessed.
	 * Other properties of the plugin object depend on the specific plugin implementation.
	 *
	 * This method also assigns aliases for each plugin, if they are provided.
	 */
	use = (...plugins) => {
		plugins.forEach((plugin) => {
			this.plugins[plugin.name] = plugin
			this.tags[plugin.name] = plugin
			if(plugin.aliases){
				this.alias(plugin.name, plugin.aliases)
			}
		})
	}
	

	// !PRIVATE METHODS
	
	/**
	 * Get the application root directory.
	 * @returns {string} Path of the application root directory.
	 */
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
	
	/**
	 * Load all plugins from a directory.
	 * @param {string} directoryPath - Path of the directory to load plugins from.
	 * @param {string} type - Type of plugins being loaded.
	 */
	async _loadPluginsDir(pluginDirectory, suite) {
		
		if(!fs.existsSync(pluginDirectory)){
			if(this.verbose){ console.log(`Plugin directory does not exist: ${pluginDirectory}`) }
			return 'Plugin directory does not exist.'
		}
		
		const pluginFiles = walk(pluginDirectory, {
			globs: ['**/*.js'],
			ignore: ['**/_*'],
		})
		
		const pluginImports = pluginFiles.map((file) => import(join(pluginDirectory, file)))
		const plugins = await Promise.all(pluginImports)
		
		for (const pluginModule of plugins) {
			const plugin = pluginModule.default
			plugin.path = pluginDirectory.replace(this._getAppRoot(), '')
			plugin.suite = suite
			this.use(plugin)
		}
		
	}
	
	/**
	 * Process "single" merge tags in a given input string.
	 * 
	 * @param {string} input - The input string with merge tags.
	 * @param {Object} payload - The object containing data to replace merge tags.
	 *
	 * @returns {string} The input string with "single" merge tags replaced with corresponding values from the payload.
	 *
	 * This function operates by using a regular expression to identify single merge tags in the input string.
	 * It then fetches the corresponding value from the payload using a defined path.
	 * If a plugin is associated with the tag, it processes the content using the plugin.
	 * If the payload does not contain a value for the merge tag, it replaces the tag with an empty string.
	 */
	
	_processSingles(input, payload) {
		
		
		// Match unescaped TextSynth tags, ignoring surrounding whitespaces within the tags.
		const mergeTagRegex = new RegExp(
			`(?<!\\\\)${this.opener_enc}\\s*(.*?)\\s*(?<!\\\\)${this.closer_enc}`,
			'g'
		)
		
		return input.replace(mergeTagRegex, (match, mergeTag) => {
			
			const parseMergeTag = this._parseMergeTag(mergeTag, payload)
			let { processors, cargo } = parseMergeTag
			
			for (const { name, params } of processors) {
				
				const plugin = this.tags[name]
				
				// UNDEFINED PLUGINS...
				if (!plugin && this.showUndefinedTags) {
					return match
				} else if(!plugin &&!this.showUndefinedTags) {
					return ''
				}
				
				const request = {
					content: cargo?.params.length === 1 ? cargo?.params[0] : cargo,
					params: params,
					payload,
					textMerger: this
				}
				
				try {
					cargo = plugin.processor(request)
				} catch (e) {
					console.log(`Error running "${name}" plugin: ${e}`)
				}
				
			}
			
			return cargo
			
		})
		.replace(new RegExp(`\\\\(${this.opener_enc}|${this.closer_enc})`, 'g'), '$1'); // Removes preceding escape characters for [ and ]
		
	}

	/**
	 * Process "container" merge tags in a given input string.
	 * 
	 * @param {string} input - The input string with container merge tags.
	 * @param {Object} payload - The object containing data to replace merge tags.
	 *
	 * @returns {string} The input string with "container" merge tags replaced with corresponding values from the payload.
	 *
	 * This function operates by using a regular expression to identify container merge tags in the input string.
	 * It then fetches the corresponding value from the payload using a defined path.
	 * If a plugin is associated with the tag, it processes the content using the plugin.
	 * It recursively processes nested container tags after processing the outer container.
	 * If the payload does not contain a value for the merge tag, it replaces the tag with an empty string.
	 */
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
				const { processors, cargo } = this._parseMergeTag(mergeTag, payload)
				
				if(this.tags[processors[0]?.name]?.kind !== 'container'){
					continue
				}
				
				foundContainer = true;
				const closingTag = `${this.opener_raw}/${processors[0].name}${this.closer_raw}`;
				const closingIndex = this._findClosingTagIndex(output, match.index, processors[0].name)
				
				if (closingIndex === -1) {
					return `ERROR: The closing tag for "${processors[0]?.name}" is missing. Please ensure that all tags are properly closed.`
				}
				
				const content = output.substring(match.index + fullMatch.length, closingIndex)
				
				let processedContent = content; // Do not process nested containers at this point
				
				// Apply each processor (plugin) in order
				processors.forEach(({ name }) => {
					
					const plugin = this.tags[name]
					
					if (plugin) {
						
						const request = {
							cargo,
							content: processedContent,
							params: cargo?.params,
							payload,
							textMerger: this,
						}
						
						let response = ''
						
						try {
							response = plugin.processor(request)
						} catch (e) {
							console.log(`Error running "${name}" plugin: ${e}`)
						}
						
						processedContent = response
						
					}
				})
				
				// Process nested containers after processing the outer container
				processedContent = this._processContainers(processedContent, payload)
				
				// Replace the entire content between the opening and closing tags, including the closing tag
				output = output.slice(0, match.index) + processedContent + output.slice(closingIndex + closingTag.length)
				
				// Reset regex index due to output modifications
				mergeTagRegex.lastIndex = match.index + processedContent.length;
				
				break
				
			}
			
		} while (foundContainer)
		
		return output
		
	}

	/**
	 * Find the index of the closing tag corresponding to a given opening tag in a string.
	 * 
	 * @param {string} input - The input string that contains tags.
	 * @param {number} startIndex - The index in the string to start searching from.
	 * @param {string} tagName - The name of the tag to find the closing index for.
	 * 
	 * @returns {number} The index of the closing tag in the input string.
	 *
	 * This function keeps track of nested tags of the same type by incrementing a count for each opening tag found 
	 * and decrementing for each closing tag. When the count reaches zero, the index of the closing tag is returned.
	 * If no corresponding closing tag is found an error is thrown.
	 */
	_findClosingTagIndex(input, startIndex, tagName) {
		
		const openingTagPattern = new RegExp(`${this.opener_enc}${tagName}`, 'g')
		
		const closingTagPattern = new RegExp(`${this.opener_enc}\\/${tagName}${this.closer_enc}`, 'g')
		
		let index = startIndex
		let count = 1
		
		while (count > 0) {
			
			const openingIndex = this._findNextIndex(input, openingTagPattern, index + this.opener_raw.length + tagName.length)
			const closingIndex = this._findNextIndex(input, closingTagPattern, index + this.opener_raw.length + tagName.length + 1) // +1 for the "/"
			
			if (closingIndex === -1) {
				return -1
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
	
	/**
	 * Finds the index of the next match for a specified pattern in a string.
	 * 
	 * @param {string} input - The input string to search in.
	 * @param {RegExp} pattern - The pattern to match in the input string.
	 * @param {number} startIndex - The index from which to start the search.
	 * 
	 * @returns {number} The index of the next match for the specified pattern, or -1 if no match is found.
	 * 
	 * This function is typically used to search for patterns in large text data. It resets the 
	 * lastIndex property of the RegExp object to the provided startIndex before executing the search.
	 */
	_findNextIndex(input, pattern, startIndex) {
		pattern.lastIndex = startIndex
		const match = pattern.exec(input)
		return match ? match.index : -1
	}

	/**
	 * Parses a merge tag string and returns its components and details.
	 * 
	 * @param {string} mergeTag - The merge tag string to parse.
	 * 
	 * @returns {object} An object containing the details of the merge tag. This object has the following properties:
	 *   - kind: The type of merge tag (e.g., 'single', 'container').
	 *   - processors: An array of objects, each containing the name and parameters of a processor used in the merge tag.
	 *   - name: The name of the merge tag.
	 * 
	 * A merge tag string typically has a form like 'tagParam1: tagParam2'. This function splits such a string into its 
	 * individual components and provides details about each component. If the merge tag string is associated with a 
	 * known tag in this.tags, it will be identified as a 'container'. Otherwise, it will be treated as a 'single' merge tag.
	 * 
	 * The processors of the merge tag are also parsed and their names and parameters are returned in the 'processors' property.
	 */
	_parseMergeTag(mergeTag, payload) {
		
		// TAG SHAPE: Colon after name is optional, space is not.
		let [tags, cargoStr] = mergeTag.split(/(?<!\([^)]*):? (.+)/).map((part) => part.trim())
		
		let cargo2 = this._gather_cargo(cargoStr, payload)
		
		// IF CONTAINER TAG WITH NO PARAMS OR CONTENT.
		if (this.tags[mergeTag]?.kind === 'container') {
			return { kind: 'container', processors: [{name: mergeTag, params: []}], name: mergeTag }
		}
		
		// If there are no processors, treat it as a simple merge tag
		
		if (!cargoStr) {
			return { kind: 'single', processors: [], name: tags, cargo: this._getValueFromPath(tags.trim(), payload) }
		}
		
//		let cargo = cargoStr.split(/,(?=(?:[^"']*["'][^"']*["'])*[^"']*$)/)
//				.map(cont => this._getValueFromPath(cont.trim(), payload))
		
		const tagParamPairs = tags.match(/[\w]+(\([^)]*\))?/g)
		const processors = tagParamPairs.map((tagParamPair) => {
			
			const [tagName, ...paramsStr] = tagParamPair.split(/[()]/).filter((part) => part !== '')
			
			let params = paramsStr.length
				? paramsStr[0]
					.split(/,(?=(?:[^"']*["'][^"']*["'])*[^"']*$)/)
					.map((param) => {
						//param = param.trim().replace(/^["']+|["']+$/g, '');
						if (param.toLowerCase() === 'true') return true;
						if (param.toLowerCase() === 'false') return false;
						return param;
					})
				: [];
		
			params = params.map(param => this._getValueFromPath(param, payload))
			
			return { name: tagName, params }
			
		})
		
		let out = { 
			processors, 
			cargo: cargo2,
			cargo2
		}
		
		return out
		
	}

	/**
	 * This method is responsible for parsing a given string of arguments into an object.
	 * The object contains the attributes, classes, id, and other values found in the arguments.
	 *
	 * @param {string} args - A string of arguments to parse.
	 * @returns {Object} An object with keys: attributes, classes, id, otherValues. Each key is associated with an array or a string of extracted values.
	 */
	_gather_cargo(args, payload) {
		
		if(!args) return
		
		// Split the arguments string into an array of arguments. 
		// Matches the attribute pattern (key="value" or key='value'), space-separated values, or comma-separated values.
		let chunks = args.match(/(["']?\w+["']?\s*=\s*(?:["'][^"']*["']|\S+)|"[^"]+"|'[^']+'|[^, ]+)/g) // || []
		
		// Initializing the cargo object that will store the parsed values
		let cargo = {
			attributes: {},
			classes: [],
			id: '',
			values: []
		}
		
//		console.log('CHUNKS::', chunks)
		
		// Looping through each argument chunk
		chunks.forEach(arg => {
			
			arg = arg.trim()
			
			// Attempt to match attribute pattern (key="value" or key='value')
			const attrMatch = arg.match(/^["']?(\w+)["']? *= *["']?([^"']+)["']?$/);
			
			if (attrMatch) {
				// If the attribute pattern is matched, remove the quotes and trim the spaces of the attribute value
				const [, key, value] = attrMatch
				cargo.attributes[key] = value.trim()
			} else if (arg.startsWith('.')) {
				// If the argument starts with a dot, it's a class. Remove the dot and add it to the classes array.
				cargo.classes.push(arg.slice(1))
			} else if (arg.startsWith('#')) {
				// If the argument starts with a hash, it's an ID. Remove the hash and assign the ID.
				cargo.id = arg.slice(1)
			} else {
				// If the argument does not match any of the above conditions, it's considered an "other value". Remove any surrounding quotes and add it to the otherValues array.
				//cargo.values.push(arg.trim().replace(/^['"]|['"]$/g, ''))
				cargo.values.push(arg.trim()) //.replace(/^['"]|['"]$/g, ''))
			}
			
		})
		
		
		cargo.params = cargo.values.map(param => {
			return this._getValueFromPath(param, payload) // || param
		})
		
		// Return the populated cargo object
		return cargo
		
	}

	/**
	 * Retrieves a value from an object based on a given path.
	 *
	 * @param {(string|Array|Object)} path - The path to the desired value. This can be a string representing a property path, or an array, or an object.
	 * @param {Object} obj - The object from which to retrieve the value.
	 * 
	 * @returns {(string|Array|Object|number|boolean|undefined)} The value found at the given path within the object. If the path is an array or an object, it is returned as is. If the path is a string representing a boolean or a number, the function will attempt to parse and return it as the corresponding primitive type. If the path is a string, it is assumed to be a property path, and the function will attempt to retrieve the corresponding value within the object.
	 *
	 * This function supports complex nested paths in the form of string-based property paths, e.g., 'prop1.prop2[0].prop3'.
	 */
	_getValueFromPath(path, object) {
		
		// IF LITERAL STRING RETURN WITHOUT QUOTES.
		if (typeof path === 'string' && /^["'].*["']$/.test(path.trim() )) { 
			
			let destrung = path.trim().slice(1, -1)
			
			if (destrung.toLowerCase() === 'true') {
				return true;
			} else if (destrung.toLowerCase() === 'false') {
				return false;
			}
			
			return path.trim().slice(1, -1)
		}
		
		// isNumber
		if (!isNaN(+path) || path === '0') {
			return +path
		}
		
		// Default case: treat path as a string representing a property path
		const value = path.split('.').reduce((obj, i) => (obj?.[i]), object)
		
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
