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

describe('ignore plugin', () => {

	test('should encode tags', () => {
		const input = `[ignore][markdown]${payload.data.mdContent}[/markdown][/ignore]`
		const expectedOutput = `\\[markdown\\]## Header 2 \n**Bold Text**\n*Italic Text*\\[/markdown\\]`
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})
	
})
