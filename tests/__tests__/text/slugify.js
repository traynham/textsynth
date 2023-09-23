import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	title: 'This is a Test Title',
	titleWithSpecialChars: 'This is a !@# Test Title',
	nonString: 12345
}

// Turning off console.
console.log = () => {}

describe('slugify plugin', () => {

	test('converts a string into a URL-friendly slug', () => {
		const input = "[slugify: title]"
		expect(textSynth.merge(input, payload)).toBe('this-is-a-test-title')
	})

	test('removes special characters from the input string', () => {
		const input = "[slugify: titleWithSpecialChars]"
		expect(textSynth.merge(input, payload)).toBe('this-is-a-test-title')
	})

	test('throws an error when slugifying a non-string', () => {
		const input = "[slugify: nonString]"
		expect(textSynth.merge(input, payload)).toBe(`${payload.nonString}`)
	})
	
})
