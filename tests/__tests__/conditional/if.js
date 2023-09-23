import { describe, expect, test } from '@jest/globals';
import TextSynth from '../index.js';

const textSynth = await TextSynth()

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
		const input = '[if: user.isAdmin]Hello Admin[/if]'
		expect(textSynth.merge(input, payload)).toBe('Hello Admin')
	})
	
	test('should hide content on false', () => {
		const input = '[if: user.isMod]Hello Mod[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('do not show content on bogus key', () => {
		const input = '[if: bogus]Hello Admin[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('valid string should resolve as truthy', () => {
		const input = '[if: "bogus"]Hello Admin[/if]'
		expect(textSynth.merge(input, payload)).toBe('Hello Admin')
	})
	
	test('a string of "true" should be cast as true.', () => {
		const input = '[if: "true"]Hello Admin[/if]'
		expect(textSynth.merge(input, payload)).toBe('Hello Admin')
	})
	
	test('a string of "false" should be cast as false.', () => {
		const input = '[if: "false"]Hello Admin[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('should allow multiple params', () => {
		const input = '[if: user.isAdmin, user.isMod]Hello Mod[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should allow literal params', () => {
		const input = '[if: true, false]Hello Mod[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	// NOT CURRENTLY SUPPORTED
	// test('should allow else', () => {
	// 	const input = '[if: false]Hello Mod[else]else me[/if]'
	// 	expect(textSynth.merge(input, payload)).toBe('else me')
	// })
	
	test('should not allow multiple else', () => {
		const input = '[if: false]Hello Mod[else]else me[else]boom[/if]'
		expect(textSynth.merge(input, payload)).toBe('') // RETURNS EMPTY STRING BECAUSE THROW IS SUPPRESSED IN TEXTSYNTH
	})
	
})

describe('If plugin conditionals', () => {
	
	test('should allow "==" equality', () => {
		const input = `[if: 'one' == 'one']Hello Mod[/if]`
		expect(textSynth.merge(input, payload)).toBe('Hello Mod')
	})
	
	test('should allow "===" equality', () => {
		const input = `[if: user.isAdmin === true]Hello Mod[/if]`
		expect(textSynth.merge(input, payload)).toBe('Hello Mod')
	})
	
	test('should allow "!=" equality', () => {
		const input = `[if: user.isAdmin != false]Hello Mod[/if]`
		expect(textSynth.merge(input, payload)).toBe('Hello Mod')
	})
	
	test('should allow "!==" equality', () => {
		const input = `[if: user.isAdmin !== false]Hello Mod[/if]`
		expect(textSynth.merge(input, payload)).toBe('Hello Mod')
	})
	
	test('should allow ">" operator', () => {
		const input = `[if: 5 > 0]Bigger[/if]`
		expect(textSynth.merge(input, payload)).toBe('Bigger')
	})
	
	test('should allow "<" operator', () => {
		const input = `[if: 0 < 5]Smaller[/if]`
		expect(textSynth.merge(input, payload)).toBe('Smaller')
	})
	
	test('should allow "<=" operator', () => {
		const input = `[if: 5 <= 5]Smaller[/if]`
		expect(textSynth.merge(input, payload)).toBe('Smaller')
	})
	
	test('should allow ">=" operator', () => {
		const input = `[if: 5 >= 5]Smaller[/if]`
		expect(textSynth.merge(input, payload)).toBe('Smaller')
	})
	
})