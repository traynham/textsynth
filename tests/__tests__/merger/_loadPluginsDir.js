import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Turning off console.
console.log = () => {}

describe('_loadPluginsDir()', () => {
	
	test("try bogus dir", async () => {
		let result = await textSynth._loadPluginsDir('bogus', 'bogus')
		expect(result).toBe('Plugin directory does not exist.')
	})
	
})