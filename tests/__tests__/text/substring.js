import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'This is a test string',
	nonString: 12345
}

// Turning off console.
console.log = () => {}

describe('substring plugin', () => {

	test('returns a substring from the specified start and end indices', () => {
		const input = "[substring(0, 4): testString]"
		expect(textSynth.merge(input, payload)).toBe('This')
	})
	
	test('returns the full string when params are both zero.', () => {
		const input = "[substring(0, 0): testString]"
		expect(textSynth.merge(input, payload)).toBe('This is a test string')
	})

	test('returns the full string when params are not present', () => {
		const input = "[substring(2): testString]"
		expect(textSynth.merge(input, payload)).toBe('This is a test string')
	})
	
	test('returns the full string when params are empty', () => {
		const input = "[substring(): testString]"
		expect(textSynth.merge(input, payload)).toBe('This is a test string')
	})

	test('throws an error when trying to apply substring to a non-string', () => {
		const input = "[substring(0, 4): nonString]"
		expect(textSynth.merge(input, payload)).toBe(`${payload.nonString}`)
	})
	
})
