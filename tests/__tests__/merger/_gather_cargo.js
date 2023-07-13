import { describe, expect, test } from '@jest/globals'

import TextSynth from '../index.js'

const textSynth = await TextSynth()
const payload = { testKey: 'testValue' }

describe('_gather_cargo method', () => {
	
	test('correctly gathers cargo', () => {
		
		const args = `#myId .myClass tess='ting' "plainValue" testKey`
		
		const result = textSynth._gather_cargo(args, payload)
		
		expect(result).toEqual({
			attributes: { tess: 'ting' },
			classes: [ 'myClass' ],
			id: 'myId',
			values: [ '"plainValue"', 'testKey' ],
			params: [ 'plainValue', 'testValue' ]
		})
		
	})

	test('returns undefined when no args are provided', () => {
		const result = textSynth._gather_cargo(null, payload)
		expect(result).toBeUndefined()
	});

	test('handles args with only attributes', () => {
		const args = 'id="myId"'
		
		const result = textSynth._gather_cargo(args, payload)
		
		expect(result).toEqual({
			attributes: { id: 'myId' },
			classes: [],
			id: '',
			values: [],
			params: []
		})
		
	})

	test('handles args with only classes', () => {
		
		const args = '.myClass'
		
		const result = textSynth._gather_cargo(args, payload)
		
		expect(result).toEqual({
			attributes: {},
			classes: ['myClass'],
			id: '',
			values: [],
			params: []
		})
		
	})

	test('handles undefined args in payload', () => {
		
		const args = 'plainValue'
		
		const result = textSynth._gather_cargo(args, payload)
		
		expect(result).toEqual({
			attributes: {},
			classes: [],
			id: '',
			values: ['plainValue'],
			params: [undefined]
		})
		
	})
	
	test('handles single arg in payload', () => {
		
		const args = 'testKey'
		
		const result = textSynth._gather_cargo(args, payload)
		
		expect(result).toEqual({
			attributes: {},
			classes: [],
			id: '',
			values: ['testKey'],
			params: ['testValue']
		})
		
	})

})