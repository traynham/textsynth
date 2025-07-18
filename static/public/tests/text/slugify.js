const { expect, mote, payload } = window.testing;

describe('slugify plugin', () => {

	it('converts a string into a URL-friendly slug', () => {
		// payload.title = 'This is a Test Title'
		const input = '[slugify: title]';
		expect(mote.process(input, { ...payload, title: 'This is a Test Title' })).to.equal('this-is-a-test-title');
	});

	it('removes special characters from the input string', () => {
		// payload.titleWithSpecialChars = 'This is a !@# Test Title'
		const input = '[slugify: titleWithSpecialChars]';
		expect(mote.process(input, { ...payload, titleWithSpecialChars: 'This is a !@# Test Title' })).to.equal('this-is-a-test-title');
	});

	it('returns the original value as string when slugifying a non-string', () => {
		const input = '[slugify: numbers.intValue]'; // using the number field in your canonical payload
		expect(mote.process(input, payload)).to.equal('123');
	});

});