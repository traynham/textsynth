import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'This is 10',
	foundArray: Array(15).fill('item'),
	empty: []
}

// Turning off console.
console.log = () => {}

describe('length plugin', () => {

	test('returns the length of a string', () => {
		const input = "[length: testString]"
		expect(textSynth.merge(input, payload)).toBe('10')
	})

	test('returns the number of elements in an array', () => {
		const input = "[length: foundArray]"
		expect(textSynth.merge(input, payload)).toBe('15')
	})

	test('returns 0 when the string is empty', () => {
		const input = "[length: '']"
		expect(textSynth.merge(input, payload)).toBe('0')
	})

	test('returns 0 when the array is empty', () => {
		const input = "[length: empty]"
		expect(textSynth.merge(input, payload)).toBe('0')
	})
	
})
