const { expect, mote, payload } = window.testing;

describe('length plugin', () => {

	it('returns the length of a string', () => {
		const input = "[length: tenInString]";
		expect(mote.process(input, payload)).to.equal('10');
	});

	it('returns the number of elements in an array', () => {
		const input = "[length: itemArray]";
		expect(mote.process(input, payload)).to.equal('15');
	});

	it('returns 0 when the string is empty', () => {
		const input = "[length: emptyString]";
		expect(mote.process(input, payload)).to.equal('0');
	});

	it('returns 0 when the array is empty', () => {
		const input = "[length: emptyArray]";
		expect(mote.process(input, payload)).to.equal('0');
	});

});