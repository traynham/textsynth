const { expect, mote, payload } = window.testing;

describe('repeat plugin', () => {

	it('repeats a string a specified number of times', () => {
		const input = "[repeat(3): text]"; // payload.text = 'boom'
		expect(mote.process(input, payload)).to.equal('boomboomboom');
	});

	it('returns an empty string when repeating an empty string', () => {
		const input = "[repeat(3): emptyString]";
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns the original value as string when repeating a non-string', () => {
		const input = "[repeat(3): numbers.intValue]";
		expect(mote.process(input, payload)).to.equal('123');
	});

});