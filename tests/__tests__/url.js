import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';

const textSynth = await TextSynth({opener: '{{', closer: '}}'});

// !TURN OFF CONSOLE.
console.log = () => {}

// Test payload
const payload = {
  uriComponent: 'https%3A%2F%2Fwww.example.com%2Fpath%3Fquery%3Dtest%26lang%3Den',
  text: 'https://www.example.com/path?query=test&lang=en',
};

// decodeURIComponent plugin tests
describe('decodeURIComponent plugin', () => {

	test('should decode a URI component', () => {
		const input = '{{decodeURIComponent: uriComponent}}'
		expect(textSynth.merge(input, payload)).toBe('https://www.example.com/path?query=test&lang=en')
	})
	
})

// encodeURIComponent plugin tests
describe('encodeURIComponent plugin', () => {
	
	test('should encode a URI component', () => {
		const input = '{{encodeURIComponent: text}}'
		expect(textSynth.merge(input, payload)).toBe('https%3A%2F%2Fwww.example.com%2Fpath%3Fquery%3Dtest%26lang%3Den')
	})

})