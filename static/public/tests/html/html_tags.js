const { expect, mote } = window.testing;

describe('html_tag and div/p plugins', () => {

	it('generates div tag with classes, id and attributes without colon', () => {
		const input = '[div .myClass, #myId, data-custom="customValue", name="content"]This is the div content[/div]';
		const expected = '<div data-custom="customValue" name="content" class="myClass" id="myId">This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});


	it('generates div tag with classes, id and attributes', () => {
		const input = '[div: .myClass, #myId, data-custom="customValue", name="content"]This is the div content[/div]';
		const expected = '<div data-custom="customValue" name="content" class="myClass" id="myId">This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('generates div tag with classes and id shorthand', () => {
		const input = '[div: .myClass, #myId]This is the div content[/div]';
		const expected = '<div class="myClass" id="myId">This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});
	
	it('generates div tag with id shorthand using underscores and dashes', () => {
		const input = '[div: #my-Id_12345]This is the div content[/div]';
		const expected = '<div id="my-Id_12345">This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('generates div tag with classes shorthand and class attribute', () => {
		const input = '[div: .myClass, class="anotherClass bordered"]This is the div content[/div]';
		const expected = '<div class="anotherClass bordered myClass">This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('generates div tag with classes shorthand using underscores and dashes', () => {
		const input = '[div: .my-Class, .another_class]This is the div content[/div]';
		const expected = '<div class="another_class my-Class">This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('generates div tag with classes shorthand and class attribute with unique results', () => {
		const input = '[div: .myClass, class="anotherClass bordered myClass", .aDifferentClass]This is the div content[/div]';
		const expected = '<div class="aDifferentClass anotherClass bordered myClass">This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('generates div tag with quoted values', () => {
		const input = `[div: 'required', -selected, "Some bad value"]This is the div content[/div]`;
		const expected = '<div required "Some bad value" selected>This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('uses div tag by default', () => {
		const input = '[html_tag: .myClass, #myId]This is the div content[/html_tag]';
		const expected = '<div class="myClass" id="myId">This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('p tag from alias', () => {
		const input = '[p: .myClass, #myId]This is the p content[/p]';
		const expected = '<p class="myClass" id="myId">This is the p content</p>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('div tag with no params.', () => {
		const input = '[div]This is the div content[/div]';
		const expected = '<div>This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

	it('div tag with no params (html_tag alias).', () => {
		const input = '[html_tag]This is the div content[/html_tag]';
		const expected = '<div>This is the div content</div>';
		expect(mote.process(input, {})).to.equal(expected);
	});

});