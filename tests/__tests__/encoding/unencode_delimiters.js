import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	data: {
		encContent: "Hello &lbrack;uppercase 'John Doe'&rbrack;",
		//escContent: "Hello \\[uppercase 'John Doe'\\]",
		unEncContent: "Hello [uppercase 'John Doe']",
		null: null,
		undefined: undefined
	}
}

// Turning off console.
console.log = () => {}

describe('unescape_delimiters plugin', () => {

	test('converts encoded delimiters to raw delimiters', () => {
		const input = "[unencode_delimiters data.encContent]"
		const expectedOutput = payload.data.unEncContent
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	test('returns the same string when there are no encoded delimiters', () => {
		const input = "[unencode_delimiters data.unEncContent]"
		expect(textSynth.merge(input, payload)).toBe(payload.data.unEncContent)
	})

	test('returns null when the content is null', () => {
		const input = "[unencode_delimiters data.null]"
		expect(textSynth.merge(input, payload)).toBe('null')
	})

	test('returns an empty string when the content is undefined', () => {
		const input = "[unencode_delimiters data.undefined]"
		expect(textSynth.merge(input, payload)).toBe('undefined')
	})
	
})
