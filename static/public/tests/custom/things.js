const { expect, mote, payload } = window.testing;

describe('echo plugin', () => {
	it('returns the same value it receives', () => {
		const req = {
			engine: mote,
			content: 'Hello, World!'
		};
		const result = mote.plugins['echo'].processor(req);
		expect(result).to.equal('Hello, World!');
	});
	
	
	it('returns the same value it receives 2', () => {
		const input = "[echo: 'THIS IS A TEST']";
		expect(mote.process(input, payload)).to.equal('THIS IS A TEST');
	});
	
	it('returns the same value it receives 3', () => {
		const input = "[echo: allCapsString]";
		expect(mote.process(input, payload)).to.equal('THIS IS A TEST');
	});

	it('returns an empty string when input is empty', () => {
		const req = {
			engine: mote,
			content: ''
		};
		const result = mote.plugins['echo'].processor(req);
		expect(result).to.equal('');
	});
});

describe('double plugin', () => {
	it('returns the input duplicated with a space', () => {
		const req = {
			engine: mote,
			content: 'Go'
		};
		const result = mote.plugins['double'].processor(req);
		expect(result).to.equal('Go Go');
	});

	it('returns just a space when input is empty', () => {
		const req = {
			engine: mote,
			content: ''
		};
		const result = mote.plugins['double'].processor(req);
		expect(result).to.equal(' ');
	});
});