const { expect, mote, payload } = window.testing;

describe('ignore plugin', () => {

	it('should encode tags', () => {
		const input = `[ignore][markdown]${payload.mdContent}[/markdown][/ignore]`;
		const expectedOutput = `[markdown]## Header 2 \n**Bold Text**\n*Italic Text*[/markdown]`;
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

});