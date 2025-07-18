const { expect, mote, payload } = window.testing;

describe('uppercase plugin', () => {

	it('converts a lowercase string to uppercase', () => {
		const input = "[uppercase: lowercaseString]";
		expect(mote.process(input, payload)).to.equal('THIS IS A TEST');
	});

	it('converts a mixed case string to uppercase', () => {
		const input = "[uppercase: mixedcaseString]";
		expect(mote.process(input, payload)).to.equal('THIS IS A TEST');
	});

	it('returns the same string when already in uppercase', () => {
		const input = "[uppercase: allCapsString]";
		expect(mote.process(input, payload)).to.equal('THIS IS A TEST');
	});

	it('returns an empty string when provided with an empty string', () => {
		const input = "[uppercase: emptyString]";
		expect(mote.process(input, payload)).to.equal('');
	});

});