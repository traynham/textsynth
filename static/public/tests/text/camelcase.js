const { expect, mote, payload } = window.testing;

describe('camelCase plugin', () => {
	
	it('converts a string to camelCase', () => {
		const input = "[camelcase: stringWithCharT]";
		expect(mote.process(input, payload)).to.equal('thisIsATest');
	});

	it('returns the original content if it is not a string', () => {
		const input = "[camelcase: numbers.intValue]";
		expect(mote.process(input, payload)).to.equal('123');
	});

});