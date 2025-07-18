const { expect, mote } = window.testing;

describe('breadcrumbs plugin', () => {

	it('renders breadcrumbs for a simple two-segment path', () => {
		const req = {
			engine: mote,
			payload: { _request: { path: '/home/about' } },
			cargo: { attributes: {} },
			contents: []
		};
		const output = mote.plugins['breadcrumbs'].processor(req);
		expect(output).to.include('<ol class="breadcrumb">');
		expect(output).to.include('<a href="/home">home</a>');
		expect(output).to.include('<li class="breadcrumb-item">about</li>');
		// Should end with closing tags
		expect(output.trim().endsWith('</div>')).to.be.true;
	});

	it('renders breadcrumbs with a custom title for the last item', () => {
		const req = {
			engine: mote,
			payload: { _request: { path: '/team/contact' } },
			cargo: { attributes: { title: 'Contact Us' } },
			contents: []
		};
		const output = mote.plugins['breadcrumbs'].processor(req);
		expect(output).to.include('<a href="/team">team</a>');
		expect(output).to.include('Contact Us</li>');
	});

	it('renders nothing for a root path', () => {
		const req = {
			engine: mote,
			payload: { _request: { path: '/' } },
			cargo: { attributes: {} },
			contents: []
		};
		const output = mote.plugins['breadcrumbs'].processor(req);
		expect(output).to.be.undefined;
	});

	it('renders nothing for a single-segment path', () => {
		const req = {
			engine: mote,
			payload: { _request: { path: '/onlyone' } },
			cargo: { attributes: {} },
			contents: []
		};
		const output = mote.plugins['breadcrumbs'].processor(req);
		expect(output).to.be.undefined;
	});

	it('returns error string if _request is missing', () => {
		const req = {
			engine: mote,
			payload: {},
			cargo: { attributes: {} },
			contents: []
		};
		const output = mote.plugins['breadcrumbs'].processor(req);
		expect(output).to.include('breadcrumbs borked because _request is not present');
	});

	it('correctly renders deep breadcrumb paths', () => {

		const req = {
			engine: mote,
			payload: { _request: { path: '/alpha/beta/gamma/delta' } },
			cargo: { attributes: {} },
			contents: []
		}
		
		const output = mote.plugins['breadcrumbs'].processor(req)
		
		expect(output).to.include('<li class="breadcrumb-item">delta</li>')
		expect(output).to.include('<a href="/alpha/beta/gamma">gamma</a>')
		expect(output).to.include('<a href="/alpha/beta">beta</a>')
		expect(output).to.include('<a href="/alpha">alpha</a>')

	})

});