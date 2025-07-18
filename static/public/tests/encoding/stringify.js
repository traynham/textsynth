const { expect, mote, payload } = window.testing;

describe('stringify plugin', () => {

	it('converts an object to a JSON string', () => {
		const input = "[stringify: stringy]";
		expect(mote.process(input, payload)).to.equal('{"key":"value","key2":"value2"}');
	});

	it('converts an array to a JSON string', () => {
		const input = "[stringify: fruitList]";
		expect(mote.process(input, payload)).to.equal('["Apple","Orange","Grape"]');
	});

	it('converts a string to a JSON string', () => {
		const input = "[stringify: name]";
		expect(mote.process(input, payload)).to.equal('"bob coolguy"');
	});

	it('converts a literal string to a JSON string', () => {
		const input = "[stringify: 'Hello, World!']";
		expect(mote.process(input, payload)).to.equal('"Hello, World!"');
	});

	it('converts a number to a JSON string', () => {
		const input = "[stringify: numbers.intValue]";
		expect(mote.process(input, payload)).to.equal('123');
	});

});