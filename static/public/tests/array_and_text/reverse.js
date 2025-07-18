const { expect, mote, payload } = window.testing;

describe('reverse plugin', () => {

	it('reverses a string', () => {
		const input = "[reverse: site.title]";
		expect(mote.process(input, payload)).to.equal('dlroW olleH');
	});

	it('reverses the order of elements in an array', () => {
		const input = "[reverse: numbersArr5]";
		expect(mote.process(input, payload)).to.equal('5,4,3,2,1');
	});

	it('returns an empty string when the string is empty', () => {
		const input = "[reverse: '']";
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns an empty string when the array is empty', () => {
		const input = "[reverse: emptyArray]";
		expect(mote.process(input, payload)).to.equal('');
	});

});