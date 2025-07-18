const { expect, mote, payload } = window.testing;

describe('random plugin', () => {

	it('returns a random element from an array', () => {
		const input = "[random: fruitList]";
		const possible = payload.fruitList;
		const result = mote.process(input, payload);
		expect(possible).to.include(result);
	});

	it('returns a random character from a string', () => {
		const input = "[random: tenInString]";
		const possible = payload.tenInString.split('');
		const result = mote.process(input, payload);
		expect(possible).to.include(result);
	});

	it('returns an empty string when the input is empty', () => {
		const input = "[random: emptyString]";
		const result = mote.process(input, payload);
		expect(result).to.equal('');
	});

	it('returns undefined or empty when given an empty array', () => {
		const input = "[random: emptyArray]";
		const result = mote.process(input, payload);
		// Acceptable: '' (string) or undefined, depending on plugin design
		expect(result === '' || result === undefined).to.be.true;
	});

});