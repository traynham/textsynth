import { describe, expect, test, jest } from '@jest/globals'
import TextSynth from '../index.js'
import { randomUUID } from 'crypto'

//import fs from 'fs'
//import path from 'path'

jest.useRealTimers() // Ensure we're using real timers

const textSynth = await TextSynth()
//textSynth.setDelimiters({opener: '[', closer: ']'})

textSynth.pluginSettings(
	'cache', 
	{
		cacheFolder: `./tests/support/cache/${randomUUID()}`,
		cacheDuration: 1, // days
		cacheCleanup: true
	}
)

// Turning off console.
console.log = () => {}

const template = `
	[cache]
		[markdown]
			# Header
		[/markdown]
	[/cache]
`
const template2 = `
	[cache]
		[markdown]
			## Header 2
		[/markdown]
	[/cache]
`


describe('cache plugin', () => {
	
	// afterEach(() => {
	// 	// Clean up cache files after each test
	// 	const cacheFolder = './cache'
	// 	fs.rmdirSync(cacheFolder, { recursive: true })
	// })

	test('caches the content and serves it if not expired', async () => {
		const input = template
		const firstResult = await textSynth.merge(input, {})
		expect(firstResult.trim()).toBe('<h1>Header</h1>')
		const secondResult = await textSynth.merge(input, {})
		expect(secondResult.trim()).toBe('<h1>Header</h1>')
	})
	
	test('caches the content and serves it if not expired', async () => {
		const input = template2
		const firstResult = textSynth.merge(input, {})
		expect(firstResult.trim()).toBe('<h2>Header 2</h2>')
		const secondResult = textSynth.merge(input, {})
		expect(secondResult.trim()).toBe('<h2>Header 2</h2>')
	})
	
	
/*
	test('reprocesses the content if cache is expired', async () => {
		const input = '[cache: "testCache2", "1s"]Cache me, man.[/cache]'
		
		const firstResult = textSynth.merge(input, {})
		
		await new Promise(resolve => setTimeout(resolve, 1500)) // Wait for cache to expire
		
		const secondResult = textSynth.merge(input, {})
		
//		expect(firstResult).not.toBe(secondResult)
		expect(firstResult).toBe(secondResult)
		
	})
*/
})
