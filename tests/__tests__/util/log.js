import { expect, describe, test, jest } from '@jest/globals';
import TextSynth from '../index.js';

const textSynth = await TextSynth()

// Turning off console.
console.log = () => {}

describe('log plugin', () => {

	test('logs the correct content to console', () => {
		
		const logMock = jest.spyOn(console, 'log')
		
		const input = '[log: "Hello, World!"]'
		textSynth.merge(input);
		
		expect(logMock).toHaveBeenCalledWith('Hello, World!')
		
		logMock.mockRestore()
		
	})

	test('logs object correctly', () => {
		
		const logMock = jest.spyOn(console, 'log')
		
		const payload = { property: { path: { key: "value" } } }
		const input = '[log: property.path]'
		textSynth.merge(input, payload)
		
		expect(logMock).toHaveBeenCalledWith({ key: "value" })
		
		logMock.mockRestore()
		
	})
	
})