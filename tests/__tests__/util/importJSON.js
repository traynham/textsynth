import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

textSynth.flush_comments = false

const payload = {
  _synth: {
	//views: './tests/support/views'
	views: './tests/support/views'
  }
}

// Turning off console.
//console.log = () => {}

describe('importJSON plugin using simple syntax', () => {
	
	test('importJSON with a valid JSON file.', async () => {
		const input = "[importJSON: 'valid.json']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('') // Expect no error message
	})

	test('importJSON with an invalid JSON file.', async () => {
		const input = "[importJSON: 'invalid.json']"
		const result = await textSynth.merge(input, payload)
		const expected = result.includes('ERROR: Failed to parse JSON: ›')	
		expect(expected).toBe(true) 
	})

	test('importJSON with a non-json file extension.', async () => {
		const input = "[importJSON: 'wrong_extension.txt']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe(`ERROR: Invalid extension › '.txt'`)
	})

	test('importJSON with a non-existing file.', async () => {
		const input = "[importJSON: 'not_exists.json']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: JSON file does not exist: /Users/Shared/srv/node/modules/textsynth/app/tests/support/views/not_exists.json')
	})

	test('importJSON with no content should throw error.', async () => {
		const input = "[importJSON: '']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: No file specified for importJSON tag')
	})

	test('importJSON with an empty string should throw error.', async () => {
		const input = "[importJSON: '']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: No file specified for importJSON tag')
	})
		
	test('ImportJSON using page data.', async () => {
		let payload = {url: 'http://127.0.0.1:3000/records.json6'}
		let template = 
			'---\n' +
			"importJSON: 'http://127.0.0.1:3000/records.json6'\n" +
			'---\n' +
			'[JSON.title]'
		
		const result = await textSynth.merge(template, payload)
		expect(result).toBe('This is the most amazing title in the world. Everyone says so!!')
	})
	
	test('ImportJSON using page data.', async () => {
		let payload = {url: 'http://127.0.0.1:3000/records.json6'}
		let template = 
			'---\n' +
			"importJSON: [data using 'http://127.0.0.1:3000/records.json6']\n" +
			'---\n' +
			'[data.title]'
		
		const result = await textSynth.merge(template, payload)
		expect(result).toBe('This is the most amazing title in the world. Everyone says so!!')
	})

})

describe('importJSON plugin with using syntax', () => {
	
	test('importJSON with a valid JSON file and custom name.', async () => {
		const input = "[importJSON: customName using 'valid.json']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('') // Expect no error message
	})

	test('importJSON with an invalid JSON file and custom name.', async () => {
		const input = "[importJSON: customName using 'invalid.json']"
		const result = await textSynth.merge(input, payload)		
		const expected = result.includes('ERROR: Failed to parse JSON: ›')	
		expect(expected).toBe(true) 
	})

	test('importJSON with a non-json file extension and custom name.', async () => {
		const input = "[importJSON: customName using 'wrong_extension.txt']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe(`ERROR: Invalid extension › '.txt'`)
	})

	test('importJSON with a non-existing file and custom name.', async () => {
		const input = "[importJSON: customName using 'not_exists.json']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: JSON file does not exist: /Users/Shared/srv/node/modules/textsynth/app/tests/support/views/not_exists.json')
	})
	
	test('importJSON with no file specified and custom name should throw error.', async () => {
		const input = "[importJSON: customName using '']"
		const result = await textSynth.merge(input, payload)
		expect(result.trim()).toBe('ERROR: No file specified for importJSON tag')
	})
	
})

describe('importJSON plugin with using syntax', () => {

	test('importJSON with a url.', async () => {
		const input = "[importJSON: customName using 'http://127.0.0.1:3000/records.json6']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('') // Expect no error message
	})
	
	let url_tests = [
		{url: '%20http://127.0.0.1:3000', expect: `ERROR: Content could not be parsed as JSON › http://127.0.0.1:3000/`},
		{url: 'http://localhost/info', expect: `ERROR: Forbidden domain › localhost`},
		{url: 'ftp://example.com/resource', expect: `ERROR: Forbidden protocol › ftp:`},
		{url: 'http://////127.0.0.1:3000/records.json6', expect: ``},
		{url: 'http://127.0.0.1:999999/records.json6', expect: `ERROR: Invalid URL › http://127.0.0.1:999999/records.json6`},
		{url: 'javascript:alert(1)', expect: `ERROR: Forbidden protocol › javascript:`},
		
		//{url: 'http://127.0.0.1:3000/%252e%252e/foo', expect: ``},
		//{url: 'http://127.0.0.1:3000/#javascript:1', expect: ``},
		//{url: 'http://127.0.0.1:3000/@@@', expect: ``},
		//{url: 'http://127.0.0.1:3000/test?test=ting&sum=ting', expect: ``},
		//{url: 'http://127.0.0.1:3000/?foo=%00', expect: ``},
		//{url: 'http://127.0.0.1:3000/../secret', expect: ``},
		//{url: 'https://[::1]/info', expect: `ERROR: Forbidden domain › localhost`},
		//{url: 'file:///etc/passwd', expect: `ERROR: Forbidden protocol › file:`}
	]
	
	url_tests.forEach(check => {
		test(check.url, async () => {
			const input = `"[importJSON: '${check.url}']"`
			const result = await textSynth.merge(input, payload)
			//console.log('THE RESULT::', result)
			expect(result.trim()).toBe(`"${check.expect}"`) // Expect no error message
		})
	})
	
	/*
	test('importJSON with a url.', async () => {
		const input = "[importJSON: 'ftp://example.com/resource']"
		const result = await textSynth.merge(input, payload)		
		expect(result.trim()).toBe('') // Expect no error message
	})
	*/

})