const { expect, mote } = window.testing

describe('unencode_delimiters plugin', () => {

	it('converts encoded delimiters to raw delimiters', () => {
		
		const payload = {
			encContent: '&#91;foo&#93;',
			unEncContent: '[foo]'
		}
		const input = "[unencode_delimiters: encContent]"
		
		expect(mote.process(input, payload)).to.equal('[foo]')
		
	});

	it('returns the same string when there are no encoded delimiters', () => {
		
		const payload = {
			unEncContent: '[foo]'
		}
		const input = "[unencode_delimiters: unEncContent]"
		
		expect(mote.process(input, payload)).to.equal('[foo]')
		
	})

	it('returns an empty string when the content is null', () => {
		
		const payload = { nullValue: null }
		const input = "[unencode_delimiters: nullValue]"
		
		expect(mote.process(input, payload)).to.equal('')
		
	})

	it('returns an empty string when the content is undefined', () => {
		
		const payload = { undefinedValue: undefined }
		const input = "[unencode_delimiters: undefinedValue]"
		
		expect(mote.process(input, payload)).to.equal('')
		
	})

})