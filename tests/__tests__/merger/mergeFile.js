import path from 'path'

import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth({
	views: './tests/support/views'
})

const payload = {
	text: '   this is MY text   ',
	empty_text: '',
	number: 123,
	test: {bob: 'meh'}
}

// Turning off console.
console.log = () => {}

describe('mergeFile', () => {
	
	test("merge a file", async () => {
		let result = await textSynth.mergeFile('test.synth', payload)
		expect(result.trim()).toBe('<h1>THIS IS REALLY COOL.</h1>')
	})
	
	test("merge a markdown file", async () => {
		let result = await textSynth.mergeFile('test.md', payload)
		expect(result.trim()).toBe('<h1>Test Markdown File</h1>')
	})
	
	test("merge a file, without payload", async () => {
		let result = await textSynth.mergeFile('test.synth')
		expect(result.trim()).toBe('<h1>THIS IS REALLY COOL.</h1>')
	})
	
	test("merge a file, with isExpress", async () => {
		const payload = { _synth: { isExpress: true } }
		const view = path.join(textSynth._getAppRoot(), 'tests/support/views', 'test.synth')
		let result = await textSynth.mergeFile(view, payload)
		expect(result.trim()).toBe('<h1>THIS IS REALLY COOL.</h1>')
	})
	
	test("attempt to merge a bogus file", async () => {
		let result = await textSynth.mergeFile('bogus.synth', payload)
		expect(result).toMatch(/^ERROR: Merge path.* does not exist$/)
	})
	
})