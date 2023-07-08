import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	isAdmin: true,
	isSubscriber: false,
	isUndefined: undefined,
	isNull: null
}

// !TURN OFF CONSOLE.
console.log = () => {}

describe('choose plugin', () => {

	test('returns first content when condition is true quoted string', () => {
		const input = `[choose('true') "Hello Admin!", "Hello User!", "Hello"]`
		expect(textSynth.merge(input, payload)).toBe('Hello Admin!')
	})
	
	test('returns second content when condition is false quoted string', () => {
		const input = `[choose('false'): "Hello Admin!", "Hello User!", "Hello"]`
		expect(textSynth.merge(input, payload)).toBe('Hello User!')
	})
	
	test('returns first content when condition is true string', () => {
		const input = `[choose(true) "Hello Admin!", "Hello User!", "Hello"]`
		expect(textSynth.merge(input, payload)).toBe('Hello Admin!')
	})
	
	test('returns second content when condition is false string', () => {
		const input = `[choose(false): "Hello Admin!", "Hello User!", "Hello"]`
		expect(textSynth.merge(input, payload)).toBe('Hello User!')
	})
	
	test('returns first content when condition is true', () => {
		const input = '[choose(isAdmin) "Hello Admin!", "Hello User!", "Hello"]'
		expect(textSynth.merge(input, payload)).toBe('Hello Admin!')
	})
	
	test('returns second content when condition is false', () => {
		const input = '[choose(isSubscriber): "Hello Admin!", "Hello User!", "Hello"]'
		expect(textSynth.merge(input, payload)).toBe('Hello User!')
	})
	
	test('returns default content when condition is neither true nor false', () => {
		const input = '[choose(isUndefined) "Hello Admin!", "Hello User!", "Hello"]'
		expect(textSynth.merge(input, payload)).toBe('Hello')
	})
	
	test('returns default content when condition is null', () => {
		const input = '[choose(isNull) "Hello Admin!", "Hello User!", "Hello"]'
		expect(textSynth.merge(input, payload)).toBe('Hello')
	})
	
})
