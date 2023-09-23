import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	html: "<h1>Hello World</h1>",
	text: "Click 'OK' to confirm",
	array: "[1,2,3]"
}

// Turning off console.
console.log = () => {}

describe('escape_html plugin', () => {

	test('escapes HTML entities in a string', () => {
		const input = "[escape_html: html]"
		expect(textSynth.merge(input, payload)).toBe('&lt;h1&gt;Hello World&lt;/h1&gt;')
	})

	test('escapes quotes and apostrophes in a string', () => {
		const input = "[escape_html: text]"
		expect(textSynth.merge(input, payload)).toBe('Click &apos;OK&apos; to confirm')
	})

	test('escapes square brackets in a string', () => {
		const input = "[escape_html: array]"
		expect(textSynth.merge(input, payload)).toBe('&lbrack;1,2,3&rbrack;')
	})

	test('returns an empty string when the string is empty', () => {
		const input = "[escape_html: '']"
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
})
