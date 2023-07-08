import { describe, expect, test, jest } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	fruits: ['Apple', 'Banana', 'Cherry', 'Dragon'],
	testString: 'What letter will it pick?'
}

// Turning off console.
console.log = () => {}

describe('random plugin', () => {

	// Mocking Math.random for predictable testing
	beforeEach(() => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0.5)
	})

	// Restoring Math.random to its original state
	afterEach(() => {
		jest.spyOn(global.Math, 'random').mockRestore()
	})

	test('returns a random element from an array', () => {
		const input = "[random fruits]"
		expect(textSynth.merge(input, payload)).toBe('Cherry')
	})

	test('returns a random character from a string', () => {
		const input = "[random testString]"
		expect(textSynth.merge(input, payload)).toBe('w')
	})

	test('returns an empty string when the input is empty', () => {
		const input = "[random '']"
		expect(textSynth.merge(input, payload)).toBe('')
	})
})
