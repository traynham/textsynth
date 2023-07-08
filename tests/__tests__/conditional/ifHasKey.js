import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	user: {
		isAdmin: true,
		hasPremiumSubscription: false,
		isUndefined: undefined,
		isNull: null
	}
}

// Turning off console.
console.log = () => {}

describe('ifHasKey plugin', () => {

	test('renders content when the key exists and is truthy', () => {
		const input = "[ifHasKey: user.isAdmin]You're an admin.[/ifHasKey]"
		expect(textSynth.merge(input, payload)).toBe("You're an admin.")
	})

	test('does not render content when the key exists but is falsy', () => {
		const input = "[ifHasKey: user.hasPremiumSubscription]You have a Premium subscription.[/ifHasKey]"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('does not render content when the key does not exist', () => {
		const input = "[ifHasKey: user.isUndefined]You're something.[/ifHasKey]"
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('does not render content when the key path is bogus', () => {
		const input = "[ifHasKey: payload.bogus]You're something.[/ifHasKey]"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('does not render content when the key is null', () => {
		const input = "[ifHasKey: user.isNull]You're null.[/ifHasKey]"
		expect(textSynth.merge(input, payload)).toBe('')
	})

})
