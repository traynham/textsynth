import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	testString: 'this is a test string',
	nonString: 12345
}

// Turning off console.
console.log = () => {}

describe('titlecase plugin', () => {

	test('returns a string with each word capitalized', () => {
		const input = "[titlecase: testString]"
		expect(textSynth.merge(input, payload)).toBe('This Is A Test String')
	})

	test('throws an error when trying to apply titlecase to a non-string', () => {
		const input = "[titlecase: nonString]"
		expect(textSynth.merge(input, payload)).toBe(`${payload.nonString}`)
	})
	
})
