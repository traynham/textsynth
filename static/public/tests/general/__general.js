const { expect, mote } = window.testing;


describe('MOTE general', () => {

	it('check default delimiters', () => {
		const moteDefault = mote; // assume already initialized with defaults
		expect(moteDefault.options.delimiters.raw.start).to.equal('[');
	});
/*
	it('check custom plugin path value', () => {
		// If your browser-side mote supports constructor options, use:
		// const moteCustom = new Mote({ plugins: '/my_plugins' });
		// Otherwise, skip or mock this test.
		const moteCustom = mote; // If no re-init, this will be the same as mote
		expect(moteCustom.options.paths.plugins).to.equal('/my_plugins');
	});
	it('Throw validation on validateURL() method', () => {
		const result = mote.validateURL('www.bogus.com');
		expect(result.err.code).to.equal(400);
	});

	it('throw error using mismatched tags', () => {
		const input = '[div]This is the div content[/p]';
		const expectedOutput = 'Error: CONTAINER › Mismatched tags div and p';
		console.log('EXPECTED::', mote.process(input, {}))
		expect(mote.process(input, {})).to.equal(expectedOutput);
	});
*/

});
