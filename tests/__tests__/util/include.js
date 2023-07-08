import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'


const textSynth = await TextSynth()
textSynth.setDelimiters({ opener: '[', closer: ']' })

console.log = () => {}

const payload = {
  _synth: {
	views: './tests/support/views'
  }
}

describe('include plugin', () => {
	
	test('Include header.synth.', async () => {
		const input = "[include 'header.synth']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('This is the header.')
	})

	test('Include header.', async () => {
		const input = "[include 'header']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('This is the header.')
	})
	
	test('Include header.js should fail.', async () => {
		const input = "[include 'header.js']"
		const result = await textSynth.merge(input, payload)
		expect(result).toBe('')
	})
	
	test('Include with no content should throw error.', async () => {
		const input = "[include: '']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('')
	})
	
})