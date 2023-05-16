import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';


const textSynth = await TextSynth({opener: '{{', closer: '}}'});

const payload = {
  text: '   this is MY text   ',
  empty_text: '',
  number: 123,
  test: {bob: 'meh'}
};

// !TURN OFF CONSOLE.
//console.log = () => {}

describe('TextMerger default', () => {

	test('pluginDocs should return a string with plugin documentation', async () => {
		const textSynth_default = await TextSynth()
		expect(textSynth_default.opener_raw).toBe('[')
	})
	
})

describe('General Coverage Tests', () => {

	// !MULTIPLE PLUGINS
	describe('Multiple plugins', () => {
		
		test('slugify, replace, uppercase', () => {
			const input = '{{slugify+replace("my", "YOUR")+uppercase: text}}'
			expect(textSynth.merge(input, payload)).toBe('THIS-IS-YOUR-TEXT')
		})
		
	})
	
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
	describe('Deal with bad payload appropriately.', () => {
		
		test('uppercase', () => {
			const input = '{{uppercase: test.bobz}}'
			expect(textSynth.merge(input, payload)).toBe('')
		})
		
	})
	
	test('_getValueFromPath returns undefined for non-existent property path', async () => {
		const payload = {
			test: {
				a: 1,
				b: 2,
			},
		}
		const path = 'test.nonExistent'
		const value = textSynth._getValueFromPath(path, payload)
		expect(value).toBeUndefined()
	});
	
	test('_getValueFromPath with undefined path', async () => {
		const path = undefined
		const value = textSynth._getValueFromPath(path, {})
		expect(value).toBe("")
	});
	
	test('_getValueFromPath with array path', async () => {
		const path = []
		const value = textSynth._getValueFromPath(path, {})
		expect(value).toStrictEqual([])
	});
	
	test('_getValueFromPath with object path', async () => {
		const path = {}
		const value = textSynth._getValueFromPath(path, {})
		expect(value).toStrictEqual({})
	});
	
	test('_getValueFromPath returns undefined when a falsy value (empty string) is encountered in the property path', async () => {
		const payload = {
			test: {
				'': 1,
				b: 2,
			},
			}
	const path = 'test.'
	const value = textSynth._getValueFromPath(path, payload)
	expect(value).toBeUndefined()
	})
	
})