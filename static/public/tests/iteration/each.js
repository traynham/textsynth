const { expect, mote, payload } = window.testing;

describe('each plugin', () => {
	
	it('iterates over an array', () => {
		const input = `[each: fruitList]- [value]\n[/each]`;
		const expectedOutput = `- Apple\n- Orange\n- Grape\n`;
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('iterates over an array using custom variable name', () => {
		const input = `[each: fruit using fruitList]- [fruit]\n[/each]`;
		const expectedOutput = `- Apple\n- Orange\n- Grape\n`;
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});
	
	it('iterates over an object', () => {
		const input = `[each: user.userDetails][key]: [value]\n[/each]`;
		const expectedOutput = `name: John Doe\nage: 30\n`;
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('returns an empty string when the content is null', () => {
		const input = `[each: nullValue]- [value][/each]`;
		const expectedOutput = ``;
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('returns an empty string when the content is undefined', () => {
		const input = `[each: undefinedValue]- [value][/each]`;
		const expectedOutput = ``;
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

});