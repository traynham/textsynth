const { expect, mote, payload } = window.testing;

describe('mergeFile', () => {
	
	/*
	it("merges a .synth template file", async () => {
		// In the browser, we'll assume "test.synth" resolves from a mocked 'views' store on the mote instance or in payload
		// We'll simulate with payload.views/test.synth if possible
		const result = await mote.mergeFile('test.synth', payload);
		expect(result.trim()).to.equal('<h1>THIS IS REALLY COOL.</h1>');
	});

	it("merges a markdown file", async () => {
		const result = await mote.mergeFile('test.md', payload);
		expect(result.trim()).to.equal('<h1>Test Markdown File</h1>');
	});

	it("merges a file, without payload", async () => {
		const result = await mote.mergeFile('test.synth');
		expect(result.trim()).to.equal('<h1>THIS IS REALLY COOL.</h1>');
	});

	it("merges a file, with isExpress in payload", async () => {
		const localPayload = { _synth: { isExpress: true } };
		// In the browser, there's no path.join or _getAppRoot, so we assume string key is fine
		const view = 'test.synth';
		const result = await mote.mergeFile(view, localPayload);
		expect(result.trim()).to.equal('<h1>THIS IS REALLY COOL.</h1>');
	});

	it("attempts to merge a bogus file", async () => {
		const result = await mote.mergeFile('bogus.synth', payload);
		expect(result).to.match(/^ERROR: Merge path.* does not exist$/);
	});
	*/
	
	
});