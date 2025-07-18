export default
[
	{
		name: 'echo',
		author: 'Jesse Traynham',
		version: '1.0.0',
		description: 'Repeat after me',
		syntax: '[echo value]',
		category: 'Things',
		kind: 'single',
		processor(req) {
			
			return req.content
			
		}
	},
	
	{
		name: 'double',
		author: 'Jesse Traynham',
		version: '1.0.0',
		description: 'duplicate me',
		syntax: '[double value]',
		category: 'Things',
		kind: 'single',
		processor(req) {
			
			return req.content + ' ' + req.content
			
		}
	}
]