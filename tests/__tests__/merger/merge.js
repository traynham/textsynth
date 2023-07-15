import { describe, expect, test, jest } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

const payload = {
	text: '   this is MY text   ',
	empty_text: '',
	number: 123,
	test: {bob: 'meh'}
}

// Turning off console.
console.log = () => {}

describe("merge", () => {

	test("should return same template if no payload", () => {
		const template = 'test template'
		expect(textSynth.merge(template)).toBe(template)
	})

	test("should set views if no views in payload", () => {
		const template = 'test template'
		const payload = { _synth: {} }
		textSynth.views = 'test views'
		textSynth.merge(template, payload)
		expect(payload._synth.views).toBe('test views')
	})

	test("should set flush_comments if in payload", () => {
		const template = 'test template \n //comment \n /* comment */ <!-- comment -->'
		const payload = { _synth: { flush_comments: true } }
		textSynth.merge(template, payload)
		expect(textSynth.flush_comments).toBe(true)
	})

	test("should remove comments if flush_comments is true", () => {
		const template = 'test template \n //comment \n /* comment */ <!-- comment -->'
		const payload = { _synth: { flush_comments: false } }
		expect(textSynth.merge(template, payload).trim()).toBe('test template \n //comment \n /* comment */ <!-- comment -->')
	})

	test("should remove leading tabs if removeTabs is true", () => {
		const template = '\ttest template'
		const payload = { _synth: {} }
		textSynth.removeTabs = true
		expect(textSynth.merge(template, payload)).toBe('test template')
	})
	
	test("show bogus tags", () => {
		textSynth.showUndefinedTags = true
		const template = '[upper: "this"] is a [bogus "random"] [upper: "tag"].'
		let result = textSynth.merge(template, payload)
		expect(result).toBe("THIS is a [bogus \"random\"] TAG.")
	})
	
	test("hide bogus tags", () => {
		textSynth.showUndefinedTags = false
		const template = '[upper: "this"] is a [bogus "random"] [upper: "tag"].'
		let result = textSynth.merge(template, payload)
		expect(result).toBe('THIS is a  TAG.')
	})
	
	test("throw error in a tag", () => {
		
		textSynth.use({
			name: 'boom',
			processor() {
				throw new Error('BOOM.')
			}
		})
		
		// Create a spy on console.error
		const consoleSpy = jest.spyOn(console, 'log');
		
		const template = 'Things that go [boom: "ouch"].'
		textSynth.merge(template, payload)
		
		// Assert that console.error has been called with the expected argument
		expect(consoleSpy).toHaveBeenCalledWith('Error running "boom" plugin: Error: BOOM.');
		
		consoleSpy.mockRestore();  // Clean up the spy
		
	})

})
