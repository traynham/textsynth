const { expect, mote } = window.testing;

describe('runPlugin', () => {

	it('runs the uppercase plugin', () => {
		const result = mote.runPlugin('uppercase', {
			content: 'I want to be big.'
		});
		expect(result).to.equal('I WANT TO BE BIG.');
	});

/*
	it('returns error for a bogus plugin', () => {
		const result = mote.runPlugin('bogus', {
			content: 'I want to be big.'
		});
		expect(result).to.equal('Plugin "bogus" does not exist.');
	});
*/

});