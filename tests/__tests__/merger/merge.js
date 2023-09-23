import { describe, expect, test } from '@jest/globals'
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
	
	// test("show bogus tags", () => {
	// 	textSynth.showUndefinedTags = true
	// 	const template = '[upper: "this"] is a [bogus "random"] [upper: "tag"].'
	// 	let result = textSynth.merge(template, payload)
	// 	expect(result).toBe("THIS is a [bogus \"random\"] TAG.")
	// })
	
	// test("hide bogus tags", () => {
	// 	textSynth.showUndefinedTags = false
	// 	const template = '[upper: "this"] is a [bogus "random"] [upper: "tag"].'
	// 	let result = textSynth.merge(template, payload)
	// 	expect(result).toBe('THIS is a  TAG.')
	// })
	
	test("set as markdown", () => {
		let payload = { _synth: { md: true}}
		const template = '# My Great Title.'
		let result = textSynth.merge(template, payload).trim()
		expect(result).toBe('<h1>My Great Title.</h1>')
	})
	
	test("set markdown to false if page opt is false.", () => {
		let payload = { _synth: { md: true}}
		const template = '---\nmd: false\n---\n\n# My Great Title.'
		let result = textSynth.merge(template, payload).trim()
		expect(result).toBe('# My Great Title.')
	})
	
	test("don't remove tabs", async () => {
		let textSynth = await TextSynth({removeTabs: false})
		const template = '	Template with a tab.'
		let result = textSynth.merge(template, payload)
		expect(result).toBe('	Template with a tab.')
	})
	
	test("set to use cache", () => {
		let payload = { _synth: { md: true}}
		const template = '---\ncache: true\n---\n# My Great Title.'
		let result = textSynth.merge(template, payload).trim()
		expect(result).toBe('<h1>My Great Title.</h1>')
	})
	
})
