import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

describe('div plugin', () => {
/*	
	test('generates div tag with classes, id and attributes', () => {
		//const input = '[div: class="myClass" id="myId" datacustom="customValue"]This is the div content[/div]';
		const input = '[div: .myClass #myId datacustom="customValue"]This is the div content[/div]';
		//const expectedOutput = '<div class="myClass" id="myId" data-custom="customValue">This is the div content</div>';
		const expectedOutput = '<div datacustom="customValue" class="myClass" id="myId">This is the div content</div>';
		console.log('RESULT::', textSynth.merge(input, {}) )
		expect(textSynth.merge(input, {})).toBe(expectedOutput);
	});
*/
	test('generates div tag with classes and id shorthand', () => {
		const input = '[div: .myClass #myId]This is the div content[/div]';
		const expectedOutput = '<div class="myClass" id="myId">This is the div content</div>';
		expect(textSynth.merge(input, {})).toBe(expectedOutput);
	});
});
