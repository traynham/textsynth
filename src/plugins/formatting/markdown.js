import markdown from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import prism from 'markdown-it-prism';

// Create a MarkdownIt instance and use the plugins
const md = new markdown({ html: true })
  .use(markdownItAttrs)
  .use(prism);


export default {
	
	// Basic Information
	name: 'markdown',
	author: 'Jesse Traynham',
	category: 'Formatting',
	description: 'Renders markdown content into HTML with additional support for attributes and Prism syntax highlighting.',
	kind: 'container',
	syntax: '[markdown] Your markdown text here [/markdown]',
	version: '1.0.0',
	
	// Content and Params details
	content: [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'Markdown content to be rendered into HTML.'
		}
	],
	
	// Examples for usage
	examples: [
		{
			payload: "{ }",
			input: '[markdown]# Header \n **Bold Text** [/markdown]',
			output: '<h1>Header</h1> <p><strong>Bold Text</strong></p>',
			note: 'Markdown content is converted to HTML.'
		},
	],
	processor(req) {
		
		// PROCESS
		let output = req.textMerger.process(req.content, req.payload)
		
		// UNESCAPE
		output = req.textMerger.runPlugin('unescape_delimiters', { content: output })
		
		// RENDER MD
		output = md.render(output)
		
		// ESCAPE
		output = req.textMerger.runPlugin('escape_delimiters', { content: output })
		
		return output
		
	}
}