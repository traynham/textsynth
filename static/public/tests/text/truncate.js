const { expect, mote, payload } = window.testing;

describe('truncate plugin', () => {

	it('returns a string truncated to the specified length with a default suffix', () => {
		const input = "[truncate(10): longString]";
		expect(mote.process(input, payload)).to.equal('This is a ...');
	});

	it('returns a string truncated to the specified length with a custom suffix', () => {
		const input = "[truncate(10, '---'): longString]";
		expect(mote.process(input, payload)).to.equal('This is a ---');
	});

	it('returns the string as is when its length is less than the specified maximum length', () => {
		const input = "[truncate(50): shortString]";
		expect(mote.process(input, payload)).to.equal('Short string');
	});

});