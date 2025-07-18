const { expect, mote, payload } = window.testing;

describe('markdown plugin', () => {

	it('converts markdown to HTML', () => {
		const input = `[markdown]${payload.mdContent}[/markdown]`;
		const expectedOutput = `<h2>Header 2</h2>\n<p><strong>Bold Text</strong>\n<em>Italic Text</em></p>\n`;
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

});