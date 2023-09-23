import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	site: {
		title: 'Hello World'
	},
	numbers: [1, 2, 3, 4, 5],
	empty: []
}

// Turning off console.
console.log = () => {}

describe('reverse plugin', () => {

	test('reverses a string', () => {
		const input = "[reverse: site.title]"
		expect(textSynth.merge(input, payload)).toBe('dlroW olleH')
	})

	test('reverses the order of elements in an array', () => {
		const input = "[reverse: numbers]"
		expect(textSynth.merge(input, payload)).toEqual('5,4,3,2,1')
	})

	test('returns an empty string when the string is empty', () => {
		const input = "[reverse: '']"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('returns an empty array when the array is empty', () => {
		const input = "[reverse: empty]"
		expect(textSynth.merge(input, payload)).toEqual('')
	})
	
})
