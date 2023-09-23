import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	text: "[uppercase 'boom']",
	bad: []
}

// Turning off console.
console.log = () => {}

describe('escape_delimiters plugin', () => {

	test('escapes TextSynth tag delimiters', () => {
		const input = "[escape_delimiters: text]"
		expect(textSynth.merge(input, payload)).toBe("\\[uppercase 'boom'\\]")  // Replace 'Magic' with the expected escaped string
	})

	test('returns an empty string when the content is empty', () => {
		const input = "[escape_delimiters: bogus]"
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('returns an empty string when the content is null', () => {
		const input = "[escape_delimiters: bad]"
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
})
