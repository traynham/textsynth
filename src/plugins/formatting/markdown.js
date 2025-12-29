export default {
	
	name: 'markdown',
	aliases: ['md'],
	author: 'Jesse Traynham',
	browserStyles: [
		'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css'
	],
	browserScripts: [
		'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js',
		'https://cdn.jsdelivr.net/npm/markdown-it-attrs@4.3.1/markdown-it-attrs.browser.min.js',
		'https://cdn.jsdelivr.net/npm/prismjs@latest/prism.min.js'
	],
	category: 'Formatting',
	description: 'Renders markdown content into HTML with additional support for attributes and Prism syntax highlighting.',
	kind: 'container',
	version: '1.0.0',
	
	docs: {
		flags: {'keepTabs': 'By default, tabs will be removed. Use this flag to leave tabs in.'},
		content: [
			{
				name: 'content',
				type: 'string',
				required: true,
				description: 'Markdown content to be rendered into HTML.'
			}
		],
		examples: [
			{
				payload: "{ }",
				template: '[markdown]# Header <br> **Bold Text** [/markdown]',
				output: '<h1>Header</h1> <p><strong>Bold Text</strong></p>',
				note: 'Markdown content is converted to HTML.'
			},
		],
		syntax: '[markdown] Your **markdown** text here [/markdown]',
	},
	

	// Private plugin state and helpers (encapsulated)
	_md: null,
	
	async onStartup() {
		
		const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
			
		if (isNode) {
			
			const { default: MarkdownIt } = await import('markdown-it');
			const { default: markdownItAttrs } = await import('markdown-it-attrs');
			const { default: prism } = await import('markdown-it-prism');
			
			this._md = await MarkdownIt({ html: true })
				.use(markdownItAttrs)
				.use(prism);
			
		} else {
			
			// Will be called after all scripts are loaded!
			this._md = window.markdownit()
				.use(window.markdownItAttrs)
			
		}

	},
	
	onRender() {
	
		if (window.Prism && typeof window.Prism.highlightAll === 'function') {
			window.Prism.highlightAll();
		}
		
	},

	processor(req) {
		
		if(!req.cargo?.flags?.includes('keepTabs')){
			req.content = req.content.replace(/\t/g, '')
		}
		
		let output = req.engine.process(req.content, req.payload)
		
		output = this._md.render(output)
		
		return output;
		
	}
	
}