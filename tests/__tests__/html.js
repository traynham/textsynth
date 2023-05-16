import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';

const textSynth = await TextSynth({opener: '{{', closer: '}}'});


// Test payload
const payload = {
    html: '<p>Hello, <strong>world!</strong></p>',
    links: {
        Home: 'https://example.com',
        About: 'https://example.com/about',
        Contact: 'https://example.com/contact'
    },
    empty_links: {}
}

// !TURN OFF CONSOLE.
console.log = () => {}

// !ESCAPEHTML
describe('escapeHtml plugin', () => {

    test('should escape HTML entities', () => {
        const input = '{{escapeHtml: html}}'
        expect(textSynth.merge(input, payload)).toBe('&lt;p&gt;Hello, &lt;strong&gt;world!&lt;/strong&gt;&lt;/p&gt;')
    })

})

// !link_list plugin tests
describe('link_list plugin', () => {

	test('should generate an HTML list of links', () => {
		const input = '{{linkList: links}}'
		expect(textSynth.merge(input, payload)).toBe('<ul><li><a href="https://example.com">Home</a></li><li><a href="https://example.com/about">About</a></li><li><a href="https://example.com/contact">Contact</a></li></ul>')
	})

	test('should handle empty arrays', () => {
		const input = '{{linkList: empty_links}}'
		expect(textSynth.merge(input, payload)).toBe('<ul></ul>')
    })

})


// !STRIPHTML
describe('stripHtml plugin', () => {
  
    test('should remove HTML tags from the input', () => {
        const input = '{{stripHtml: html}}'
        expect(textSynth.merge(input, payload)).toBe('Hello, world!')
    })
  
})


// !UNESCAPEHTML
describe('unescapeHtml plugin', () => {
    
    test('should unescape HTML entities', () => {
        const input = '{{unescapeHtml: "&lt;p&gt;Hello, &lt;strong&gt;world!&lt;/strong&gt;&lt;/p&gt;"}}'
        expect(textSynth.merge(input, payload)).toBe('<p>Hello, <strong>world!</strong></p>')
    })
  
})
