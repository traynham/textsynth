import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	longString: 'This is a very long string used for testing the truncate function',
	shortString: 'Short string'
}

// Turning off console.
console.log = () => {}

describe('truncate plugin', () => {

	test('returns a string truncated to the specified length with a default suffix', () => {
		const input = "[truncate(10) longString]"
		expect(textSynth.merge(input, payload)).toBe('This is a ...')
	})

	test('returns a string truncated to the specified length with a custom suffix', () => {
		const input = "[truncate(10, '---') longString]"
		expect(textSynth.merge(input, payload)).toBe('This is a ---')
	})

	test('returns the string as is when its length is less than the specified maximum length', () => {
		const input = "[truncate(50) shortString]"
		expect(textSynth.merge(input, payload)).toBe('Short string')
	})
	
})
