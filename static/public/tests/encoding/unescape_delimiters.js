const { expect, mote, payload } = window.testing

describe('unescape_delimiters plugin', () => {

	it('converts escaped delimiters to raw delimiters', () => {
		
		const payload = {
			escContent: '\\[foo\\]',   // Example: string with escaped delimiters
			unEscContent: '[foo]'      // Expected: unescaped delimiters
		}
		const input = "[unescape_delimiters: escContent]"
		
		expect(mote.process(input, payload)).to.equal(payload.unEscContent)
		
	})

	it('returns the same string when there are no escaped delimiters', () => {
		const input = "[unescape_delimiters: unEscContent]"
		expect(mote.process(input, payload)).to.equal(payload.unEscContent)
	})

	it('returns an empty string when the content is null', () => {
		const input = "[unescape_delimiters: nullValue]"
		expect(mote.process(input, payload)).to.equal('')
	})

	it('returns an empty string when the content is undefined', () => {
		const input = "[unescape_delimiters: undefinedValue]"
		expect(mote.process(input, payload)).to.equal('')
	})

})