import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'This is a test',
	nonString: 12345
}

// Turning off console.
console.log = () => {}

describe('camelCase plugin', () => {

	test('converts a string to camelCase', () => {
		const input = "[camelcase testString]"
		expect(textSynth.merge(input, payload)).toBe('thisIsATest')
	})

	test('returns the original content if it is not a string', () => {
		const input = "[camelcase nonString]"
		expect(textSynth.merge(input, payload)).toBe('12345')
	})
})
