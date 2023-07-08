import { describe, expect, test } from '@jest/globals';
import TextSynth from '../index.js';

const textSynth = await TextSynth()
textSynth.setDelimiters({opener: '{{', closer: '}}'})

// !TURN OFF CONSOLE.
console.log = () => {}

const payload = {
	user: {
		isAdmin: true,
		isMod: false,
	}
}

// !IF
describe('If plugin', () => {

	test('should show content on true', () => {
		const input = '{{if: user.isAdmin}}Hello Admin{{/if}}'
		expect(textSynth.merge(input, payload)).toBe('Hello Admin')
	})
	
	test('should hide content on false', () => {
		const input = '{{if: user.isMod}}Hello Mod{{/if}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should allow multiple params', () => {
		const input = '{{if: user.isAdmin, user.isMod}}Hello Mod{{/if}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should allow literal params', () => {
		const input = '{{if: true, false}}Hello Mod{{/if}}'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should allow else', () => {
		const input = '{{if: false}}Hello Mod{{else}}else me{{/if}}'
		expect(textSynth.merge(input, payload)).toBe('else me')
	})
	
	test('should not allow multiple else', () => {
		const input = '{{if: false}}Hello Mod{{else}}else me{{else}}boom{{/if}}'
		expect(textSynth.merge(input, payload)).toBe('') // RETURNS EMPTY STRING BECAUSE THROW IS SUPPRESSED IN TEXTSYNTH
	})
	
})
