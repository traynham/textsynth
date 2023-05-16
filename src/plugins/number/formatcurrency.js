export default {
	name: 'formatCurrency',
	description: 'Formats a number as currency, with customizable currency symbols, decimal separators, and thousand separators.',
	example: '{{formatCurrency("$", ".", ","): property.path}}',
	usage: '{{formatCurrency(symbol, decimalSeparator, thousandSeparator): property.path}}',
	category: 'Number',
	type: ['number'],
	processor(req){
		
		let [ symbol = '$', decimalSeparator = '.', thousandSeparator = ',' ] = req.params
		
		return (
			symbol +
			req.content.toFixed(2)
				.replace(/\d(?=(\d{3})+\.)/g, `$&${thousandSeparator}`)
				.replace('.', decimalSeparator)
		)
		
	}
}