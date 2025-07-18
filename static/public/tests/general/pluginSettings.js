const { expect, mote } = window.testing;

describe('pluginSettings', () => {

/*
	it('should return undefined and console error for nonexistent plugin', () => {
		// Browser Mocha+Chai cannot spy on console.error as cleanly as Jest, but we can mock
		const origError = console.error;
		let msg;
		console.error = (m) => { msg = m; };
		const result = mote.pluginSettings('nonexistent');
		expect(result).to.be.undefined;
		expect(msg).to.equal('Plugin nonexistent does not exist.');
		console.error = origError;
	});

	it('should initialize an empty settings object for a plugin without settings', () => {
		mote.tags['pluginWithoutSettings'] = {};
		mote.pluginSettings('upper', {});
		expect(mote.pluginSettings('upper')).to.deep.equal({});
	});

	it('should return existing settings for a plugin with settings', () => {
		let result = mote.pluginSettings('upper', { settings: { key: 'value' } });
		expect(result).to.deep.equal({ settings: { key: 'value' } });
	});

	it('should merge existing settings with new settings', () => {
		mote.tags['pluginWithSettings'] = { settings: { key1: 'value1', key2: 'value2' } };
		const newSettings = { key2: 'newvalue', key3: 'value3' };
		expect(mote.pluginSettings('pluginWithSettings', newSettings)).to.deep.equal({
			key1: 'value1',
			key2: 'newvalue',
			key3: 'value3'
		});
	});
*/

});