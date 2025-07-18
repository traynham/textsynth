const { expect, mote, payload } = window.testing;

// Add mock layout templates for browser testing
payload.layouts = {
	"main.synth": '<head></head>\n<title>[block: "title"]Default Title[/block]</title>\n<div>[block: "body"]Default body[/block]</div>',
	"missing.synth": null
};

describe('layout plugin', () => {

/*	
	it('Replaces block placeholders with block content', () => {
		const input = `[layout: "main.synth"] [block_set: "title"]Page Title[/block_set] [block_set: "body"]Page content[/block_set] [/layout]`;
		const expectedOutput = '<head></head>\n<title>Page Title</title>\n<div>Page content</div>';
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('Uses payload.layout for layout template', () => {
		let pagePayload = {
			...payload,
			layout: '# [block: "title"]Default Title[/block][block: "body"]Default Body[/block]'
		};
		const input = `---\nblock: "body"\n---\n[block_set: "title"]Page Title[/block_set]This is the body`;
		const expectedOutput = '# Page TitleThis is the body';
		expect(mote.process(input, pagePayload)).to.equal(expectedOutput);
	});

	it('Keeps default content if no block_set is provided', () => {
		const input = `[layout: "main.synth"] [/layout]`;
		const expectedOutput = '<head></head>\n<title>Default Title</title>\n<div>Default body</div>';
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('Handles empty layout content', () => {
		const input = `[layout: "main.synth"][/layout]`;
		const expectedOutput = '<head></head>\n<title>Default Title</title>\n<div>Default body</div>';
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('Appends content with block_append', () => {
		const input = `[layout: "main.synth"][block_append: "body"]Additional content[/block_append][/layout]`;
		const expectedOutput = '<head></head>\n<title>Default Title</title>\n<div>Default bodyAdditional content</div>';
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('Prepends content with block_prepend', () => {
		const input = `[layout: "main.synth"] [block_prepend: "body"]Additional content[/block_prepend] [/layout]`;
		const expectedOutput = '<head></head>\n<title>Default Title</title>\n<div>Additional contentDefault body</div>';
		expect(mote.process(input, payload)).to.equal(expectedOutput);
	});

	it('Throws error if layout file not found', () => {
		const input = `[layout: "missing.synth"] [block_set: "title"]Page Title[/block_set] [block_set: "body"]Page content[/block_set] [/layout]`;
		const output = mote.process(input, payload);
		expect(output).to.match(/^ERROR: Layout file does not exist:/);
	});
*/

	it('Block test', () => {
		const input = `[block: 'body']Body Block[/block]`;
		const output = mote.process(input, payload);
		expect(output).to.equal('Body Block');
	});

/*
	it('Block -markdown flag test', () => {
		const input = `[block: 'body', -markdown]# Body Block[/block]`;
		const output = mote.process(input, payload);
		expect(output).to.equal('<h1>Body Block</h1>\n');
	});
*/

});
