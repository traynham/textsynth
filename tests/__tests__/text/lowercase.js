import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'THIS IS A TEST',
	emptyString: '',
	nonString: 12345
}

// Turning off console.
console.log = () => {}

describe('lowercase plugin', () => {

	test('converts a string to lowercase', () => {
		const input = "[lowercase testString]"
		expect(textSynth.merge(input, payload)).toBe('this is a test')
	})

	test('returns an empty string when provided with an empty string', () => {
		const input = "[lowercase emptyString]"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('returns the original content if it is not a string', () => {
		const input = "[lowercase nonString]"
		expect(textSynth.merge(input, payload)).toBe('12345')
	})
	
})
