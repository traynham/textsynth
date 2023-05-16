import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';


const textSynth = await TextSynth({opener: '{{', closer: '}}'});

// Test payload
const payload = {
  text: 'some text',
  empty_text: '',
  number: 123,
  array: ['one', 'two', 'three'],
  empty_array: []
};

// !TURN OFF CONSOLE.
console.log = () => {}

// !COUNT
describe('count plugin', () => {
	
	test('should return the number of elements in an array', () => {
		const input = '{{count: array}}'
		expect(textSynth.merge(input, payload)).toBe('3')
	})

	test('should handle empty arrays', () => {
		const input = '{{count: empty_array}}'
		expect(textSynth.merge(input, payload)).toBe('0')
	})
	
	test('should handle arrays with param', () => {
		const input = '{{count("two"): array}}'
		expect(textSynth.merge(input, payload)).toBe('1')
	})
	
	test('should return the length of a string', () => {
		const input = '{{count: text}}'
		expect(textSynth.merge(input, payload)).toBe('9')
	})

	test('should return the length of a string using countValue', () => {
		const input = '{{count("t"): text}}'
		expect(textSynth.merge(input, payload)).toBe('2')
	})

	test('should handle empty strings', () => {
		const input = '{{count: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('0')
	})
	

	test('should handle empty strings with countValue', () => {
		const input = '{{count("t"): empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('0')
	})

	test('should return original value if not a valid type.', () => {
		const input = '{{count: number}}'
		expect(textSynth.merge(input, payload)).toBe('123')
	})

	test('should return original value if not a valid type. with countValue', () => {
		const input = '{{count(1): number}}'
		expect(textSynth.merge(input, payload)).toBe('123')
	})

})


// !JOIN
describe('join plugin', () => {
	
	test('should join elements of an array with the specified separator', () => {
		const input = '{{join(", "): array}}'
		expect(textSynth.merge(input, payload)).toBe('one, two, three')
	})

	test('should handle empty arrays', () => {
		const input = '{{join(, ): empty_array}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})

})


// !LENGTH
describe('length plugin', () => {
	
	test('should return the length of a string', () => {
		const input = '{{length: text}}'
		expect(textSynth.merge(input, payload)).toBe('9')
	})
	
	test('should handle empty strings', () => {
		const input = '{{length: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('0')
	})
	
	test('should return the length of an array', () => {
		const input = '{{length: array}}'
		expect(textSynth.merge(input, payload)).toBe('3')
	})
	
	test('should handle empty array', () => {
		const input = '{{length: empty_array}}'
		expect(textSynth.merge(input, payload)).toBe('0')
	})
	
})


// !RANDOM
describe('random plugin', () => {

	test('should return a random element from an array', () => {
		const input = '{{random: array}}'
		const result = textSynth.merge(input, payload)
		expect(payload.array).toContain(result)
	})
	
	test('should handle empty arrays', () => {
		const input = '{{random: empty_array}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should return a random character from the text', () => {
		const input = '{{random: text}}'
		const result = textSynth.merge(input, payload)
		expect(payload.text.includes(result)).toBeTruthy()
	})
	
	test('should return an empty string when given an empty string', () => {
		const input = '{{random: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})


})

// !REVERSE
describe('reverse plugin', () => {

	test('should reverse the string', () => {
		const input = '{{reverse: text}}'
		expect(textSynth.merge(input, payload)).toBe('txet emos')
	})
	
	test('should reverse an array', () => {
		const input = '{{reverse: array}}'
		console.log('TEST RESULT::', textSynth.merge(input, payload))
		expect(textSynth.merge(input, payload)).toBe('three,two,one')
	})

});

// !SLICE
describe('slice plugin', () => {

	test('should slice the string with the specified start and end indices', () => {
		const input = '{{slice(0, 4): text}}'
		expect(textSynth.merge(input, payload)).toBe('some')
	})
	
	test('should handle empty strings', () => {
		const input = '{{slice(1, 3): empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})

})