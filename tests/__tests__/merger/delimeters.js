import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'


const payload = {
	string: 'Time Travel for Fun and Profit'
}

const expected = '<div data-general="Things" class="class" id="myID">Time Travel for Fun and Profit</div>'

const delimiters = [
	['[', ']'],
	['[-', ']'],
	//['[-', '--]'], // BREAKS
	['[%', '%]'],
	['{', '}'],
	['_', '_'],
	['[[', ']]'],
	['{{', '}}'],
	['<%', '%>'],
	['<<', '>>'],
	//['<', '>'], // SHOULD FAIL. Single angle brackets are ignored in setDelimiters() method.
	['<{[', ']}>']
]

// Turning off console.
console.log = () => {}

describe('capitalize plugin', () => {

	delimiters.forEach( del => {
		
		test(`test ${del[0]} and ${del[1]} delimiters`, async () => {
			const textSynth = await TextSynth({ delimiters: del })
			const input = `${del[0]}div .class #myID data-general="Things"${del[1]}${payload.string}${del[0]}/div${del[1]}`
			expect(textSynth.merge(input, payload)).toBe(expected)
		})
		
	})

})
