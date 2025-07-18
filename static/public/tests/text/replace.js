const { expect, mote, payload } = window.testing;

describe('replace plugin', () => {

	it('replaces all occurrences of a search string with a replacement string', () => {
		const input = "[replace(' ', '-'): stringWithCharT]";
		expect(mote.process(input, { ...payload, stringWithCharT: 'This is a test' })).to.equal('This-is-a-test');
	});

	it('handles special characters in the replacement string', () => {
		const input = "[replace(' ', '!'): stringWithCharT]";
		expect(mote.process(input, { ...payload, stringWithCharT: 'This is a test' })).to.equal('This!is!a!test');
	});

	it('replaces special characters in the input string', () => {
		const input = "[replace('!@#', '---'): stringWithSpecialChars]";
		expect(mote.process(input, { ...payload, stringWithSpecialChars: 'This is a !@# test' })).to.equal('This is a --- test');
	});

	it('returns the original value as a string when replacing a non-string', () => {
		const input = "[replace(' ', '-'): numbers.intValue]";
		expect(mote.process(input, payload)).to.equal('123');
	});

});