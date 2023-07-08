import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const textSynth = await TextSynth()

// Get the directory of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Mock payload
const payload = {
	_synth: {
		views: join(__dirname, './views')
	}
}

// Turning off console.
console.log = () => {}

describe('layout plugin', () => {
	test('Replaces block placeholders with block content', () => {
		const input = `[layout "main.synth"] [block_set "title"]Page Title[/block_set] [block_set "body"]Page content[/block_set] [/layout]`
		const expectedOutput = '<title>Page Title</title>\n<div>Page content</div>'
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	test('Keeps default content if no block_set is provided', () => {
		const input = `[layout "main.synth"] [/layout]`
		const expectedOutput = '<title>Default Title</title>\n<div>Default body</div>'
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	test('Appends content with block_append', () => {
		const input = `[layout "main.synth"] [block_append "body"]Additional content[/block_append] [/layout]`
		const expectedOutput = '<title>Default Title</title>\n<div>Default bodyAdditional content</div>'
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})
	
	test('Prepends content with block_prepend', () => {
		const input = `[layout "main.synth"] [block_prepend "body"]Additional content[/block_prepend] [/layout]`
		const expectedOutput = '<title>Default Title</title>\n<div>Additional contentDefault body</div>'
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})
	
	

	// test('Throws error if layout file not found', () => {
	// 	const input = `[layout "missing.synth"] [block_set "title"]Page Title[/block_set] [block_set "body"]Page content[/block_set] [/layout]`
	// 	
	// 	expect(() => textSynth.merge(input, payload)).toThrow()
	// })
	
})