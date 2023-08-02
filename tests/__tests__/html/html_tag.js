import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Turning off console.
console.log = () => {}

describe('div plugin', () => {

	test('generates div tag with classes, id and attributes', () => {
		const input = '[div: .myClass #myId data-custom="customValue" name="content"]This is the div content[/div]'
		const expectedOutput = '<div data-custom="customValue" name="content" class="myClass" id="myId">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})

	test('generates div tag with classes and id shorthand', () => {
		const input = '[div: .myClass #myId]This is the div content[/div]'
		const expectedOutput = '<div class="myClass" id="myId">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
	test('generates div tag with id shorthand using underscores and dashes', () => {
		const input = '[div: #my-Id_12345]This is the div content[/div]'
		const expectedOutput = '<div id="my-Id_12345">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
	test('generates div tag with classes shorthand and class attribute', () => {
		const input = '[div: .myClass class="anotherClass bordered"]This is the div content[/div]'
		const expectedOutput = '<div class="myClass anotherClass bordered">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
	test('generates div tag with classes shorthand using underscores and dashes', () => {
		const input = '[div: .my-Class .another_class]This is the div content[/div]'
		const expectedOutput = '<div class="my-Class another_class">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
	test('generates div tag with classes shorthand and class attribute with unique results', () => {
		const input = '[div: .myClass class="anotherClass bordered myClass" .aDifferentClass]This is the div content[/div]'
		const expectedOutput = '<div class="myClass aDifferentClass anotherClass bordered">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
	test('generates div tag with quoted values', () => {
		const input = `[div: 'required' selected "Some bad value"]This is the div content[/div]`
		const expectedOutput = '<div required selected "Some bad value">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
	test('uses div tag by default', () => {
		const input = '[html_tag: .myClass #myId]This is the div content[/html_tag]'
		const expectedOutput = '<div class="myClass" id="myId">This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
	test('p tag from alias', () => {
		const input = '[p: .myClass #myId]This is the p content[/p]'
		const expectedOutput = '<p class="myClass" id="myId">This is the p content</p>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
	test('div tag with no params.', () => {
		const input = '[div]This is the div content[/div]'
		const expectedOutput = '<div>This is the div content</div>'
		expect(textSynth.merge(input, {})).toBe(expectedOutput)
	})
	
})