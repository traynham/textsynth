const { expect, mote } = window.testing;

// For tests that need to manipulate options or state, use a local clone or adjust as necessary.

describe('merge', () => {

	it('should return same template if no payload', () => {
		const template = 'test template';
		expect(mote.process(template)).to.equal(template);
	});
/*
	it('should set views if no views in payload', () => {
		const template = 'test template';
		const localPayload = { _synth: {} };
		mote.options.paths.views = 'test views';
		mote.process(template, localPayload);
		expect(localPayload._synth.views).to.equal('test views');
	});
	it('should set flush_comments if in payload', () => {
		const template = 'test template \n //comment \n /* comment * / <!-- comment -->';
		const localPayload = { _synth: { flush_comments: true } };
		mote.process(template, localPayload);
		expect(mote.options.flush_comments).to.equal(true);
	});

	it('should remove comments if flush_comments is true', () => {
		const template = 'test template \n //comment \n /* comment *    / <!-- comment -->';
		const localPayload = { _synth: { flush_comments: false } };
		expect(mote.merge(template, localPayload).trim()).to.equal('test template \n //comment \n /* comment *    / <!-- comment -->');
	});

	it('should remove leading tabs if removeTabs is true', () => {
		const template = '\ttest template';
		const localPayload = { _synth: {} };
		mote.options.removeTabs = true;
		expect(mote.merge(template, localPayload)).to.equal('test template');
	});

	// Skipped: show/hide bogus tags (relies on showUndefinedTags global and plugin impl)

	it('set as markdown', () => {
		const localPayload = { _synth: { md: true }};
		const template = '# My Great Title.';
		let result = mote.merge(template, localPayload).trim();
		expect(result).to.equal('<h1>My Great Title.</h1>');
	});

	it('set markdown to false if page opt is false.', () => {
		const localPayload = { _synth: { md: true }};
		const template = '---\nmd: false\n---\n\n# My Great Title.';
		let result = mote.merge(template, localPayload).trim();
		expect(result).to.equal('# My Great Title.');
	});

	it('don\'t remove tabs', () => {
		const template = '\tTemplate with a tab.';
		mote.options.removeTabs = false;
		let result = mote.merge(template, {});
		expect(result).to.equal('\tTemplate with a tab.');
	});

	it('set to use cache', () => {
		const localPayload = { _synth: { md: true }};
		const template = '---\ncache: true\n---\n# My Great Title.';
		let result = mote.merge(template, localPayload).trim();
		expect(result).to.equal('<h1>My Great Title.</h1>');
	});
*/

});