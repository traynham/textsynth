import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Turning off console.
console.log = () => {}

describe('runPlugin', () => {
	
	test("run uppercase test", () => {
		let result = textSynth.runPlugin('uppercase', {
			content: 'I want to be big.'
		})	
		expect(result).toBe('I WANT TO BE BIG.')
	})
	
	test("run bogus test", () => {
		let result = textSynth.runPlugin('bogus', {
			content: 'I want to be big.'
		})	
		expect(result).toBe('Plugin "bogus" does not exist.')
	})
	
})