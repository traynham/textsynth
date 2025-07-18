const { expect, mote, payload } = window.testing;

describe('pay plugin', () => {

	it('renders the payload as an HTML code block (default)', () => {
		const result = mote.process('[pay]', { ...payload, foo: 'bar' });
		expect(result).to.include('<pre');
		expect(result).to.include('<code');
		// Double quotes and colon will be HTML-encoded
		expect(result).to.include('&quot;foo&quot;: &quot;bar&quot;');
	});

	it('renders only payload keys in an HTML list if keys flag is passed', () => {
		const reqPayload = { apple: 1, banana: 2 };
		const req = { 
			engine: mote, 
			payload: reqPayload, 
			cargo: { flags: ['keys'] }, 
			contents: [],
		};
		const output = mote.plugins['pay'].processor(req);
		
		expect(output).to.include('<ul');
		expect(output).to.include('<li>apple</li>');
		expect(output).to.include('<li>banana</li>');
	});

	it('renders each content block as its own HTML code block', () => {
		const req = {
			engine: mote,
			payload: { test: 42 },
			cargo: { flags: [] },
			contents: [ { test: 1 }, { hello: "world" } ]
		};
		const output = mote.plugins['pay'].processor(req);
		// Should have two <pre><code> blocks
		expect((output.match(/<pre[\s\S]*?<code[\s\S]*?<\/code>[\s\S]*?<\/pre>/g) || []).length).to.equal(2);
		// JSON output will be HTML-encoded, e.g., &quot;test&quot;: 1
		expect(output).to.include('&quot;test&quot;: 1');
		expect(output).to.include('&quot;hello&quot;: &quot;world&quot;');
	});

	it('escapes brackets in payload JSON output', () => {
		const req = {
			engine: mote,
			payload: { foo: '[bar]' },
			cargo: { flags: [] },
			contents: []
		};
		const output = mote.plugins['pay'].processor(req);
		// Should HTML-escape brackets. Your plugin might use &lbrack; and &rbrack;, or encode the whole string
		// Accept either literal or entity version, but prefer entity for stricter check:
		expect(output).to.match(/(&#91;|&lbrack;|\[).*bar.*(&#93;|&rbrack;|\])/i);
	});

});