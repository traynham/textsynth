/*
	TODO:
	* Document title attr.
 */
export default {
	
	// Basic Information
	name: 'breadcrumbs',
	author: 'Jesse Traynham',
	category: 'Navigation',
	description: 'Generates breadcrumb navigation based on the current request path.',
	kind: 'single',
	syntax: '[breadcrumbs]',
	version: '1.0.0',

	// Content and Params details
	content: [], // No content needed as this works based on the request path


	// Examples for usage
	examples: [
		{
			payload: { _request: { path: '/home/about' } },
			input: '[breadcrumbs]',
			output: '<div style="--bs-breadcrumb-divider: \'›\';" aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="/home">home</a></li><li class="breadcrumb-item">about</li></ol></div>',
			note: 'This example shows how breadcrumb navigation is generated for the path "/home/about".'
		}
	],

	processor(req) {
		
		if(!req.payload._request){
			return 'breadcrumbs borked because _request is not present.'
		}
		
		let title = req.cargo.attributes.title
		let path = req.payload._request?.path
		let parts = path.replace(/^\/+/, '').split('/')
		let out = []
		
		if(parts.length === 1) return
		
		while (parts.length > 0) {
			
			let item = []
			
			item.push('<li class="breadcrumb-item">')
			
			if(path.match(/\//g).length === parts.length){
				if(title){
					item.push(title)
					parts.pop()
				} else {
					item.push(parts.pop())
				}
			} else {
				item.push(
					`<a href="/${parts.join('/')}">${parts.pop()}</a>`
				)
			}
			
			item.push('</li>')
			
			out.unshift(item.join(''))
			
		}
		
		let breadcrumb = [
			`<div style="--bs-breadcrumb-divider: '/';" aria-label="breadcrumb">`,
			`	<ol class="breadcrumb">`,
					out.join(''),
			'	</ol>',
			'</div>'
		]
		
		return breadcrumb.join('')
		
	}

}