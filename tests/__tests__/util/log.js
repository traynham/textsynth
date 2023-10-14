import { expect, describe, test, jest } from '@jest/globals';
import TextSynth from '../index.js';

const textSynth = await TextSynth()

// Turning off console.
console.log = () => {}

const payload = { property: { path: { key: "value" } } }
const logMock = jest.spyOn(console, 'log')

describe('log plugin', () => {

	test('logs the correct content to console', () => {
		
		const input = '[log: "Hello, World!"]'
		textSynth.merge(input);
		
		expect(logMock).toHaveBeenCalledWith('Hello, World!')
		
		logMock.mockRestore()
		
	})

	test('logs object correctly', () => {
		
		const logMock = jest.spyOn(console, 'log')
		
		const input = '[log: property.path]'
		textSynth.merge(input, payload)
		
		expect(logMock).toHaveBeenCalledWith({ key: "value" })
		
		logMock.mockRestore()
		
	})
	
	// NOTE: THIS TEST IS BAD.
	test('logs grouping and property', () => {
		
		const logMock = jest.spyOn(console, 'log')
		
		const input = '[log: "Simple String", property]'
		textSynth.merge(input, payload)
		
		expect(logMock).toHaveBeenCalledWith({"path": {"key": "value"}})
		
		logMock.mockRestore()
		
	})
	
	// NOTE: THIS TEST IS BAD.
	test('logs grouping and property', () => {
		
		const logMock = jest.spyOn(console, 'log')
		
		const input = '[log: "Simple String", property.path, -table]'
		textSynth.merge(input, payload)
		
		const output =  "┌─────────┬─────────┐\n" +
						"│ (index) │ Values  │\n" +
						"├─────────┼─────────┤\n" +
						"│   key   │ 'value' │\n" +
						"└─────────┴─────────┘"
		
		expect(logMock).toHaveBeenCalledWith(output)
		
		logMock.mockRestore()
		
	})
	
})