import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';

const textSynth = await TextSynth({opener: '{{', closer: '}}'});

// Test payload
const payload = {
  num1: 1234.56,
  num2: 9876543.21,
  num3: 42.987,
}

// !TURN OFF CONSOLE.
console.log = () => {}

// FORMAT CURRENCY 
describe('formatCurrency plugin', () => {

	test('should format a number as currency', () => {
		const input = '{{formatCurrency("$", ".", ","): num1}}'
		expect(textSynth.merge(input, payload)).toBe('$1,234.56')
	})

})

// NUMBER WITH COMMAS
describe('numberWithCommas plugin', () => {

	test('should add commas to a number', () => {
		const input = '{{numberWithCommas: num2}}'
		expect(textSynth.merge(input, payload)).toBe('9,876,543.21')
	})

})


// toFixed plugin tests
describe('toFixed plugin', () => {

	test('should format a number with a fixed number of decimal places', () => {
		const input = '{{toFixed(2): num3}}'
		expect(textSynth.merge(input, payload)).toBe('42.99')
	})

})