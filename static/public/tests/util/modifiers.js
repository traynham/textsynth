const { expect, mote } = window.testing;

const payload = {
	name: "Test String",
	test: "This is a TEST",
	txt: "xoxo",
	nested: { name: "hello" }
};

describe('inline plugin modifiers', () => {

	it('applies a single modifier plugin (uppercase)', () => {
		const input = '[payload.name.uppercase()]';
		expect(mote.process(input, { payload })).to.equal('TEST STRING');
	});

	it('applies a modifier plugin with arguments (replace)', () => {
		const input = "[payload.txt.replace('x','y')]";
		expect(mote.process(input, { payload })).to.equal('yoyo');
	});

	it('chains multiple modifier plugins', () => {
		const input = "[payload.txt.replace('x','y').replace('y','z').uppercase()]";
		expect(mote.process(input, { payload })).to.equal('ZOZO');
	});

	it('handles unknown plugins in chain gracefully (skipped)', () => {
		const input = "[payload.name.foobar().uppercase()]";
		// foobar() should be skipped; uppercase should still work
		expect(mote.process(input, { payload })).to.equal('TEST STRING');
	});

	it('handles only unknown/container plugins (skipped, returns base)', () => {
		const input = "[payload.name.foobar().containerFake()]";
		// Both are skipped, so value is unchanged
		expect(mote.process(input, { payload })).to.equal('Test String');
	});

	it('works with nested objects and modifiers', () => {
		const input = "[payload.nested.name.uppercase()]";
		expect(mote.process(input, { payload })).to.equal('HELLO');
	});

	it('returns the original value if no plugins are present', () => {
		const input = "[payload.name]";
		expect(mote.process(input, { payload })).to.equal('Test String');
	});

	it('applies tag after modifiers: [upper: test.slugify()]', () => {
		const input = '[upper: test.slugify()]';
		expect(mote.process(input, payload)).to.equal('THIS-IS-A-TEST');
	});

	it('applies tag after multiple modifiers: [upper: test.slugify().replace("test", "Bob")]', () => {
		const input = "[upper: test.slugify().replace('test','Bob')]";
		expect(mote.process(input, payload)).to.equal('THIS-IS-A-BOB');
	});

	it('skips container tag used as modifier: [payload.name.if().uppercase()]', () => {
		const input = '[payload.name.if().uppercase()]';
		expect(mote.process(input, { payload })).to.equal('TEST STRING');
	});

	it('returns original value if only modifier is a container: [payload.name.if()]', () => {
		const input = '[payload.name.if()]';
		expect(mote.process(input, { payload })).to.equal('Test String');
	});

	it('skips unknown/fake container plugin in chain', () => {
		const input = '[payload.name.containerFake().uppercase()]';
		expect(mote.process(input, { payload })).to.equal('TEST STRING');
	});

});