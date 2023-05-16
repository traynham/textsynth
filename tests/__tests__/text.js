import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';

const textSynth = await TextSynth({opener: '{{', closer: '}}'});

const payload = {
  text: 'some text',
  empty_text: '',
  number: 123,
};

// !TURN OFF CONSOLE.
console.log = () => {}
	
// !CAMEL CASE
describe('camelCase plugin', () => {

	test('should convert string to camel case', () => {
		const input = '{{camelcase: text}}'
		expect(textSynth.merge(input, payload)).toBe('someText')
	})
	
	test('should handle empty strings', () => {
		const input = '{{camelcase: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should handle non-string inputs', () => {
		const input = '{{camelcase: number}}'
		expect(textSynth.merge(input, payload)).toBe('123')
	})

})

// !CAPITALIZE
describe('capitalize plugin', () => {

	test('should capitalize the first letter of a string', () => {
		const input = '{{capitalize: text}}'
		expect(textSynth.merge(input, payload)).toBe('Some text')
	})
	
	test('should handle empty strings', () => {
		const input = '{{capitalize: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})

})

// !LOWERCASE
describe('lowercase plugin', () => {
	
	test('should convert string to lowercase', () => {
		const input = '{{lowercase: text}}'
		expect(textSynth.merge(input, payload)).toBe('some text')
	})
	
	test('should handle empty strings', () => {
		const input = '{{lowercase: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should handle non-string inputs', () => {
		const input = '{{lowercase: number}}'
		expect(textSynth.merge(input, payload)).toBe('123')
	})

})

/*
// !PAD END
describe('padEnd plugin', () => {
	
	test('should pad the string at the end with specified character and length', () => {
		const input = '{{padEnd(10, -): text}}'
		expect(textSynth.merge(input, payload)).toBe('some text-')
	})
	
	test('should handle empty strings', () => {
		const input = '{{padEnd(3, *): empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('***')
	})

})

// !PAD START
describe('padStart plugin', () => {

	test('should pad the string at the start with specified character and length', () => {
		const input = '{{padStart(10, -): text}}'
		expect(textSynth.merge(input, payload)).toBe('-some text')
	})
	
	test('should handle empty strings', () => {
		const input = '{{padStart(3, *): empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('***')
	})

})
*/
// !REAPEAT
describe('repeat plugin', () => {

	test('repeat plugin should repeat the string n times', () => {
		const input = '{{repeat(3): text}}'
		expect(textSynth.merge(input, payload)).toBe('some textsome textsome text')
	})

})

// !REPLACE
describe('replace plugin', () => {

	test('replace plugin should replace the specified substring', () => {
		const input = '{{replace("some", "any"): text}}'
		expect(textSynth.merge(input, payload)).toBe('any text')
	})

})

// !SLUGIFY
describe('slugify plugin', () => {
	
	test('should convert string to a slug', () => {
		const input = '{{slugify: text}}'
		expect(textSynth.merge(input, payload)).toBe('some-text')
	})
	
	test('should handle empty strings', () => {
		const input = '{{slugify: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should handle non-string inputs', () => {
		const input = '{{slugify: number}}'
		expect(textSynth.merge(input, payload)).toBe('123')
	})
	
})

// !SNAKE CASE
describe('snakeCase plugin', () => {
	
	test('should convert string to snake case', () => {
		const input = '{{snakecase: text}}'
		expect(textSynth.merge(input, payload)).toBe('some_text')
	})
	
	test('should handle empty strings', () => {
		const input = '{{snakecase: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should handle non-string inputs', () => {
		const input = '{{snakecase: number}}'
		expect(textSynth.merge(input, payload)).toBe('123')
	})

})

// !SUBSTRING
describe('substring plugin', () => {

	test('substring plugin should return a substring based on the provided indices', () => {
		const input = '{{substring(0, 4): text}}'
		expect(textSynth.merge(input, payload)).toBe('some')
	})
	
	test('should handle non-string inputs', () => {
		const input = '{{substring(0, 4): number}}'
		expect(textSynth.merge(input, payload)).toBe('123')
	})
	
	test('should handle empty params', () => {
		const input = '{{substring(): text}}'
		expect(textSynth.merge(input, payload)).toBe('some text')
	})

})

// !TITLE CASE
describe('titleCase plugin', () => {

	test('should convert string to title case', () => {
		const input = '{{titlecase: text}}'
		expect(textSynth.merge(input, payload)).toBe('Some Text')
	})
	
	test('should handle empty strings', () => {
		const input = '{{titlecase: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should handle non-string inputs', () => {
		const input = '{{titlecase: number}}'
		expect(textSynth.merge(input, payload)).toBe('123')
	})

})

// !TRIM
describe('trim plugin', () => {

	test('trim plugin should remove leading and trailing whitespace', () => {
		const input = '{{trim: whitespace_text}}'
		const whitespace_payload = {
			whitespace_text: '   some text   ',
		}
		expect(textSynth.merge(input, whitespace_payload)).toBe('some text')
	})

})


// !TRUNCATE
describe('truncate plugin', () => {

	test('should truncate the string to the specified length', () => {
		const input = '{{truncate(4, "..."): text}}'
		expect(textSynth.merge(input, payload)).toBe('some...')
	})
	
	test('should handle empty strings', () => {
		const input = '{{truncate(3): empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})

})

// !Uppercase
describe('uppercase plugin', () => {
	
	test('should convert string to uppercase', () => {
		const input = '{{uppercase: text}}'
		expect(textSynth.merge(input, payload)).toBe('SOME TEXT')
	})

	test('should handle empty strings', () => {
		const input = '{{uppercase: empty_text}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})

	// test('should handle non-string inputs', () => {
	// 	const input = '{{uppercase: number}}'
	// 	expect(textSynth.merge(input, payload)).toBe('123')
	// })

})