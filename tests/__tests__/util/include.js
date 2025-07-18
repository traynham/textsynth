import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'


const textSynth = await TextSynth()

const payload = {
  _synth: {
	views: './tests/support/views'
  }
}

// Turning off console.
console.log = () => {}

describe('include plugin', () => {
	
	test('Include header.synth.', async () => {
		const input = "[include: 'header.synth']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('This is the header.')
	})
	
	test('Include header.synth.', async () => {
		const input = "[include: -removeTabs, 'header2.synth']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('This is the header.')
	})

	test('Include file requires an extension.', async () => {
		const input = "[include: 'header']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: Include file name requires an extension.')
	})
	
	test('Include header.js should fail.', async () => {
		const input = "[include: 'header.js']"
		const result = await textSynth.merge(input, payload)
		expect(result).toBe('ERROR: Include file does not exist: tests/support/views/header.js')
	})
	
	test('Include with no content should throw error.', async () => {
		const input = "[include:]"
		const result = await textSynth.merge(input, payload)
		//expect(result.trim()).toBe('undefined')
		//expect(result.trim()).toBe('ERROR: "include" tag expected content.')
		expect(result.trim()).toBe('ERROR: No file specified for include tag')
	})
	
	test('Include with no content should throw error, with string.', async () => {
		const input = "[include: '']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: No file specified for include tag')
	})
	
})