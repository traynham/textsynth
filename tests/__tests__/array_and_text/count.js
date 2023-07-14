import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'This is 10',
	foundArray: Array(15).fill('item'),
	qarray: ['a', 'b', 'c', 'a'],
	testStringWithChar: 'This is a test',
	anObj: {name: 'Bob'},
	num: 123
}

// Turning off console.
console.log = () => {}

describe('count plugin', () => {

	test('counts the characters in a string', () => {
		const input = "[count testString]"
		expect(textSynth.merge(input, payload)).toBe('10')
	})

	test('counts the number of elements in an array', () => {
		const input = "[count foundArray]"
		expect(textSynth.merge(input, payload)).toBe('15')
	})

	test('counts the occurrences of a specified character in a string!', () => {
		const input = "[count('t') testStringWithChar]"
		expect(textSynth.merge(input, payload)).toBe('2')
	})
	
	test('Object should simply return object.', () => {
		const input = "[count anObj]"
		expect(textSynth.merge(input, payload)).toBe('[object Object]')
	})
	
	test('counts the occurrences of a specified q in an array', () => {
		const input = "[count('a') qarray]"
		expect(textSynth.merge(input, payload)).toBe('2')
	})

	test('returns the input as is when it is not a string or array', () => {
		const input = "[count num]"
		expect(textSynth.merge(input, payload)).toBe('123')
	})
	
	test('returns the input as is when it is not a string or array', () => {
		const input = "[count 123456789]"
		expect(textSynth.merge(input, payload)).toBe('123456789')
	})
	
})
