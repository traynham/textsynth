import markdown from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import prism from 'markdown-it-prism';

// Create a MarkdownIt instance and use the plugins
const md = new markdown({ html: true })
  .use(markdownItAttrs)
  .use(prism);


export default {
	name: 'markdown',
	description: 'Renders markdown content into HTML with additional support for attributes and Prism syntax highlighting.',
	example: '[markdown]# Header \n **Bold Text** [/markdown]',
	aliases: 'md',
	usage: '',
	category: 'Formatting',
	kind: 'container',
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