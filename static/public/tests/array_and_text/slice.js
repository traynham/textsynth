const { expect, mote, payload } = window.testing;

describe('slice plugin', () => {

	it('extracts a section of a string', () => {
		const input = "[slice(0,5): site.title]";
		expect(mote.process(input, payload)).to.equal('Hello');
	});

	it('extracts a section of an array', () => {
		const input = "[slice(4,9): numbersArr10]";
		expect(mote.process(input, payload)).to.equal('5,6,7,8,9');
	});

	it('returns an empty string when the string is empty', () => {
		const input = "[slice(0,2): '']";
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns an empty string when the array is empty', () => {
		const input = "[slice(0,2): emptyArray]";
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns full array when end index is larger than array length', () => {
		const input = "[slice(0,20): numbersArr10]";
		expect(mote.process(input, payload)).to.equal('1,2,3,4,5,6,7,8,9,10');
	});

	it('returns full string when end index is larger than string length', () => {
		const input = "[slice(0,20): site.title]";
		expect(mote.process(input, payload)).to.equal('Hello World');
	});
});