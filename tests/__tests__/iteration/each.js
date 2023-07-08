import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	user: {
		hobbies: ['Cycling', 'Photography', 'Reading'],
		details: {
			name: "John Doe",
			age: 30
		}
	},
	null: null,
	undefined: undefined
}

// Turning off console.
console.log = () => {}

describe('each plugin', () => {

	test('Iterates over an array', () => {
		const input = `[each: user.hobbies]- [value][/each]`
		const expectedOutput = `- Cycling- Photography- Reading`
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	test('Iterates over an object', () => {
		const input = `[each: user.details][key]: [value]\n[/each]`
		const expectedOutput = `name: John Doe\nage: 30\n`
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	test('returns an empty string when the content is null', () => {
		const input = `[each: null]- [value][/each]`
		const expectedOutput = ``
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	test('returns an empty string when the content is undefined', () => {
		const input = `[each: undefined]- [value][/each]`
		const expectedOutput = ``
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})
	
})
