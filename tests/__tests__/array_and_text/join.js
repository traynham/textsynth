import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	site: {
		items: [1, 2, 3]
	},
	fruit: ['Apple', 'Orange', 'Grape']
}

// Turning off console.
console.log = () => {}

describe('join plugin', () => {

	test('joins array elements with specified delimiter', () => {
		const input = "[join('-'): site.items]"
		expect(textSynth.merge(input, payload)).toBe('1-2-3')
	})

	test('joins array elements with comma and space as delimiter', () => {
		const input = "[join(', '): fruit]"
		expect(textSynth.merge(input, payload)).toBe('Apple, Orange, Grape')
	})

	test('joins array elements with default delimiter', () => {
		const input = "[join: fruit]"
		expect(textSynth.merge(input, payload)).toBe('Apple, Orange, Grape')
	})
	
	test('return strings', () => {
		const input = "[join: 'Return strings']"
		expect(textSynth.merge(input, payload)).toBe('Return strings')
	})

})
