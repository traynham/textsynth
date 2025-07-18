const { expect, mote, payload } = window.testing;

describe('titlecase plugin', () => {

	it('returns a string with each word capitalized', () => {
		const input = "[titlecase: stringWithCharT]";
		expect(mote.process(input, { ...payload, stringWithCharT: 'this is a test string' })).to.equal('This Is A Test String');
	});

	it('returns the original value as a string when applying titlecase to a non-string', () => {
		const input = "[titlecase: numbers.intValue]";
		expect(mote.process(input, payload)).to.equal('123');
	});

});