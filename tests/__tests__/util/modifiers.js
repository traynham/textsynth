import { expect, describe, test } from '@jest/globals';
import TextSynth from '../index.js';

const textSynth = await TextSynth();

// Simple payload for most tests
const payload = {
	name: "Test String",
	test: "This is a TEST",
	txt: "xoxo",
	nested: { name: "hello" }
};

describe('inline plugin modifiers', () => {

	test('applies a single modifier plugin (uppercase)', () => {
		const input = '[payload.name.uppercase()]';
		const output = textSynth.merge(input, { payload });
		expect(output).toBe('TEST STRING');
	});

	test('applies a modifier plugin with arguments (replace)', () => {
		const input = "[payload.txt.replace('x','y')]";
		const output = textSynth.merge(input, { payload });
		expect(output).toBe('yoyo');
	});

	test('chains multiple modifier plugins', () => {
		const input = "[payload.txt.replace('x','y').replace('y','z').uppercase()]";
		const output = textSynth.merge(input, { payload });
		expect(output).toBe('ZOZO');
	});

	test('handles unknown plugins in chain gracefully (skipped)', () => {
		const input = "[payload.name.foobar().uppercase()]";
		const output = textSynth.merge(input, { payload });
		// foobar() should be skipped; uppercase should still work
		expect(output).toBe('TEST STRING');
	});

	test('handles only unknown/container plugins (skipped, returns base)', () => {
		const input = "[payload.name.foobar().containerFake()]";
		const output = textSynth.merge(input, { payload });
		// Both are skipped, so value is unchanged
		expect(output).toBe('Test String');
	});

	test('works with nested objects and modifiers', () => {
		const input = "[payload.nested.name.uppercase()]";
		const output = textSynth.merge(input, { payload });
		expect(output).toBe('HELLO');
	});

	// If you want to test that original value is returned for empty chains
	test('returns the original value if no plugins are present', () => {
		const input = "[payload.name]";
		const output = textSynth.merge(input, { payload });
		expect(output).toBe('Test String');
	});
	
	test('applies tag after modifiers: [upper: name.slugify()]', () => {
		const input = '[upper: test.slugify()]';
		//const payload = { name: "This is a TEST" };
		const output = textSynth.merge(input, payload );
		// 'This is a TEST' -> 'this-is-a-test' (slugify), then UPPERCASE
		expect(output).toBe('THIS-IS-A-TEST');
	});
	
	test('applies tag after multiple modifiers: [upper: name.slugify().replace("test", "Bob")]', () => {
		const input = "[upper: test.slugify().replace('test','Bob')]";
		//const payload = { name: "This is a TEST" };
		const output = textSynth.merge(input, payload);
		// 'This is a TEST' -> 'this-is-a-test' (slugify), 'this-is-a-Bob' (replace), then UPPERCASE
		expect(output).toBe('THIS-IS-A-BOB');
	});
	
	test('skips container tag used as modifier: [payload.name.if().uppercase()]', () => {
		const input = '[payload.name.if().uppercase()]';
		const output = textSynth.merge(input, { payload });
		// The 'if' plugin is a container and should be ignored.
		// uppercase() should be applied to payload.name.
		expect(output).toBe('TEST STRING');
	});
	
	test('returns original value if only modifier is a container: [payload.name.if()]', () => {
		const input = '[payload.name.if()]';
		const output = textSynth.merge(input, { payload });
		// The 'if' plugin is a container and should be ignored, so we get the original value.
		expect(output).toBe('Test String');
	});
	
	test('skips unknown/fake container plugin in chain', () => {
		const input = '[payload.name.containerFake().uppercase()]';
		const output = textSynth.merge(input, { payload });
		expect(output).toBe('TEST STRING');
	});

});