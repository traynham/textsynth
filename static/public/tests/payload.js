const payload = {
	// General values
	name: 'bob coolguy',					// Example name for [titlecase], etc.
	description: 'something',				// Used for generic string tests
	text: 'boom',
	
	// Numbers for plugin tests
	numbers: {
		intValue: 123,
		zero: 0,
		negativeInt: -5,
		largeInt: 999999,
		floatValue: 12.34,
		negativeFloat: -56.78,
		numberAsString: '456',				// Stringified number for parsing tests
	},

	// Strings for various plugins
	tenInString: 'This is 10',				// Used for [count], etc.
	stringWithCharT: 'This is a test',
	lowercaseString: 'this is a test',
	mixedcaseString: 'This Is a TeSt',
	allCapsString: 'THIS IS A TEST',
	longString: 'This is a very long string used for testing functionality',
	shortString: 'Short string',
	emptyString: '',
	
	// Arrays for plugin tests
	emptyArray: [],
	itemArray: Array(15).fill('item'),		// 15 items: for count/join plugins
	letterArray: ['a', 'b', 'c', 'a'],		// For element counting
	fruitList: ['Apple', 'Orange', 'Grape'],
	numbersArr5: [1, 2, 3, 4, 5],
	numbersArr10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

	// Objects for plugin tests
	personObj: { name: 'Bob' },
	stringy: { key: 'value', key2: 'value2' },

	// Nested/structured data
	site: {
		items: [1, 2, 3],
		title: 'Hello World'
	},
	
	user: {
		isAdmin: true,
		isMod: false,
		role: 'admin',
		userDetails: { name: "John Doe", age: 30 },
	},

	// Edge case values
	nullValue: null,
	undefinedValue: undefined,
	boolTrue: true,
	boolFalse: false,
	
	isAdmin: true,
	isSubscriber: false,
	isNull: null,
	isUndefined: undefined,
	
	htmlString: '<div>Hello</div>',
	quoteString: '"It\'s great!"',
	bracketString: '[tagged]',
	
	encContent: "Hello &lbrack;uppercase 'John Doe'&rbrack;",
	unEncContent: "Hello [uppercase 'John Doe']",
	escContent: "Hello \\[uppercase 'John Doe'\\]",
	unEscContent: "Hello [uppercase 'John Doe']",
	escHtmlContent: "Hello &amp; Goodbye &lt;John Doe&gt;",
	unEscContent: "Hello & Goodbye <John Doe>",
	
	mdContent: "## Header 2 \n**Bold Text**\n*Italic Text*",

};

export default payload;