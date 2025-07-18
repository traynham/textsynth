const { expect, mote, payload } = window.testing;

describe('capitalize plugin', () => {

	it('capitalizes the first letter of a string', () => {
		const input = '[capitalize: stringWithCharT]'; // 'This is a test'
		expect(mote.process(input, payload)).to.equal('This is a test');
	});

	it('returns an empty string when provided with an empty string', () => {
		const input = '[capitalize: emptyString]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns the original content if it is not a string', () => {
		const input = '[capitalize: numbers.intValue]';
		expect(mote.process(input, payload)).to.equal('123');
	});

});