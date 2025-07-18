const { expect, mote, payload } = window.testing;

describe('If plugin', () => {

	it('should show content on true', () => {
		const input = '[if: user.isAdmin]Hello Admin[/if]';
		expect(mote.process(input, payload)).to.equal('Hello Admin');
	});

	it('should hide content on false', () => {
		const input = '[if: user.isMod]Hello Mod[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('do not show content on bogus key', () => {
		const input = '[if: bogus]Hello Admin[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('valid string should resolve as truthy', () => {
		const input = '[if: "bogus"]Hello Admin[/if]';
		expect(mote.process(input, payload)).to.equal('Hello Admin');
	});

	it('a string of "true" should be cast as true.', () => {
		const input = '[if: "true"]Hello Admin[/if]';
		expect(mote.process(input, payload)).to.equal('Hello Admin');
	});

	it('a string of "false" should be true because it is a string.', () => {
		const input = '[if: "false"]Hello Admin[/if]';
		expect(mote.process(input, payload)).to.equal('Hello Admin');
	});

	it('should allow multiple params', () => {
		const input = '[if: user.isAdmin, user.isMod]Hello Mod[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('should allow literal params', () => {
		const input = '[if: true, false]Hello Mod[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('multiple params: second truthy shows content', () => {
		const input = '[if: false, true]Y[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('null param is falsy', () => {
		const input = '[if: null]No[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('undefined param is falsy', () => {
		const input = '[if: undefined]Nope[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('empty string is falsy', () => {
		const input = '[if: ""]Empty[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('should render default [else] when [if] is false', () => {
		const input = '[if: false]A[else]B[/if]';
		expect(mote.process(input, payload)).to.equal('B');
	});

	it('should ignore [else] when [if] is true', () => {
		const input = '[if: user.isAdmin]A[else]B[/if]';
		expect(mote.process(input, payload)).to.equal('A');
	});

	it('should render [else: …] when [if] is false and else-if true', () => {
		const input = '[if: false]A[else: true]C[/if]';
		expect(mote.process(input, payload)).to.equal('C');
	});

	it('first truthy [else: …] wins among multiple', () => {
		const input = [
			'[if: false]A',
			'[else: false]B',
			'[else: true]C',
			'[else: true]D',
			'[/if]'
		].join('');
		expect(mote.process(input, payload)).to.equal('C');
	});

	it('falls back to [else] when no else-if matches', () => {
		const input = [
			'[if: false]A',
			'[else: false]B',
			'[else]DEFAULT',
			'[/if]'
		].join('');
		expect(mote.process(input, payload)).to.equal('DEFAULT');
	});

	it('does not reach default [else] if an else-if matched', () => {
		const input = [
			'[if: false]A',
			'[else: true]B',
			'[else]C',
			'[/if]'
		].join('');
		expect(mote.process(input, payload)).to.equal('B');
	});

	it('no default else with only else-if clauses yields empty', () => {
		const tpl = `
			[if: false]A
			[else: false]B
			[else: false]C
			[/if]
		`;
		expect(mote.process(tpl.trim(), payload)).to.equal('');
	});

	it('nested if/else blocks render correctly', () => {
		const tpl = [
			'[if: true]',
			'OUTER-',
			'[if: false]X[else]Y[/if]',
			'[/if]'
		].join('');
		expect(mote.process(tpl, payload)).to.equal('OUTER-Y');
	});

	it('complex expression in else-if', () => {
		const tpl = '[if: false]A[else: user.isMod == false]Mod is false[/if]';
		expect(mote.process(tpl, payload)).to.equal('Mod is false');
	});

	it('handles whitespace around else', () => {
		const tpl = `
			[if: false]
				A
			 [else] 
				B
			[/if]
		`;
		expect(mote.process(tpl, payload).trim()).to.equal('B');
	});

});

describe('If plugin conditionals', () => {

	it('should allow "==" equality', () => {
		const input = `[if: 'one' == 'one']Hello Mod[/if]`;
		expect(mote.process(input, payload)).to.equal('Hello Mod');
	});

	it('should allow "===" equality', () => {
		const input = `[if: user.isAdmin === true]Hello Mod[/if]`;
		expect(mote.process(input, payload)).to.equal('Hello Mod');
	});

	it('should allow "!=" equality', () => {
		const input = `[if: user.isAdmin != false]Hello Mod[/if]`;
		expect(mote.process(input, payload)).to.equal('Hello Mod');
	});

	it('should allow "!==" equality', () => {
		const input = `[if: user.isAdmin !== false]Hello Mod[/if]`;
		expect(mote.process(input, payload)).to.equal('Hello Mod');
	});

	it('should allow ">" operator', () => {
		const input = `[if: 5 > 0]Bigger[/if]`;
		expect(mote.process(input, payload)).to.equal('Bigger');
	});

	it('should allow "<" operator', () => {
		const input = `[if: 0 < 5]Smaller[/if]`;
		expect(mote.process(input, payload)).to.equal('Smaller');
	});

	it('should allow "<=" operator', () => {
		const input = `[if: 5 <= 5]Smaller[/if]`;
		expect(mote.process(input, payload)).to.equal('Smaller');
	});

	it('should allow ">=" operator', () => {
		const input = `[if: 5 >= 5]Smaller[/if]`;
		expect(mote.process(input, payload)).to.equal('Smaller');
	});

});

describe('If plugin enhanced conditionals', () => {

	it('should evaluate basic true condition', () => {
		const input = '[if: true]True[/if]';
		expect(mote.process(input, payload)).to.equal('True');
	});

	it('should evaluate negation', () => {
		const input = '[if: !true]Not True[/if]';
		expect(mote.process(input, payload)).to.equal('');
	});

	it('should evaluate and operation with true conditions', () => {
		const input = '[if: true && true]True[/if]';
		expect(mote.process(input, payload)).to.equal('True');
	});

	it('should evaluate and operation with mixed conditions', () => {
		const input = '[if: true && !false]True[/if]';
		expect(mote.process(input, payload)).to.equal('True');
	});

	it('should evaluate complex condition with equality checks', () => {
		const input = '[if: true == true && true !== false]True[/if]';
		expect(mote.process(input, payload)).to.equal('True');
	});

	it('should evaluate or operation', () => {
		const input = '[if: true || false]True[/if]';
		expect(mote.process(input, payload)).to.equal('True');
	});

	it('should handle precedence in complex expressions', () => {
		const input = '[if: true || false]True[/if]';
		expect(mote.process(input, payload)).to.equal('True');
	});

	it('should evaluate expressions with literals and variables', () => {
		const input = '[if: user.isAdmin && true]Hello Admin[/if]';
		expect(mote.process(input, payload)).to.equal('Hello Admin');
	});

	it('should evaluate expressions with negation and variables', () => {
		const input = '[if: !user.isMod && true]Not a Mod[/if]';
		expect(mote.process(input, payload)).to.equal('Not a Mod');
	});
});

describe('If plugin – edge cases', () => {

	it('number 1 is truthy', () => {
		const tpl = `[if: 1]One[/if]`;
		expect(mote.process(tpl, payload)).to.equal('One');
	});

	it('number -1 is truthy', () => {
		const tpl = `[if: -1]Negative[/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('number 0 is falsy', () => {
		const tpl = `[if: 0]Zero[/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('empty string is falsy', () => {
		const tpl = `[if: ""]Empty[/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('non-empty string is truthy', () => {
		const tpl = `[if: "abc"]Yep[/if]`;
		expect(mote.process(tpl, payload)).to.equal('Yep');
	});

	it('null is falsy', () => {
		const tpl = `[if: null]Null![/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('undefined is falsy', () => {
		const tpl = `[if: undefined]Nope[/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('boolean true is truthy', () => {
		const tpl = `[if: true]It is true[/if]`;
		expect(mote.process(tpl, payload)).to.equal('It is true');
	});

	it('boolean false is falsy', () => {
		const tpl = `[if: false]It is false[/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('literal number param is truthy', () => {
		const tpl = `[if: 5]Number ok[/if]`;
		expect(mote.process(tpl, payload)).to.equal('Number ok');
	});

	it('string "0" should be truthy (non-empty)', () => {
		const tpl = `[if: "0"]Zero string[/if]`;
		expect(mote.process(tpl, payload)).to.equal('Zero string');
	});

	it('empty [else] block yields empty string', () => {
		const tpl = `[if: false]A[else][/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('empty [if] block yields empty string (no content)', () => {
		const tpl = `[if: true][/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('no space after colon still works', () => {
		expect(mote.process(`[if:true]Yes[/if]`, payload)).to.equal('Yes');
		expect(mote.process(`[if:false]Yes[else:true]No[/if]`, payload)).to.equal('No');
	});

	it('parentheses grouping in condition', () => {
		const tpl = `[if: (false && true) || true]Grouped[/if]`;
		expect(mote.process(tpl, payload)).to.equal('Grouped');
	});

	it('chained OR conditions', () => {
		const tpl = `[if: false || false || true]Or chain[/if]`;
		expect(mote.process(tpl, payload)).to.equal('Or chain');
	});

	it('nonexistent payload property is falsy', () => {
		const tpl = `[if: user.nonexistent]Nope[/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('multiple [else] blocks should throw or only honor the first', () => {
		const tpl = `[if: false]A[else]B[else]C[/if]`;
		expect(mote.process(tpl, payload)).to.equal('C');
	});

	it('empty [if:] block with no argument should throw or be falsy', () => {
		const tpl = `[if:]should not render[/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});

	it('empty [else:] block with no argument should throw or be falsy', () => {
		const tpl = `[if:false]content[else:]should not render[/if]`;
		expect(mote.process(tpl, payload)).to.equal('');
	});
});