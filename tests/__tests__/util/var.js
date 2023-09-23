import { expect, describe, test } from '@jest/globals';
import TextSynth from '../index.js';

const textSynth = await TextSynth()
const payload = {}

// Turning off console.
console.log = () => {}

describe('var plugin', () => {
	
	test('set a var', async () => {
		const input = "[var: stuff = 'blah'] Stuff: [stuff]"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('Stuff: blah')
	})
	
	test('fail set var when no assignment is passed', async () => {
		const input = "[var: stuff ]"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('ERROR: "var" tag requires a valid asignment parameter.')
	})

})