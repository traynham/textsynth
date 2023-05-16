import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';

const textSynth = await TextSynth({opener: '{{', closer: '}}'});

// !TURN OFF CONSOLE.
//console.log = () => {}

const payload = {
	user: {
		isAdmin: true,
		isMod: false,
	}
}

// !EATCH
describe('Each plugin', () => {


	test('should iterate over an array', () => {
		
		const template = "{{each: items}}- {{value}}\n{{/each}}"
		const payload = {
			items: ['Item 1', 'Item 2', 'Item 3'],
		}
		const expectedResult = `- Item 1- Item 2- Item 3`
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
	
	})

	test('should iterate over an object', () => {
		
		const template = "{{each: items}}- {{name}}: {{value}}\n{{/each}}"
		const payload = {
			items: {
				item1: 'Value 1',
				item2: 'Value 2',
				item3: 'Value 3',
			},
		}
		
		const expectedResult = `- item1: Value 1- item2: Value 2- item3: Value 3`
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
		
	})

	test('should not output anything if array is empty', () => {
		
		const template = "{{each: items}}- {{this}}\n{{/each}}"
		const payload = {
			items: []
		}
		const expectedResult = ''
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
		
	})

	test('should not output anything if object is empty', () => {
		
		const template = "{{each: items}}- {{this.name}}: {{this.value}}\n{{/each}}";
		const payload = {
			items: {}
		}
		const expectedResult = ''
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
		
	})


})

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
	
})

// !SWITCH, CASE, DEFAULT
describe('switch, case, and default plugins', () => {

	test('should render the matching case', () => {
		
		const template = `{{switch: user.role}}{{case: 'admin'}}You are an admin.{{/case}}{{case: 'moderator'}}You are a moderator.{{/case}}{{default}}You are a user.{{/default}}{{/switch}}`
		
		const payload = {
			user: {
				role: 'moderator'
			}
		}
		
		const expectedResult = 'You are a moderator.'
		
		const result = textSynth.merge(template, payload)
		
		expect(result).toBe(expectedResult)
		
	})

	test('should render the default case if no cases match', () => {
		
		const template = `{{switch: user.role}}{{case: 'admin'}}You are an admin.{{/case}}{{case: 'moderator'}}You are a moderator.{{/case}}{{default}}You are a user.{{/default}}{{/switch}}`
		
		const payload = {
			user: {
				role: 'user'
			}
		}
		
		const expectedResult = 'You are a user.'
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
		
	})

	test('should render nothing if no cases match and no default case is provided', () => {
		
		const template = `{{switch: user.role}}{{case: 'admin'}}You are an admin.{{/case}}{{case: 'moderator'}}You are a moderator.{{/case}}{{/switch}}`
		
		const payload = {
			user: {
				role: 'user'
			}
		}
		
		const expectedResult = ''
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
		
	})

})

// !UNLESS
describe('Unless plugin', () => {
	
	test('should render content if condition is falsy', () => {
		
		const template = "{{unless: user.isAdmin}}You're not an admin.{{/unless}}"
		const payload = {
			user: {
				isAdmin: false
			}
		}
		const expectedResult = "You're not an admin."
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
		
	})

	test('should not render content if condition is truthy', () => {
	
		const template = "{{unless: user.isAdmin}}You're not an admin.{{/unless}}";
		const payload = {
			user: {
				isAdmin: true
			}
		}
		const expectedResult = ''
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
		
	})
	
	test('should render content if condition path does not exist', () => {
		
		const template = "{{unless: user.isAdmin}}You're not an admin.{{/unless}}"
		const payload = {}
		const expectedResult = "You're not an admin."
		
		const result = textSynth.merge(template, payload)
		expect(result).toBe(expectedResult)
		
	})

})