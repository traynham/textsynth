const { expect, mote, payload } = window.testing;

describe('unescape_html plugin', () => {

	it('converts escaped HTML entities to their original characters', () => {
		const input = "[unescape_html: escHtmlContent]";
		const expected = payload.unEscContent;
		expect(mote.process(input, payload)).to.equal(expected);
	});

	it('returns the same string when there are no HTML entities', () => {
		const input = "[unescape_html: unEscContent]";
		expect(mote.process(input, payload)).to.equal(payload.unEscContent);
	});

	it('returns an empty string when the content is null', () => {
		const input = "[unescape_html: nullValue]";
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns an empty string when the content is undefined', () => {
		const input = "[unescape_html: undefinedValue]";
		expect(mote.process(input, payload)).to.equal('');
	});

});