import path from 'path'
import process from 'process'

import { describe, expect, test } from '@jest/globals';
import TextSynth from '../../index.js';

const textSynth = await TextSynth({opener: '{{', closer: '}}'});

// !TURN OFF CONSOLE.
//console.log = () => {}

describe('stringifyPlugin', () => {

test('stringify a simple object', () => {
	const template = 'Object: {{stringify: object}}';
	const payload = { object: { key: 'value' } };
	const result = textSynth.merge(template, payload);
	expect(result).toBe('Object: {"key":"value"}');
  });

  test('stringify an array', () => {
	const template = 'Array: {{stringify: array}}';
	const payload = { array: [1, 2, 3] };
	const result = textSynth.merge(template, payload);
	expect(result).toBe('Array: [1,2,3]');
  });

  test('stringify a string', () => {
	const template = 'String: {{stringify: string}}';
	const payload = { string: 'text' };
	const result = textSynth.merge(template, payload);
	expect(result).toBe('String: "text"');
  });

  test('stringify a number', () => {
	const template = 'Number: {{stringify: number}}';
	const payload = { number: 42 };
	const result = textSynth.merge(template, payload);
	expect(result).toBe('Number: 42');
  });

  test('stringify a boolean', () => {
	const template = 'Boolean: {{stringify: bool}}';
	const payload = { bool: true };
	const result = textSynth.merge(template, payload);
	expect(result).toBe('Boolean: true');
  });

  test('stringify null', () => {
	const template = 'Null: {{stringify: nullValue}}';
	const payload = { nullValue: null };
	const result = textSynth.merge(template, payload);
	expect(result).toBe('Null: null');
  });
  
});

let INIT_CWD = process.env.INIT_CWD

describe('Include', () => {

	test('Include "test.synth"', () => {
		
		let thePath = path.join(INIT_CWD, 'tests/__tests__/test.synth')
		
		const template = `Include: {{include: '${thePath}'}}`
		const payload = {}
		const result = textSynth.merge(template, payload)
		
		expect(result).toBe('Include: TeSt')
		
	})
	
	test('Include "test" should add ".synth" extension.', () => {
		
		let thePath = path.join(INIT_CWD, 'tests/__tests__/test')
		
		const template = `Include: {{include: '${thePath}'}}`
		const payload = {}
		const result = textSynth.merge(template, payload)
		
		expect(result).toBe('Include: TeSt')
		
	})
	
	test('Include "", should throw error.', () => {
		
		const template = `Include: {{include: ''}}`
		const payload = {}
		
		expect(
			() => textSynth.merge(template, payload)
		).toThrow('No file specified for include tag')
		
	})
	
	test('Include "bob.txt" should fail because of extension.', () => {
		
		const template = `Include: {{include: 'bob.txt'}}`
		const payload = {}
		
		expect(
			() => textSynth.merge(template, payload)
		).toThrow('Include file has wrong extension: .txt')
		
	})
	
	
	test('Include "../../test.synth" should fail under Express scenario.', () => {
		
		let thePath = '../../test.synth'
		
		const template = `Include: {{include: '${thePath}'}}`
		const payload = {
			settings: {
				views: path.join(INIT_CWD, 'core/textsynth/__tests__')
			}
		}
		
		expect(
			() => textSynth.merge(template, payload)
		).toThrow('Include file is outside of views folder: ../../test.synth requested from undefined')
		
	})
	

})


// !LOG
describe('camelCase plugin', () => {

	test('should convert string to camel case', () => {
		const input = `{{log: 'This is a test'}}`
		expect(textSynth.merge(input, {})).toBe('undefined')
	})
	

})