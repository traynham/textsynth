import { describe, expect, test } from '@jest/globals'

import TextSynth from '../index.js'

const textSynth = await TextSynth()
const payload = { testKey: 'testValue' }

// Turning off console.
console.log = () => {}

describe('_gather_cargo method', () => {
	
	test('correctly gathers cargo', () => {
		const args = `#myId .myClass tess="ting" "plainValue" testKey`
		const result = textSynth._gather_cargo(args, payload)		
		expect(result.attributes).toEqual({ tess: 'ting' })
		expect(result.classes).toEqual([ 'myClass' ])
		expect(result.id).toEqual('myId')
		expect(result.values).toEqual([ '"plainValue"', 'testKey' ])
		expect(result.using).toEqual(null)
		expect(result.params).toEqual([ 'plainValue', 'testValue' ])
	})

	test('returns undefined when no args are provided', () => {
		const result = textSynth._gather_cargo(null, payload)
		expect(result).toBeUndefined()
	});

	test('handles args with only one attribute', () => {
		const args = 'id="myId"'
		const result = textSynth._gather_cargo(args, payload)
		expect(result.attributes).toEqual({ id: 'myId' })
	})
	
	test('handles args with two attributes', () => {
		const args = 'id="myId" another="thing"'
		const result = textSynth._gather_cargo(args, payload)
		expect(result.attributes).toEqual({ another: "thing", id: 'myId' })
	})

	test('handles args with only classes', () => {
		const args = '.myClass'
		const result = textSynth._gather_cargo(args, payload)
		expect(result.classes).toEqual(['myClass'])
	})
	
	test('handles args with multiple classes', () => {
		const args = '.myClass .myOtherClass .myOtherClassIsAnID'
		const result = textSynth._gather_cargo(args, payload)
		expect(result.classes).toEqual(['myClass', 'myOtherClass', 'myOtherClassIsAnID'])
	})

	test('handles undefined args in payload', () => {
		const args = 'plainValue'
		const result = textSynth._gather_cargo(args, payload)
		expect(result.values).toEqual(['plainValue'])
		expect(result.params).toEqual([undefined]) // Not sure this is desired.
	})
	
	test('handles quoted strings', () => {
		const args = `"required" "selected" 'another with spaces'`
		const result = textSynth._gather_cargo(args, payload)
		expect(result.values).toEqual(['"required"', '"selected"',  "'another with spaces'"])
	})
	
	test('handles single arg in payload', () => {
		const args = 'testKey'
		const result = textSynth._gather_cargo(args, payload)
		expect(result.values).toEqual(['testKey'])
		expect(result.params).toEqual(['testValue'])	
	})

})