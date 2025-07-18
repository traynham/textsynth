const { expect, mote, payload } = window.testing;

describe('substring plugin', () => {

	it('returns a substring from the specified start and end indices', () => {
		expect(mote.process("[substring(0, 4): stringWithCharT]", payload)).to.equal('This');
	});

	it('returns the full string when params are both zero', () => {
		expect(mote.process("[substring(0, 0): stringWithCharT]", payload)).to.equal('This is a test');
	});

	it('returns the full string when params are not present', () => {
		expect(mote.process("[substring(2): stringWithCharT]", payload)).to.equal('This is a test');
	});

	it('returns the full string when params are empty', () => {
		expect(mote.process("[substring(): stringWithCharT]", payload)).to.equal('This is a test');
	});

	it('returns the original value as a string when applying substring to a non-string', () => {
		expect(mote.process("[substring(0, 4): numbers.intValue]", payload)).to.equal('123');
	});

});