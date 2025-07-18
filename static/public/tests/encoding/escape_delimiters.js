const { expect, mote, payload } = window.testing

describe('escape_delimiters plugin', () => {

	it('escapes MOTE tag delimiters', () => {
		
		let local_payload = {
			name: '[name]'
		}
		
		const input = "[escape_delimiters: name]"
		
		expect(mote.process(input, local_payload)).to.equal("\\[name\\]")
		
	})

	it('returns an empty string when the content is empty', () => {
		const input = "[escape_delimiters: bogus]"
		expect(mote.process(input, payload)).to.equal('')
	})

	it('returns an empty string when the content is null', () => {
		const input = "[escape_delimiters: bad]"
		expect(mote.process(input, payload)).to.equal('')
	})

})