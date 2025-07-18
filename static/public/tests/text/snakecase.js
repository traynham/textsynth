const { expect, mote, payload } = window.testing;

describe('snakecase plugin', () => {

	it('converts a camelCase string to snake_case', () => {
		// Add to your payload: camelCaseString: 'ThisIsTestString'
		const localPayload = { ...payload, camelCaseString: 'ThisIsTestString' };
		expect(mote.process("[snakecase: camelCaseString]", localPayload)).to.equal('this_is_test_string');
	});

	it('converts a regular string to snake_case', () => {
		// Add to your payload: spacedString: 'Another Test String'
		const localPayload = { ...payload, spacedString: 'Another Test String' };
		expect(mote.process("[snakecase: spacedString]", localPayload)).to.equal('another_test_string');
	});

	it('returns the original value as string when converting a non-string to snake_case', () => {
		expect(mote.process("[snakecase: numbers.intValue]", payload)).to.equal('123');
	});

});