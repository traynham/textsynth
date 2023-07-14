import { describe, expect, test, jest } from '@jest/globals'
import TextSynth from '../index.js'
import { randomUUID } from 'crypto'


jest.useRealTimers() // Ensure we're using real timers

const textSynth = await TextSynth()

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
	
})
