const { expect, mote, payload } = window.testing;

describe('log plugin', () => {

	let originalConsoleLog;
	let logCalls;

	beforeEach(() => {
		// Save the original console.log
		originalConsoleLog = console.log;
		logCalls = [];
		console.log = (...args) => { logCalls.push(args); };
	});

	afterEach(() => {
		// Restore original console.log
		console.log = originalConsoleLog;
	});

	it('logs the correct content to console', () => {
		const input = '[log: "Hello, World!"]';
		mote.process(input, payload);
		expect(logCalls.length).to.equal(1);
		expect(logCalls[0][0]).to.equal('Hello, World!');
	});

	it('logs object correctly', () => {
		const logPayload = { property: { path: { key: "value" } } };
		const input = '[log: property.path]';
		mote.process(input, logPayload);
		expect(logCalls.length).to.equal(1);
		expect(logCalls[0][0]).to.deep.equal({ key: "value" });
	});

	it('logs grouping and property', () => {
		const logPayload = { property: { path: { key: "value" } } };
		const input = '[log: "Simple String", property]';
		mote.process(input, logPayload);
		expect(logCalls.length).to.equal(1);
		expect(logCalls[0][0]).to.deep.equal({ path: { key: "value" } });
	});
/*
	it('logs grouping and property as table (string)', () => {
		const logPayload = { property: { path: { key: "value" } } };
		const input = '[log: "Simple String", property.path, -table]';
		mote.process(input, logPayload);
		expect(logCalls.length).to.be.at.least(1);
		const actual = logCalls[0][0] + '';
		expect(actual).to.include('key');
		expect(actual).to.include('value');
		expect(actual).to.include('Values');
		expect(actual).to.include('(index)');
	});
*/

});