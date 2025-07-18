import { parse } from './grammar.js';
import { plugins } from './plugins.js';

class Engine {
	
	env = {}

	options = {
	
		delimiters: {
			default: ['[', ']'],                          // DEFAULT DELIMITERS
//			default: ['{{', '}}'],                          // DEFAULT DELIMITERS
			raw: {},                                      // RAW START/END DELIMITERS
			esc: {},		                              // HTML ESCAPED START/END DELIMITERS
			enc: {}		                                  // REGEX ESCAPED START/END DELIMITERS
		},
		
	}
	
	constructor(options = {}) {
		this.plugins = plugins
		this.tags = plugins
		this.parse = parse
		//this.options = {...options}
		
		this.setDelimiters()
	}

	async initializePlugins(plugins) {
		
		// IF NODE...
		if (typeof window === 'undefined') {
			for (const key in plugins) {
				const plugin = plugins[key]
				if (typeof plugin.onStartup === 'function') {
					await plugin.onStartup()
				}
			}
			return
		}
		
		// IF BROWSER...
		const stylesToLoad = new Set()
		const scriptsToLoad = new Set()
		
		for (const key in plugins) {
			
			const plugin = plugins[key]
			
			if (plugin.browserStyles) {
				for (const href of plugin.browserStyles) {
					stylesToLoad.add(href)
				}
			}
			
			if (plugin.browserScripts) {
				for (const src of plugin.browserScripts) {
					scriptsToLoad.add(src)
				}
			}
		}
		
		// LOAD STYLES
		const head = document.head
		let firstStyle = head.querySelector('style, link[rel="stylesheet"]')
		
		for (const href of stylesToLoad) {
			
//			if (!document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
			
				const link = document.createElement('link')
				link.rel = 'stylesheet'
				link.href = href
				if (firstStyle) {
					head.insertBefore(link, firstStyle)
				} else {
					head.appendChild(link)
				}
			
//			}
		}
		
		// LOAD SCRIPTS
		const scriptPromises = Array.from(scriptsToLoad).map(src => {
			
			if (document.querySelector(`script[src="${src}"]`)) {
				return Promise.resolve()
			}
			
			return new Promise((resolve, reject) => {
				const script = document.createElement('script')
				script.src = src
				script.async = false
				script.onload = resolve
				script.onerror = reject
				document.head.appendChild(script)
			})
			
		})
		
		await Promise.all(scriptPromises)
		
		// CALL EACH PLUGIN ONSTART()
		for (const key in plugins) {
			const plugin = plugins[key]
			if (typeof plugin.onStartup === 'function') {
				await plugin.onStartup()
			}
		}
	}

	detectEnvironment() {
		// If 'window' is undefined, we're in Node; else, browser.
		if (typeof window === 'undefined') {
			this.env.platform = 'node'
		} else {
			this.env.platform = 'browser'
		}
	}
	
	async init() {
		this.detectEnvironment()
		await this.initializePlugins(this.plugins)
	}
	
	process(template, payload = {}, options = {}) {
		
		let out = []
		const opts = {
			...options,
			payload,
			tags: this.plugins,
			engine: this
		}
		
		const parsed = this.parse(template, opts)
		
		parsed.forEach(item => {
			out.push(item.render)
		})
		
//		this.setDelimiters()
		
		let result = out.join('')
		
		return result
		
	}
	
	renderTo(selector, template, payload) {
		const html = this.process(template, payload)
		const node = typeof selector === 'string' ? document.querySelector(selector) : selector
		node.innerHTML = html
		this.onRender(node)
		return node
	}
	
	// TRIGGER PLUGIN ONRENDER() SCRIPTS
	onRender(){
		
		for (const key in this.plugins) {
			const plugin = this.plugins[key]
			if (
				plugin.variant === 'original' &&
				typeof plugin.onRender === 'function'
			) {
				plugin.onRender()
			}
		}
		
	}
	
	setDelimiters(){
		
		let [ start, end ] = this.options.delimiters.default
		let del = this.options.delimiters
		
		del.raw = { start: start, end: end }
		del.enc = { start: this.encodeAsHtmlEntity(start), end: this.encodeAsHtmlEntity(end) }
		del.esc = {
			start: start.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'),
			end:   end.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
		}
		
	}
	
	encodeAsHtmlEntity(str) {
		return Array.from(str, ch => `&#${ch.codePointAt(0)};`).join('');
	}

/*
	decodeHtmlEntity(str) {
		return str.replace(/&#(\d+);/g, (match, dec) =>
			String.fromCodePoint(Number(dec))
		).replace(/&#x([0-9a-fA-F]+);/g, (match, hex) =>
			String.fromCodePoint(parseInt(hex, 16))
		);
	}
*/

	runPlugin(name, args) {
		
		const plugin = this.tags[name]
		
		if (!plugin) {
			throw new Error(`Plugin "${name}" does not exist.`)
		}
		
		const req = {
			cargo: args?.cargo,
			content: args?.content,
			params: args?.params,
			payload: args?.payload,
			engine: this
		}
		
		return plugin.processor(req)
		
	}
	
	use(pluginOrArray) {
		// Accept a single plugin or an array of plugins
		const plugins = Array.isArray(pluginOrArray) ? pluginOrArray : [pluginOrArray];
	
		for (const plugin of plugins) {
			if (!plugin || !plugin.name) {
				console.warn("Skipped plugin: missing 'name' property.", plugin);
				continue;
			}
	
			// Add original plugin (variant = 'original')
			const original = { ...plugin, variant: 'original' };
			this.plugins[plugin.name] = original;
			this.tags[plugin.name] = original;
	
			// Set up aliases if provided
			if (Array.isArray(plugin.aliases)) {
				for (const alias of plugin.aliases) {
					const aliasPlugin = { ...plugin, name: alias, alias, variant: 'alias' };
					this.plugins[alias] = aliasPlugin;
					this.tags[alias] = aliasPlugin;
				}
			}
		}
	
		return this; // For chaining
	}
	
	// CLIENT SITE
	fetchSync(path) {
		
		const xhr = new XMLHttpRequest()
		xhr.open('GET', path, false) // false = synchronous
		xhr.send(null)
		
		if (xhr.status === 200) {
			return xhr.responseText
		}
		
		return `ERROR: Failed to load ${path}: ${xhr.status}`
		
	}
	
	removeComments(text) {
		
//		if(!this.options.flush_comments){ return text }
		
		// Remove single-line comments
		text = text.replace(/(?<!:)(\/\/[^\n]*)/g, '')
		
		// Remove multi-line C-style comments
		text = text.replace(/\/\*[\s\S]*?\*\//g, '')
		
		// Remove multi-line HTML comments
		text = text.replace(/<!--[\s\S]*?-->/g, '')
		
		return text
		
	}
	
	removeLeadingTabs(text) {
		if(!this.options.removeTabs){ return text }
		return text.replace(/^\t+/gm, '')
	}
	
	
	
}


// Instantiate and initialize
const engine = new Engine()


// RUN .INIT()
await engine.init()

export default engine

// EXPOST NAMED ENGINE CLASS
export { Engine }
