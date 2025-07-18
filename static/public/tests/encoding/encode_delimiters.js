const { expect, mote, payload } = window.testing;

describe('encode_delimiters plugin', () => {

	it('escapes MOTE tag delimiters', () => {
		
		let local_payload = {
			name: '[name]'
		}
		
		const input = "[encode_delimiters: name]";
		expect(mote.process(input, local_payload)).to.equal("&#91;name&#93;");
	});

	it('returns an empty string when the content is empty', () => {
		const input = "[encode_delimiters: bogus]";
		expect(mote.process(input, payload)).to.equal('');
	});

	it('returns an empty string when the content is null', () => {
		const input = "[encode_delimiters: bad]";
		expect(mote.process(input, payload)).to.equal('');
	});

});