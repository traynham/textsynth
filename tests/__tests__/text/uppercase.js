import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	lowercaseString: 'this is a test',
	mixedcaseString: 'This IS a Test'
}

// Turning off console.
console.log = () => {}

describe('uppercase plugin', () => {

	test('converts a lowercase string to uppercase', () => {
		const input = "[uppercase lowercaseString]"
		expect(textSynth.merge(input, payload)).toBe('THIS IS A TEST')
	})

	test('converts a mixed case string to uppercase', () => {
		const input = "[uppercase mixedcaseString]"
		expect(textSynth.merge(input, payload)).toBe('THIS IS A TEST')
	})

	test('returns the same string when already in uppercase', () => {
		const input = "[uppercase 'HELLO']"
		expect(textSynth.merge(input, payload)).toBe('HELLO')
	})
	
})
