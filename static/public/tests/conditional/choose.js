const { expect, mote, payload } = window.testing;

describe('choose plugin', () => {

	it('returns first content when condition is true quoted string', () => {
		const input = `[choose('true'): "Hello Admin!", "Hello User!", "Hello"]`;
		expect(mote.process(input, payload)).to.equal('Hello Admin!');
	});

	it('returns second content when condition is false quoted string 1', () => {
		const input = `[choose('false'): "Hello Admin!", "Hello User!", "Hello"]`;
		expect(mote.process(input, payload)).to.equal('Hello User!');
	});

	it('returns first content when condition is true string', () => {
		const input = `[choose(true): "Hello Admin!", "Hello User!", "Hello"]`;
		expect(mote.process(input, payload)).to.equal('Hello Admin!');
	});

	// NO LONGER SUPPORTED: test with space delimiters

	it('returns second content when condition is false string 2', () => {
		const input = `[choose(false): "Hello Admin!", "Hello User!", "Hello"]`;
		expect(mote.process(input, payload)).to.equal('Hello User!');
	});

	it('returns first content when condition is true (payload.isAdmin)', () => {
		const input = `[choose(isAdmin): "Hello Admin!", "Hello User!", "Hello"]`;
		expect(mote.process(input, payload)).to.equal('Hello Admin!');
	});

	it('returns second content when condition is false 3 (payload.isSubscriber)', () => {
		const input = `[choose(isSubscriber): "Hello Admin!", "Hello User!", "Hello"]`;
		expect(mote.process(input, payload)).to.equal('Hello User!');
	});

	it('returns default content when condition is neither true nor false (payload.isUndefined)', () => {
		const input = `[choose(isUndefined): "Hello Admin!", "Hello User!", "Hello"]`;
		expect(mote.process(input, payload)).to.equal('Hello');
	});

	it('returns default content when condition is null (payload.isNull)', () => {
		const input = `[choose(isNull): "Hello Admin!", "Hello User!", "Hello"]`;
		expect(mote.process(input, payload)).to.equal('Hello');
	});

});