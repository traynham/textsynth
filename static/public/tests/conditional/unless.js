const { expect, mote, payload } = window.testing;

describe('unless plugin', () => {

	it('renders content when the condition is falsy', () => {
		const input = "[unless: user.isMod]You're not a mod.[/unless]";
		expect(mote.process(input, payload)).to.equal("You're not a mod.");
	});

	it('does not render content when the condition is truthy', () => {
		const input = "[unless: user.isAdmin]Upgrade to Premium for more features.[/unless]";
		expect(mote.process(input, payload)).to.equal('');
	});

	it('renders content when the condition is undefined', () => {
		const input = "[unless: isUndefined]Condition is undefined.[/unless]";
		expect(mote.process(input, payload)).to.equal('Condition is undefined.');
	});

	it('renders content when the condition is null', () => {
		const input = "[unless: isNull]Condition is null.[/unless]";
		expect(mote.process(input, payload)).to.equal('Condition is null.');
	});

});