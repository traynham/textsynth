import path from 'path'

import { describe, expect, test, jest } from '@jest/globals';
import TextSynth from './index.js';


const textSynth = await TextSynth({
	opener: '[', closer: ']',
	plugins: 'my_plugins',
	verbose: true,
	views: './tests/support/views'
})

const payload = {
  text: '   this is MY text   ',
  empty_text: '',
  number: 123,
  test: {bob: 'meh'}
};

// !TURN OFF CONSOLE.
console.log = () => {}

describe('TextMerger default', () => {

	test('pluginDocs should return a string with plugin documentation', async () => {
		const textSynth_default = await TextSynth()
		expect(textSynth_default.opener_raw).toBe('[')
	})
	
	test("merge a file", async () => {
		let result = await textSynth.mergeFile('test.synth', payload)
		expect(result.trim()).toBe('<h1>THIS IS REALLY COOL.</h1>')
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
		const match = result.match(/^Error rendering file/)
		expect(match[0]).toBe('Error rendering file')
	})
		
})

describe('runPlugin', () => {
	
	test("run uppercase test", () => {
		let result = textSynth.runPlugin('uppercase', {
			content: 'I want to be big.'
		})	
		expect(result).toBe('I WANT TO BE BIG.')
	})
	
	test("run bogus test", () => {
		let result = textSynth.runPlugin('bogus', {
			content: 'I want to be big.'
		})	
		expect(result).toBe('Plugin "bogus" does not exist.')
	})
	
})


describe('_loadPluginsDir()', () => {
	
	test("try bogus dir", async () => {
		let result = await textSynth._loadPluginsDir('bogus', 'bogus')
		expect(result).toBe('Plugin directory does not exist.')
	})
	
})

describe("merge", () => {

	test("should return same template if no payload", () => {
		const template = 'test template'
		expect(textSynth.merge(template)).toBe(template)
	})

	test("should set views if no views in payload", () => {
		const template = 'test template'
		const payload = { _synth: {} }
		textSynth.views = 'test views'
		textSynth.merge(template, payload)
		expect(payload._synth.views).toBe('test views')
	})

	test("should set flush_comments if in payload", () => {
		const template = 'test template \n //comment \n /* comment */ <!-- comment -->'
		const payload = { _synth: { flush_comments: true } }
		textSynth.merge(template, payload)
		expect(textSynth.flush_comments).toBe(true)
	})

	test("should remove comments if flush_comments is true", () => {
		const template = 'test template \n //comment \n /* comment */ <!-- comment -->'
		const payload = { _synth: { flush_comments: false } }
		expect(textSynth.merge(template, payload).trim()).toBe('test template \n //comment \n /* comment */ <!-- comment -->')
	})

	test("should remove leading tabs if removeTabs is true", () => {
		const template = '\ttest template'
		const payload = { _synth: {} }
		textSynth.removeTabs = true
		expect(textSynth.merge(template, payload)).toBe('test template')
	})
	
	test("show bogus tags", () => {
		textSynth.showUndefinedTags = true
		const template = '[upper: "this"] is a [bogus "random"] [upper: "tag"].'
		let result = textSynth.merge(template, payload)
		expect(result).toBe("THIS is a [bogus \"random\"] TAG.")
	})
	
	test("hide bogus tags", () => {
		textSynth.showUndefinedTags = false
		const template = '[upper: "this"] is a [bogus "random"] [upper: "tag"].'
		let result = textSynth.merge(template, payload)
		expect(result).toBe('THIS is a  TAG.')
	})
	
	
	test("throw error in a tag", () => {
		
		textSynth.use({
			name: 'boom',
			processor() {
				throw new Error('BOOM.')
			}
		})
		
		// Create a spy on console.error
		const consoleSpy = jest.spyOn(console, 'log');
		
		const template = 'Things that go [boom: "ouch"].'
		textSynth.merge(template, payload)
		
		// Assert that console.error has been called with the expected argument
		expect(consoleSpy).toHaveBeenCalledWith('Error running "boom" plugin: Error: BOOM.');
		
		consoleSpy.mockRestore();  // Clean up the spy
		
	})
/*
	test("unmatched tag", () => {
		
		// Create a spy on console.error
	//	const consoleSpy = jest.spyOn(console, 'error');
		
		const template = '[markdown]# header'
		
	//	textSynth.merge(template)
		
	//	expect(consoleSpy).toHaveBeenCalledWith('No matching closing tag found for [markdown]');
		
		//expect(textSynth.merge(template)).toThrow("No matching closing tag found for [markdown]")
		expect(textSynth.merge(template)).toThrow()
		
	})
*/	
})


describe("pluginSettings", () => {

	test("should return undefined and console error for nonexistent plugin", () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
		expect(textSynth.pluginSettings('nonexistent')).toBeUndefined()
		expect(consoleSpy).toHaveBeenCalledWith('Plugin nonexistent does not exist.')
		consoleSpy.mockRestore()
	});

	test("should initialize an empty settings object for a plugin without settings", () => {
		textSynth.tags['pluginWithoutSettings'] = {}
		textSynth.pluginSettings('upper', {})
		expect(textSynth.pluginSettings('upper')).toEqual({})
	});

	test("should return existing settings for a plugin with settings", () => {
		let result = textSynth.pluginSettings('upper', { settings: { key: 'value' } })
		expect(result).toEqual({ settings: {key: 'value' }})
	});

	test("should merge existing settings with new settings", () => {
		textSynth.tags['pluginWithSettings'] = { settings: { key1: 'value1', key2: 'value2' } }
		const newSettings = { key2: 'newvalue', key3: 'value3' }
		expect(textSynth.pluginSettings('pluginWithSettings', newSettings))
			.toEqual({ key1: 'value1', key2: 'newvalue', key3: 'value3' })
	})
	
})



describe('General Coverage Tests', () => {

	// test('test', () => {
	// 	const input = "[uppercase mixedcaseString]"
	// 	expect(textSynth.merge(input, {_synth: {tess: 'ting', flush_comments: true}})).toBe('THIS IS A TEST')
	// })
	
	// !MULTIPLE PLUGINS
	// describe('Multiple plugins', () => {
	// 	
	// 	test('slugify, replace, uppercase', () => {
	// 		const input = '{{slugify+replace("my", "YOUR")+uppercase: text}}'
	// 		expect(textSynth.merge(input, payload)).toBe('THIS-IS-YOUR-TEXT')
	// 	})
	// 	
	// })

	// !CHECK SINGLE TYPE
	describe('Check for kind in _processSingle', () => {
		
		test('Check for kind in _processSingle', () => {
			let response = textSynth._processSingles('', {})
			expect(response).toBe("")
			//const input = '{{slugify+replace("my", "YOUR")+uppercase: text}}'
			//expect(textSynth.merge(input, payload)).toBe('THIS-IS-YOUR-TEXT')
		})
		
	})

	//!BAD PAYLOaDS
	// describe('Deal with bad payload appropriately.', () => {
	// 	
	// 	test('uppercase', () => {
	// 		const input = '{{uppercase: test.bobz}}'
	// 		expect(textSynth.merge(input, payload)).toBe('')
	// 	})
	// 	
	// })

	
	// test('_getValueFromPath returns undefined for non-existent property path', async () => {
	// 	const payload = {
	// 		test: {
	// 			a: 1,
	// 			b: 2,
	// 		},
	// 	}
	// 	const path = 'test.nonExistent'
	// 	const value = textSynth._getValueFromPath(path, payload)
	// 	expect(value).toBeUndefined()
	// });
	
	// test('_getValueFromPath with undefined path', async () => {
	// 	const path = undefined
	// 	const value = textSynth._getValueFromPath(path, {})
	// 	expect(value).toBe("")
	// });
	
	// test('_getValueFromPath with array path', async () => {
	// 	const path = []
	// 	const value = textSynth._getValueFromPath(path, {})
	// 	expect(value).toStrictEqual([])
	// });
	
	// test('_getValueFromPath with object path', async () => {
	// 	const path = {}
	// 	const value = textSynth._getValueFromPath(path, {})
	// 	expect(value).toStrictEqual({})
	// });

	
	// test('_getValueFromPath returns undefined when a falsy value (empty string) is encountered in the property path', async () => {
	// 	const payload = {
	// 		test: {
	// 			'': 1,
	// 			b: 2,
	// 		},
	// 		}
	// const path = 'test.'
	// const value = textSynth._getValueFromPath(path, payload)
	// expect(value).toBeUndefined()
	// })
	
})
