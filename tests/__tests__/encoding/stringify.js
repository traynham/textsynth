import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	data: {
		user: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			roles: ['admin', 'moderator']
		},
		tasks: ['task1', 'task2', 'task3']
	}
}

// Turning off console.
console.log = () => {}

describe('stringify plugin', () => {

	test('converts a JavaScript value to a JSON string', () => {
		const input = "[stringify data]"
		const expectedOutput = JSON.stringify(payload.data)
		expect(textSynth.merge(input, payload)).toBe(expectedOutput)
	})

	// test('returns an empty string when the content is null', () => {
	// 	const input = "[stringify null]"
	// 	expect(textSynth.merge(input, payload)).toBe('null')
	// })

	// test('returns an empty string when the content is undefined', () => {
	// 	const input = "[stringify undefined]"
	// 	expect(textSynth.merge(input, payload)).toBe('')
	// })
	
})
