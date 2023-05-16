const lowercase = {
	name: 'lowercase',
	description: 'Converts a string to lowercase.',
	example: '{{lowercase: property.path}}',
	usage: '{{lowercase: site.title}}',
	category: 'Text',
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.toLowerCase()
	}
}

export default lowercase