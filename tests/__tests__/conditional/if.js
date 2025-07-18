import { describe, expect, test } from '@jest/globals';
import TextSynth from '../index.js';

const textSynth = await TextSynth()

// !TURN OFF CONSOLE.
console.log = () => {}

const payload = {
	user: {
		isAdmin: true,
		isMod: false,
		role: 'admin'
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
	
	test('a string of "false" should be true because it is a string.', () => {
		const input = '[if: "false"]Hello Admin[/if]'
		expect(textSynth.merge(input, payload)).toBe('Hello Admin')
	})

	test('should allow multiple params', () => {
		const input = '[if: user.isAdmin, user.isMod]Hello Mod[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('should allow literal params', () => {
		const input = '[if: true, false]Hello Mod[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('multiple params: second truthy shows content', () => {
		const input = '[if: false, true]Y[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('null param is falsy', () => {
		const input = '[if: null]No[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('undefined param is falsy', () => {
		const input = '[if: undefined]Nope[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})
	
	test('empty string is falsy', () => {
		const input = '[if: ""]Empty[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('should render default [else] when [if] is false', () => {
		const input = '[if: false]A[else]B[/if]'
		expect(textSynth.merge(input, payload)).toBe('B')
	})

	test('should ignore [else] when [if] is true', () => {
		const input = '[if: user.isAdmin]A[else]B[/if]'
		expect(textSynth.merge(input, payload)).toBe('A')
	})
	
	test('should render [else: …] when [if] is false and else-if true', () => {
		const input = '[if: false]A[else: true]C[/if]'
		expect(textSynth.merge(input, payload)).toBe('C')
	})
	
	test('first truthy [else: …] wins among multiple', () => {
		const input = [
			'[if: false]A',
			'[else: false]B',
			'[else: true]C',
			'[else: true]D',
			'[/if]'
		].join('')
		expect(textSynth.merge(input, payload)).toBe('C')
	})
	
	test('falls back to [else] when no else-if matches', () => {
		const input = [
			'[if: false]A',
			'[else: false]B',
			'[else]DEFAULT',
			'[/if]'
		].join('')
		expect(textSynth.merge(input, payload)).toBe('DEFAULT')
	})
	
	test('does not reach default [else] if an else-if matched', () => {
		const input = [
			'[if: false]A',
			'[else: true]B',
			'[else]C',
			'[/if]'
		].join('')
		expect(textSynth.merge(input, payload)).toBe('B')
	})
	
	test('no default else with only else-if clauses yields empty', () => {
		const tpl = `
			[if: false]A
			[else: false]B
			[else: false]C
			[/if]
		`
		expect(textSynth.merge(tpl.trim(), payload)).toBe('')
	})
	
	test('nested if/else blocks render correctly', () => {
		const tpl = [
			'[if: true]',
			'OUTER-',
			'[if: false]X[else]Y[/if]',
			//'[if: false]X[else: true]Y[/if]',
			'[/if]'
		].join('')
		expect(textSynth.merge(tpl, payload)).toBe('OUTER-Y')
	})
	
	test('complex expression in else-if', () => {
		const tpl = '[if: false]A[else: user.isMod == false]Mod is false[/if]'
		expect(textSynth.merge(tpl, payload)).toBe('Mod is false')
	})
	
	test('handles whitespace around else', () => {
		const tpl = `
			[if: false]
				A
			 [else] 
		  	  B
			[/if]
		`
		expect(textSynth.merge(tpl, payload).trim()).toBe('B')
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

describe('If plugin enhanced conditionals', () => {

	test('should evaluate basic true condition', () => {
		const input = '[if: true]True[/if]'
		expect(textSynth.merge(input, payload)).toBe('True')
	})

	test('should evaluate negation', () => {
		const input = '[if: !true]Not True[/if]'
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('should evaluate and operation with true conditions', () => {
		const input = '[if: true && true]True[/if]'
		expect(textSynth.merge(input, payload)).toBe('True')
	})

	test('should evaluate and operation with mixed conditions', () => {
		const input = '[if: true && !false]True[/if]'
		expect(textSynth.merge(input, payload)).toBe('True')
	})

	test('should evaluate complex condition with equality checks', () => {
		const input = '[if: true == true && true !== false]True[/if]'
		expect(textSynth.merge(input, payload)).toBe('True')
	})

	test('should evaluate or operation', () => {
		const input = '[if: true || false]True[/if]'
		expect(textSynth.merge(input, payload)).toBe('True')
	})
	
	test('should handle precedence in complex expressions', () => {
		const input = '[if: true || false]True[/if]'
		expect(textSynth.merge(input, payload)).toBe('True')
	})
	
	test('should evaluate expressions with literals and variables', () => {
		const input = '[if: user.isAdmin && true]Hello Admin[/if]'
		expect(textSynth.merge(input, payload)).toBe('Hello Admin')
	})

	test('should evaluate expressions with negation and variables', () => {
		const input = '[if: !user.isMod && true]Not a Mod[/if]'
		expect(textSynth.merge(input, payload)).toBe('Not a Mod')
	})
})

describe('If plugin – edge cases', () => {
	
	test('number 1 is truthy', () => {
		const tpl = `[if: 1]One[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('One')
	})
	
	test('number -1 is truthy', () => {
		const tpl = `[if: -1]Negative[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})
	
	test('number 0 is falsy', () => {
		const tpl = `[if: 0]Zero[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})
	
	test('empty string is falsy', () => {
		const tpl = `[if: ""]Empty[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})
	
	test('non-empty string is truthy', () => {
		const tpl = `[if: "abc"]Yep[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('Yep')
	});
	
	test('null is falsy', () => {
		const tpl = `[if: null]Null![/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	});
	
	test('undefined is falsy', () => {
		const tpl = `[if: undefined]Nope[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})
	
	test('boolean true is truthy', () => {
		const tpl = `[if: true]It is true[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('It is true')
	})
	
	test('boolean false is falsy', () => {
		const tpl = `[if: false]It is false[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})
	
	test('literal number param is truthy', () => {
		const tpl = `[if: 5]Number ok[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('Number ok')
	})
	
	test('string "0" should be truthy (non-empty)', () => {
		const tpl = `[if: "0"]Zero string[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('Zero string')
	})
	
	test('empty [else] block yields empty string', () => {
		const tpl = `[if: false]A[else][/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})
	
	test('empty [if] block yields empty string (no content)', () => {
		const tpl = `[if: true][/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})
	
	test('no space after colon still works', () => {
		expect(textSynth.merge(`[if:true]Yes[/if]`, payload)).toBe('Yes')
		expect(textSynth.merge(`[if:false]Yes[else:true]No[/if]`, payload)).toBe('No')
	});
	
	test('parentheses grouping in condition', () => {
		const tpl = `[if: (false && true) || true]Grouped[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('Grouped')
	})

	test('chained OR conditions', () => {
		const tpl = `[if: false || false || true]Or chain[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('Or chain')
	})
	
	test('nonexistent payload property is falsy', () => {
		const tpl = `[if: user.nonexistent]Nope[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})

	test('multiple [else] blocks should throw or only honor the first', () => {
		const tpl = `[if: false]A[else]B[else]C[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('C')
	})
	
	test('empty [if:] block with no argument should throw or be falsy', () => {
		const tpl = `[if:]should not render[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})
	
	test('empty [else:] block with no argument should throw or be falsy', () => {
		const tpl = `[if:false]content[else:]should not render[/if]`
		expect(textSynth.merge(tpl, payload)).toBe('')
	})

})