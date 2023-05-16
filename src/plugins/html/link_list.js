export default {
	name: 'linkList',
	description: 'Generates an HTML list of links from an object with name-url pairs.',
	example: '{{linkList: property.path}}',
	usage: '{{linkList: site.sidebar}}',
	category: 'HTML',
	type: ['object'],
	processor(req) {
		
		const listItems = Object.entries(req.content)
			.map(([name, url]) => `<li><a href="${url}">${name}</a></li>`)
			.join('');
			
		return `<ul>${listItems}</ul>`;
		
	}
}
