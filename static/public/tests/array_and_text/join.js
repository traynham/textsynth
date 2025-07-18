const { expect, mote, payload } = window.testing;

describe('join plugin', () => {

	it('joins array elements with specified delimiter', () => {
		const input = "[join('-'): site.items]";
		expect(mote.process(input, payload)).to.equal('1-2-3');
	});

	it('joins array elements with comma and space as delimiter', () => {
		const input = "[join(', '): fruitList]";
		expect(mote.process(input, payload)).to.equal('Apple, Orange, Grape');
	});

	it('joins array elements with default delimiter', () => {
		const input = "[join: fruitList]";
		expect(mote.process(input, payload)).to.equal('Apple, Orange, Grape');
	});

	it('returns strings as is', () => {
		const input = "[join: 'Return strings']";
		expect(mote.process(input, payload)).to.equal('Return strings');
	});

});