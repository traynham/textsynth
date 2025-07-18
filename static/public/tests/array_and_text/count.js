const { expect, mote, payload } = window.testing;

describe('count plugin', () => {

	it('counts the characters in a string', () => {
		const input = "[count: tenInString]";
		expect(mote.process(input, payload)).to.equal('10');
	});

	it('counts the number of elements in an array', () => {
		const input = "[count: itemArray]";
		expect(mote.process(input, payload)).to.equal('15');
	});

	it('counts the occurrences of a specified character in a string', () => {
		const input = "[count('t'): stringWithCharT]";
		expect(mote.process(input, payload)).to.equal('2');
	});

	it('Object should simply return object.', () => {
		const input = "[count: personObj]";
		expect(mote.process(input, payload)).to.equal('[object Object]');
	});

	it('counts the occurrences of a specified q in an array', () => {
		const input = "[count('a'): letterArray]";
		expect(mote.process(input, payload)).to.equal('2');
	});

	it('returns the input as is when it is not a string or array', () => {
		const input = "[count: numbers.intValue]";
		expect(mote.process(input, payload)).to.equal('123');
	});

	it('returns the input as is when it is not a string or array (literal)', () => {
		const input = "[count: 123456789]";
		expect(mote.process(input, payload)).to.equal('123456789');
	});

});