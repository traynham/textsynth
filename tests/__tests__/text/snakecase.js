import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'ThisIsTestString',
	anotherTestString: 'Another Test String',
	nonString: 12345
}

describe('snakecase plugin', () => {

	test('converts a camelCase string to snake_case', () => {
		const input = "[snakecase testString]"
		expect(textSynth.merge(input, payload)).toBe('this_is_test_string')
	})

	test('converts a regular string to snake_case', () => {
		const input = "[snakecase anotherTestString]"
		expect(textSynth.merge(input, payload)).toBe('another_test_string')
	})

	test('throws an error when converting a non-string to snake_case', () => {
		const input = "[snakecase nonString]"
		expect(textSynth.merge(input, payload)).toBe(`${payload.nonString}`)
	})
	
})
