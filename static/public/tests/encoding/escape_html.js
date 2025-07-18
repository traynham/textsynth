const { expect, mote, payload } = window.testing

describe('escape_html plugin', () => {

	it('escapes HTML tags in a string', () => {
		const input = "[escape_html: htmlString]"
		expect(mote.process(input, payload)).to.equal('&lt;div&gt;Hello&lt;/div&gt;')
	})

	it('escapes quotes and apostrophes', () => {
		const input = "[escape_html: quoteString]"
		expect(mote.process(input, payload)).to.equal('&quot;It&apos;s great!&quot;')
	})

	it('escapes brackets', () => {
		const input = "[escape_html: bracketString]"
		expect(mote.process(input, payload)).to.equal('&lbrack;tagged&rbrack;')
	})

	it('returns an empty string when the content is empty', () => {
		const input = "[escape_html: emptyString]"
		expect(mote.process(input, payload)).to.equal('')
	})

	it('returns an empty string when the content is null', () => {
		const input = "[escape_html: nullValue]"
		expect(mote.process(input, payload)).to.equal('')
	})

})