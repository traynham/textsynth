const {expect, mote, payload} = window.testing


describe('Titlecase plugin', () => {
	
	it('returns Title Case', () => {
		const result = mote.process('[titlecase: name]', payload)
		expect(result).to.equal('Bob Coolguy')
	})
	
	/*
	
	it('returns Title Case', () => {
		const result = mote.process('[titlecase: text]', payload)
		expect(result).to.equal('Something')
	})
	
	it('returns Title Case', () => {
		const result = mote.process('[titlecase: name]', payload)
		expect(result).to.equal('My Test Case')
	})
	*/

})