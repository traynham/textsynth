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

describe('importJSON plugin using simple syntax', () => {
	
	test('importJSON with a valid JSON file.', async () => {
		const input = "[importJSON: 'valid.json']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('') // Expect no error message
	})

	test('importJSON with an invalid JSON file.', async () => {
		const input = "[importJSON: 'invalid.json']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('ERROR: Failed to parse JSON: › Unexpected string in JSON at position 40') 
	})

	test('importJSON with a non-json file extension.', async () => {
		const input = "[importJSON: 'file.txt']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: JSON file requires .JSON extension.')
	})

	test('importJSON with a non-existing file.', async () => {
		const input = "[importJSON: 'not_exists.json']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: JSON file does not exist: tests/support/views/not_exists.json')
	})

	test('importJSON with no content should throw error.', async () => {
		const input = "[importJSON: '']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: No file specified for importJSON tag')
	})

	test('importJSON with an empty string should throw error.', async () => {
		const input = "[importJSON: '']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: No file specified for importJSON tag')
	})
	
})

describe('importJSON plugin with using syntax', () => {
	
	test('importJSON with a valid JSON file and custom name.', async () => {
		const input = "[importJSON: customName using 'valid.json']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('') // Expect no error message
	})

	test('importJSON with an invalid JSON file and custom name.', async () => {
		const input = "[importJSON: customName using 'invalid.json']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('ERROR: Failed to parse JSON: › Unexpected string in JSON at position 40')
	})

	test('importJSON with a non-json file extension and custom name.', async () => {
		const input = "[importJSON: customName using 'file.txt']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: JSON file requires .JSON extension.')
	})

	test('importJSON with a non-existing file and custom name.', async () => {
		const input = "[importJSON: customName using 'not_exists.json']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: JSON file does not exist: tests/support/views/not_exists.json')
	})
	
	test('importJSON with no file specified and custom name should throw error.', async () => {
		const input = "[importJSON: customName using '']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: No file specified for importJSON tag')
	})
	
})