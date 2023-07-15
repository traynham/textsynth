import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Turning off console.
console.log = () => {}

describe('_findClosingTagIndex method', () => {

	test('finds closing tag index correctly', () => {
		const input = '[tag]content[/tag] additional content'
		const startIndex = 0
		const tagName = 'tag'
		const result = textSynth._findClosingTagIndex(input, startIndex, tagName)
		expect(result).toBe(12) // The index of the closing tag in the provided string
	})
	
	test("unmatched tag should return error to end user", () => {
		
		const template = '[markdown]# header'
		
		expect(textSynth.merge(template)).toBe(
			'ERROR: The closing tag for "markdown" is missing. Please ensure that all tags are properly closed.'
		)
		
	})

	test('handles nested tags correctly', () => {
		const input = '[tag][tag]content[/tag] additional content[/tag]'
		const startIndex = 0
		const tagName = 'tag'
		const result = textSynth._findClosingTagIndex(input, startIndex, tagName)
		expect(result).toBe(42) // The index of the last closing tag in the provided string
	})

})
