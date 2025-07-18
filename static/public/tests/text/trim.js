const { expect, mote, payload } = window.testing;

describe('trim plugin', () => {

	it('returns a string with leading and trailing whitespace removed', () => {
		const input = "[trim: stringWithCharT]";
		const localPayload = { stringWithCharT: "  this is a test string  " };
		expect(mote.process(input, localPayload)).to.equal('this is a test string');
	});

	it('returns the original value as a string when trimming a non-string', () => {
		const input = "[trim: numbers.intValue]";
		expect(mote.process(input, payload)).to.equal('123');
	});

});