import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	text: "[uppercase 'boom']"
}

// Turning off console.
console.log = () => {}

describe('escape_delimiters plugin', () => {

	test('escapes TextSynth tag delimiters', () => {
		const input = "[escape_delimiters text]"
		expect(textSynth.merge(input, payload)).toBe("&lbrack;uppercase 'boom'&rbrack;")  // Replace 'Magic' with the expected escaped string
	})

	// test('returns an empty string when the content is empty', () => {
	// 	const input = "[escape_delimiters '']"
	// 	expect(textSynth.merge(input, payload)).toBe('')
	// })
	
})
