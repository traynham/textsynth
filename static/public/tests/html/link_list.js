const { expect, mote } = window.testing;

const payload = {
	linkObject: {
		"Google": "https://www.google.com",
		"Facebook": "https://www.facebook.com",
		"Twitter": "https://www.twitter.com"
	},
	null: null,
	undefined: undefined
}

describe('linkList plugin', () => {

	it('converts object to a list of HTML links', () => {
		const input = "[linkList: linkObject]";
		const expectedOutput =
			'<ul>' +
				'<li><a href="https://www.google.com">Google</a></li>' +
				'<li><a href="https://www.facebook.com">Facebook</a></li>' +
				'<li><a href="https://www.twitter.com">Twitter</a></li>' +
			'</ul>';
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('returns an empty list when the content is null', () => {
		const input = "[linkList: nullValue]";
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns an empty list when the content is undefined', () => {
		const input = "[linkList: undefined]";
		expect(mote.process(input, payload)).to.equal('');
	});
});
