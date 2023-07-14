import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: '  this is a test string  ',
	nonString: 12345
}

// Turning off console.
console.log = () => {}

describe('trim plugin', () => {

	test('returns a string with leading and trailing whitespace removed', () => {
		const input = "[trim testString]"
		expect(textSynth.merge(input, payload)).toBe('this is a test string')
	})

	test('throws an error when trying to trim a non-string', () => {
		const input = "[trim nonString]"
		expect(textSynth.merge(input, payload)).toBe(String(payload.nonString))
	})
	
})
