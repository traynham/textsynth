import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'this is a test',
	emptyString: '',
	nonString: 12345
}

// Turning off console.
console.log = () => {}

describe('capitalize plugin', () => {

	test('capitalizes the first letter of a string', () => {
		const input = "[capitalize testString]"
		expect(textSynth.merge(input, payload)).toBe('This is a test')
	})

	test('returns an empty string when provided with an empty string', () => {
		const input = "[capitalize emptyString]"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('returns the original content if it is not a string', () => {
		const input = "[capitalize nonString]"
		expect(textSynth.merge(input, payload)).toBe('12345')
	})
	
})
