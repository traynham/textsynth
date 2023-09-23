import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Test payload
const payload = {
	isAdmin: false,
	hasPremiumSubscription: true,
	isUndefined: undefined,
	isNull: null
}

// Turning off console.
console.log = () => {}

describe('unless plugin', () => {

	test('renders content when the condition is falsy', () => {
		const input = "[unless: isAdmin]You're not an admin.[/unless]"
		expect(textSynth.merge(input, payload)).toBe("You're not an admin.")
	})

	test('does not render content when the condition is truthy', () => {
		const input = "[unless: hasPremiumSubscription]Upgrade to Premium for more features.[/unless]"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('renders content when the condition is undefined', () => {
		const input = "[unless: isUndefined]Condition is undefined.[/unless]"
		expect(textSynth.merge(input, payload)).toBe('Condition is undefined.')
	})

	test('renders content when the condition is null', () => {
		const input = "[unless: isNull]Condition is null.[/unless]"
		expect(textSynth.merge(input, payload)).toBe('Condition is null.')
	})

})