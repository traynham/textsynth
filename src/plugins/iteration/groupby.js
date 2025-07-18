export default {
	name: 'groupBy',
	kind: 'container',
	category: 'Iteration',

	processor(req) {
		
//		console.log('GROUP REQ::', req)
//		console.log('GROUP CARGO::', req.cargo)
		
		
//		console.log('USING HERE::', req.cargo.using)
		
		
//		const list = req.params?.[0];
//		const prop = req.cargo.using?.value;

		const list = req.cargo.using?.value
		const prop = req.cargo.using?.name
		let payload = {...req.payload}

		// console.log(
		// 	{
		// 		list, prop
		// 	}
		// )


		if (!Array.isArray(list)) {
			return `<pre>groupBy error: expected array, got ${typeof list}</pre>`;
		}
		if (!prop) {
			return `<pre>groupBy error: missing "using" key</pre>`;
		}
		

		const grouped = list.reduce((acc, item) => {
			const key = item?.[prop] || 'Uncategorized';
			if (!acc[key]) acc[key] = [];
			acc[key].push(item);
			return acc;
		}, {});

//		console.log('GROUPD::', grouped)
		
		
		// Transform into an array of { key, value } objects for easy [each]
		const output = Object.entries(grouped).map(([key, value]) => ({ key, value }));

//		console.log('OUTPUT::', output)

//		console.log('RAW::', req.content)
		
		payload.items = output

		//return req.engine.parse(req.content, { items: output, ...req.payload });
		
		return req.engine.process(req.contentRaw, payload )
		
		/*
		// Inject grouped array as `.` and render content
		return req.engine.render(req.contentRaw, { '.': output, ...req.payload });
		*/
	}
};