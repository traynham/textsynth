import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	site: {
		title: 'Hello World'
	},
	numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	empty: []
}

// Turning off console.
console.log = () => {}

describe('slice plugin', () => {

	test('extracts a section of a string', () => {
		const input = "[slice(0,5): site.title]"
		expect(textSynth.merge(input, payload)).toBe('Hello')
	})

	test('extracts a section of an array', () => {
		const input = "[slice(4,9): numbers]"
		expect(textSynth.merge(input, payload)).toEqual('5,6,7,8,9')
	})

	test('returns an empty string when the string is empty', () => {
		const input = "[slice(0,2): '']"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('returns an empty array when the array is empty', () => {
		const input = "[slice(0,2): empty]"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('returns full array when end index is larger than array length', () => {
		const input = "[slice(0,20): numbers]"
		expect(textSynth.merge(input, payload)).toEqual('1,2,3,4,5,6,7,8,9,10')
	})

	test('returns full string when end index is larger than string length', () => {
		const input = "[slice(0,20): site.title]"
		expect(textSynth.merge(input, payload)).toBe('Hello World')
	})
	
})
