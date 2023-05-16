import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';

const textSynth = await TextSynth({opener: '{{', closer: '}}'});


// Test payload
const payload = {
  num1: 7,
  num2: 3,
  num3: 2.5,
  num4: 1.7
};

// !TURN OFF CONSOLE.
console.log = () => {}

// !ADD
describe('add plugin', () => {

	test('should add two numbers', () => {
		const input = '{{add(7): num2}}'
		expect(textSynth.merge(input, payload)).toBe('10')
	})
	
	test('should add two numbers, one being literal.', () => {
		const input = '{{add(7): 4}}'
		expect(textSynth.merge(input, payload)).toBe('11')
	})
	
	test('should add two numbers, one being a literal zero.', () => {
		const input = '{{add(7): 0}}'
		expect(textSynth.merge(input, payload)).toBe('7')
	})

})

// !MULTIPLY
describe('multiply plugin', () => {

	test('should multiply two numbers', () => {
		const input = '{{multiply(7): num2}}'
		expect(textSynth.merge(input, payload)).toBe('21')
	})
	
})

// !ROUND
describe('round plugin', () => {

	test('should round a number to the nearest integer', () => {
		const input = '{{round(0): num3}}'
		expect(textSynth.merge(input, payload)).toBe('3')
	})
	
	test('should round a number with a specified number of decimal places', () => {
		const input = '{{round(1): num4}}'
		expect(textSynth.merge(input, payload)).toBe('1.7')
	})

})

// !SUBTRACT
describe('subtract plugin', () => {

	test('should subtract two numbers', () => {
		const input = '{{subtract(3): num1}}'
		expect(textSynth.merge(input, payload)).toBe('4')
	})

})