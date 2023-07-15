import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

// Turning off console.
console.log = () => {}


describe('TextMerger default', () => {

	test('check default delimiters', async () => {
		const textSynth_default = await TextSynth()
		expect(textSynth_default.delimiters.raw.start).toBe('[')
	})
	
})

describe('TextMerger custom settings', () => {

	test('check verbose value', async () => {
		const textSynth_verbose = await TextSynth({verbose: true})
		expect(textSynth_verbose.verbose).toBe(true)		
	})
	
	test('check custom plugin path value', async () => {
		const textSynth_delimiters = await TextSynth({plugins: '/my_plugins'})
		expect(textSynth_delimiters.custom_plugins).toBe('/my_plugins')
	})
	
})