import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	data: {
		escContent: "Hello &lbrack;uppercase 'John Doe'&rbrack;",
		unEscContent: "Hello [uppercase 'John Doe']",
		null: null,
		undefined: undefined
	}
}

// Turning off console.
//console.log = () => {}

describe('unescape_delimiters plugin', () => {

	test('converts escaped delimiters to raw delimiters', () => {
		const input = "[unescape_delimiters data.escContent]"
		const expectedOutput = payload.data.unEscContent
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	test('returns the same string when there are no escaped delimiters', () => {
		const input = "[unescape_delimiters data.unEscContent]"
		expect(textSynth.merge(input, payload)).toBe(payload.data.unEscContent)
	})

	test('returns null when the content is null', () => {
		const input = "[unescape_delimiters data.null]"
		expect(textSynth.merge(input, payload)).toBe('null')
	})

	test('returns an empty string when the content is undefined', () => {
		const input = "[unescape_delimiters data.undefined]"
		expect(textSynth.merge(input, payload)).toBe('undefined')
	})
	
})
