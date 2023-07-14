import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Turning off console.
console.log = () => {}

describe('div plugin', () => {

	test('generates div tag with classes, id and attributes', () => {
		const input = '[div: .myClass #myId data-custom="customValue" name="content"]This is the div content[/div]'
		const expectedOutput = '<div name="content" class="myClass" id="myId" data-custom="customValue">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})

	test('generates div tag with classes and id shorthand', () => {
		const input = '[div: .myClass #myId]This is the div content[/div]'
		const expectedOutput = '<div class="myClass" id="myId">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
})