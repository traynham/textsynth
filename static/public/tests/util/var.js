const { expect, mote, payload } = window.testing;

describe('var plugin', () => {

	it('sets a var and makes it available in the template', () => {
		const input = "[var: stuff = 'blah'] Stuff: [stuff]";
		const result = mote.process(input, payload);
		expect(result.trim()).to.equal('Stuff: blah');
	});

	it('returns an error if no assignment is passed', () => {
		const input = "[var: stuff ]";
		const result = mote.process(input, payload);
		expect(result.trim()).to.equal('ERROR: \"var\" tag requires a valid asignment parameter.');
	});

});

describe('plat plugin', () => {

	it('returns plat', () => {
		const input = "[plat]";
		const result = mote.process(input, payload);
		console.log('PLAT RESULT::', result)
		expect(result.trim()).to.equal('browser');
	});

});