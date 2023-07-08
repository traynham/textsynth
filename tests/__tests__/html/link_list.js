import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	data: {
		linkObject: {
			"Google": "https://www.google.com",
			"Facebook": "https://www.facebook.com",
			"Twitter": "https://www.twitter.com"
		},
		null: null,
		undefined: undefined
	}
}

// Turning off console.
console.log = () => {}

describe('linkList plugin', () => {

	test('converts object to a list of HTML links', () => {
		const input = "[linkList data.linkObject]"
		const expectedOutput = `<ul><li><a href="https://www.google.com">Google</a></li><li><a href="https://www.facebook.com">Facebook</a></li><li><a href="https://www.twitter.com">Twitter</a></li></ul>`
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	// test('returns an empty list when the content is null', () => {
	// 	const input = "[linkList data.null]"
	// 	const expectedOutput = `<ul></ul>`
	// 	expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	// })

	// test('returns an empty list when the content is undefined', () => {
	// 	const input = "[linkList data.undefined]"
	// 	const expectedOutput = `<ul></ul>`
	// 	expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	// })
	
})
