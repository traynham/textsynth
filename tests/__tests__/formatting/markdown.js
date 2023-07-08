import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	data: {
		mdContent: "## Header 2 \n**Bold Text**\n*Italic Text*",
		null: null,
		undefined: undefined
	}
}

// Turning off console.
console.log = () => {}

describe('markdown plugin', () => {

	test('converts markdown to HTML', () => {
		const input = `[markdown]${payload.data.mdContent}[/markdown]`
		const expectedOutput = `<h2>Header 2</h2>\n<p><strong>Bold Text</strong>\n<em>Italic Text</em></p>\n`
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	// test('returns null when the content is null', () => {
	// 	const input = "[markdown data.null]"
	// 	expect(textSynth.merge(input, payload)).toBe('null')
	// })

	// test('returns an empty string when the content is undefined', () => {
	// 	const input = "[markdown data.undefined]"
	// 	expect(textSynth.merge(input, payload)).toBe('')
	// })
	
})
