import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'This is a test',
	testStringWithSpecialChars: 'This is a !@# test',
	nonString: 12345
}

// !TURN OFF CONSOLE.
console.log = () => {}

describe('replace plugin', () => {

	test('replaces all occurrences of a search string with a replacement string', () => {
		const input = "[replace(' ', '-'): testString]"
		expect(textSynth.merge(input, payload)).toBe('This-is-a-test')
	})

	test('handles special characters in the replacement string', () => {
		const input = "[replace(' ', '!'): testString]"
		expect(textSynth.merge(input, payload)).toBe('This!is!a!test')
	})

	test('replaces special characters in the input string', () => {
		const input = "[replace('!@#', '---'): testStringWithSpecialChars]"
		expect(textSynth.merge(input, payload)).toBe('This is a --- test')
	})

	test('throws an error when replacing a non-string', () => {
		const input = "[replace(' ', '-'): nonString]"
		expect(textSynth.merge(input, payload)).toBe(String(payload.nonString))
	})

})