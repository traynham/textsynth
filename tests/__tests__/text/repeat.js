import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'abc',
	emptyString: '',
	nonString: 12345
}

// Turning off console.
console.log = () => {}

describe('repeat plugin', () => {

	test('repeats a string a specified number of times', () => {
		const input = "[repeat(3) testString]"
		expect(textSynth.merge(input, payload)).toBe('abcabcabc')
	})

	test('returns an empty string when repeating an empty string', () => {
		const input = "[repeat(3) emptyString]"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('throws an error when repeating a non-string', () => {
		const input = "[repeat(3) nonString]"
		expect(textSynth.merge(input, payload)).toBe(String(payload.nonString))
	})
	
})
