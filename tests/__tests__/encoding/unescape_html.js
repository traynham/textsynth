import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	data: {
		escContent: "Hello &amp; Goodbye &lt;John Doe&gt;",
		unEscContent: "Hello & Goodbye <John Doe>",
		null: null,
		undefined: undefined
	}
}

// Turning off console.
console.log = () => {}

describe('unescape_html plugin', () => {

	test('converts escaped HTML entities to their original characters', () => {
		const input = "[unescape_html data.escContent]"
		const expectedOutput = payload.data.unEscContent
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	test('returns the same string when there are no HTML entities', () => {
		const input = "[unescape_html data.unEscContent]"
		expect(textSynth.merge(input, payload)).toBe(payload.data.unEscContent)
	})

	test('returns null when the content is null', () => {
		const input = "[unescape_html data.null]"
		expect(textSynth.merge(input, payload)).toBe('null')
	})

	test('returns an empty string when the content is undefined', () => {
		const input = "[unescape_html data.undefined]"
		expect(textSynth.merge(input, payload)).toBe('undefined')
	})
	
})
