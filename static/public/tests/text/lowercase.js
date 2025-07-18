const { expect, mote, payload } = window.testing;

describe('lowercase plugin', () => {

	it('converts a string to lowercase', () => {
		const input = '[lowercase: stringWithCharT]'; // 'This is a test'
		expect(mote.process(input, payload)).to.equal('this is a test');
	});

	it('returns an empty string when provided with an empty string', () => {
		const input = '[lowercase: emptyString]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns the original content if it is not a string', () => {
		const input = '[lowercase: numbers.intValue]'; // 123
		expect(mote.process(input, payload)).to.equal('123');
	});

});