{
	var { payload, tags, textMerger } = options

	function isSingle(tag) {
		return options.tagsByKind.single.includes(tag);
	}

	function isContainer(tag) {
		return options.tagsByKind.container.includes(tag);
	}

	function processContent(content, cargo) {

		let contents = Array.isArray(content) ? content : [content];
		let out = []

		contents = contents.map(item => {
			switch (item.type) {
				case 'attribute':
					return item
				case 'flag':
					cargo.flags.push(item.value)
				case 'null':
					return null
				case 'undefined':
					return undefined
				case 'identifier':
					return _getValueFromPath(item.value, payload)
				default:
					return item.value
			}
		})

		content?.forEach( param => {
			if(param.type == 'attribute'){
				param.value = _getValueFromPath(param.value, payload) || param.value
				cargo.assignment[param.key] = param.value
				cargo.attributes[param.key] = param.value
			}
			if(param.type == 'using'){ cargo.using = param}
		})

		contents = contents.filter(Boolean) // REMOVE FALSY
		return contents

	}

	function _getValueFromPath(item, payload) {

		let path = item
		if(item.value){ path = item.value}

		if(!path){ return ''}
		if(typeof path != 'string'){ return path }
	
		// Treat path as a string representing a property path. Return path if not resolved.
		let value = path.split('.').reduce((obj, i) => (obj?.[i]), payload) //|| path

		if(value == undefined && item.type == 'string'){ value = item.value }

		// Return a shallow copy of the array if it's an array, or return the value directly
		return Array.isArray(value) ? [...value] : value
		
	}

	

	function _evaluateCondition(condition, payload) {

		let { left, operator, right} = condition

		const leftValue = _getValueFromPath(left.value, payload)
		left = (leftValue !== undefined) ? leftValue : left.value

		const rightValue = _getValueFromPath(right.value, payload)
		right = (rightValue !== undefined) ? rightValue : right.value

		switch (operator) {
			case '==':  return left == right
			case '===': return left === right
			case '!=':  return left != right
			case '!==': return left !== right
			case '<':   return left < right
			case '>':   return left > right
			case '<=':  return left <= right
			case '>=':  return left >= right
		}
		
	}

	function processCargo(params) {
		
		let cargo = {
			assignment: {},
			attributes: {},
			flags: [],
			classes: [],
			condition: null,
			extra: [],
			id: '',
			params: [],
			using: null,
			values: []
		}

		if(params.length == 0){
			return cargo
		}

		params = Array.isArray(params) ? params : [params];

		params.forEach(param => {

			if(!param){ return undefined }

			switch (param.type) {
				case 'attribute':  cargo.attributes[param.key] = param.value; break;
				case 'boolean':     cargo.values.push(param.value); break;
				case 'classes':    cargo.classes.push(param.value); break;
				case 'condition':  cargo.condition = param.value; break;
				case 'id':         cargo.id = param.value; break;
				case 'identifier': cargo.values.push(_getValueFromPath(param, payload)); break;
				case 'flag':       cargo.flags.push(param.value); break;
				case 'null':       cargo.params.push(null); break;
				case 'number':     cargo.values.push(param.value); break;
				case 'string':   cargo.values.push(param.value); break;
				case 'undefined':  cargo.params.push(undefined); break;
				case 'using':      cargo.using = param; break;
				default:           cargo.extra.push(param);
			}
		})

		return cargo

	}

}


start "Start"
	=	@(elements:expression+)

expression "Expression"
	=	@( text )
	/	@( merge )
	/	@( tag )
	/	@( mal )
	/	@( containerTag )

// MERGE
merge "Merge Tag"
	= 	tagName:merge_identifier &{ return !isContainer(tagName.value) }
		{
			return {
				render: _getValueFromPath(tagName.value, payload),
				text: text()
			};
		}

single_signatures

	// SINGLE TAG
	=	"[" tagName:identifier &{ return isSingle(tagName.value) } ":" _ content:arguments _ "]"
		{ return { tagName, type: 'single', params: [], content, signature: 'Single Tag' } }

	// SINGLE TAG WITH PARAMS
	/	"[" tagName:identifier &{ return isSingle(tagName.value) } params:parameters ":" _ content:arguments "]"
		{ return { tagName, type: 'single-with-params', params, content, signature: 'Single Tag With Params' } }


// SINGLES
tag "Single Tag"

	=	sig:single_signatures
		{
			
			let {tagName, type, params, content} = sig
			
			params = params.map( param => {
				if(param.value == 'true'){ return true}
				if(param.value == 'false'){ return false}
				if(param?.type == 'identifier'){ return _getValueFromPath(param.value, payload)}
				return param.value 
			})

			let cargo = processCargo(params)
			let contents = processContent(content, cargo)

			let req = {
				name: tagName.value,
				params: params, 
				content: contents[0],
				contents: contents,
				payload: payload,
				textMerger: textMerger,
				cargo: cargo
			}

			let render = tags[tagName.value].processor(req)

			return {
				render: render,
				text: text()
			}

		}


// Malformed
mal "Malformed Matches"

	// ERROR IF NO CONTENT.
	=	"[" tagName:identifier &{ return isSingle(tagName.value) } ":" "]" {
			return {render: `ERROR: "${tagName.value}" tag expected content.`}
		}


container_signatures "Container Signatures"

	// SIGNATURE › IGNORE
	= 	"[ignore]"
			content:(!'[/ignore]' .)*
		"[/ignore]"
		{
			return {
				tagName: {value: 'ignore'},
				close: {value: 'ignore'},
				params: [],
				content: content.map(item => item[1]).join('')
			}
		}

	// SIGNATURE › CONTAINER WITHOUT CONTENT
	/	"[" tagName:identifier &{ return isContainer(tagName.value) }  ":" _ params:arguments _ "]" "[/" close:identifier "]"
		{ return { tagName, close, params, content: [] } }

	// SIGNATURE › CONTAINER WITH ARGS
	/	"[" tagName:identifier &{ return isContainer(tagName.value) }  ":" _ params:arguments _ "]"
			content:expression+
		"[/" close:identifier "]"
		{ return { tagName, close, params, content } }


	// SIGNATURE › CONTAINER WITHOUT ARGS
	/ 	"[" tagName:identifier &{ return isContainer(tagName.value) }  _ "]"
			content:(expression* / _)
		"[/" close:identifier "]"
		{ return { tagName, close, params: [], content } }
		

// CONTAINER
containerTag "Container Tag"

	=	sig:container_signatures
		{
			
			let {tagName, close, params, content} = sig

			if(tagName.value == 'ignore'){
				return {render: content}
			}

			if (tagName.value !== close.value) {
				throw new Error(`CONTAINER › Mismatched tags ${tagName.value} and ${close.value}`);
			}

			let cargo = processCargo(params)

			let req = {
				name: tagName.value,
				params: params.map( param => {
					if(param.value == 'true'){ return true}
					if(param.value == 'false'){ return false}
					if(param.type == 'identifier'){ return _getValueFromPath(param, payload)}
					return param 
				}), 
				content:  content ? content.map(e => e.text).join('') : '', 
				cargo,
				payload,
				textMerger
			}

			// RUN PLUGIN.
			let render = tags[tagName.value].processor(req)

			return {
				render: render,
				text: text()
			}
		}


parameters
	= "(" @params:arguments ")"
	/ "(" _ ")"


// LIST OF ARGS, DELIMITED.
arguments
	= arg|..,delimiter|

delimiter
	=	_ [, ] _

arg
	=	logicalAndExpression
	/	logicalOrExpression
	/	condition
	/	attribute
	/	quotedText
	/	flag
	/	classPattern
	/	idPattern
	/	usingPattern
	/	objectField
	/	boolean
	/	identifier
	/	index
	/	number
	/	nullLiteral
	/	undefinedLiteral
	/	otherValue
	
// SINGLE/DOUBLE QUOTED
quotedText
	=	'"' chars:[^"]* '"' { return { type: 'string', value: chars.join('') }; }
	/	"'" chars:[^']* "'" { return { type: 'string', value: chars.join('') }; }

objectField
	=	obj:identifier "[" field:identifier "]" {
			return { type: 'objectField', object: obj, field: field };
		}

identifier
	=	head:[a-zA-Z_] tail:[a-zA-Z0-9._]* { return { type: 'identifier', value: head + tail.join('') }; }
	
merge_identifier
	=	"[" _ tagName:[a-zA-Z0-9._]* _ "]" { return { type: 'identifier', value: `${tagName.join('')}` }; }

index
	=	"[" i:[0-9]+ "]" { return { type: 'index', value: parseInt(i.join(''), 10) }; }

number "Number"
	=	number:[0-9]+ { return { type: "number", value: parseInt(number.join(''), 10) }}

boolean "Boolean"
	=	boolean:('true' / 'false') { return {type: 'boolean', value: boolean === 'true' }}

text "Text"
  	=	chars:([^\[\]]+) {
			return { 
				kind: 'text', 
				type: 'text', 
				value: chars.join(''), 
				content: chars.join(''), 
				text: chars.join(''),
				render: chars.join('')
			}
		}


_ "whitespace"
	= [ \t\n\r]*

// =========
//   CARGO
// =========


condition "Condition"

	= 	left:operand _ operator:operators _ right:operand {
			let value = _evaluateCondition({left, operator, right}, payload)
			return { type: "condition", value: value }
		}

	/ neg:"!" op:operand _ {
		op.neg = true
		if(op.type !== 'boolean'){ op.value = _getValueFromPath(op, payload) }
		op.value = !op.value
		op.type = 'condition'
		return op
	}

logicalAndExpression "LogicalAndExpression"
    =	left:(condition / operand ) _ "&&" _ right:(condition / operand) { 

			if(left.type !== 'condition'){
				left.value = Boolean(_getValueFromPath(left, payload))
			}
			if(right.type !== 'condition'){
				right.value = Boolean(_getValueFromPath(right, payload))
			}

			let result = (left.value && right.value)

			return { type: "condition", value: result }

		}

logicalOrExpression "LogicalOrExpression"
    = 	left:(condition / operand ) _ "||" _ right:(condition / operand ) { 

			if(left.type !== 'condition'){
				left.value = Boolean(_getValueFromPath(left, payload))
			}
			if(right.type !== 'condition'){
				right.value = Boolean(_getValueFromPath(right, payload))
			}

			let result = (left.value || right.value)

			return { type: "condition", value: result }

		}


operators "Operators"
	= 	'===' / '==' / '!==' / '!=' / '<=' / '>=' / '<' / '>'


operand "Operand"
	=	quotedText
	/	boolean
	/	number
	/	name


name "Name"
	=	name:$([a-zA-Z0-9'.]+) {return { type: "name", value: name}}


assignment "Assignment"
	= 	name:operand _ "=" _ value:operand {
			return { type: "assignment", name, value }
		}

nullLiteral
    =	"null" { return { type: 'null', value: null } }

undefinedLiteral
    =	"undefined" { return { type: 'undefined', value: undefined } }

// USING
usingPattern "Using"
	=	name:operand _ "using" _ value:operand {
			return {
				type: "using", 
				name: name.value,
				value: _getValueFromPath(value.value, payload) || value.value
			}
		}

// ATTRIBUTES
attribute
	= 	key:attrKey _ "=" _ value:(quotedText / text) {
			return { type: "attribute", key, value: value.value }
		}

attrKey
	=	$([a-zA-Z0-9-_.]+)


// CLASSES
classPattern
	=	"." className:attrKey {
		return { type: "classes", value: className }
	}

// ID
idPattern
	=	"#" idName:attrKey {
			return { type: "id", value: idName }
		}

// FLAG
flag
	=	"-" flag:attrKey {
			return { type: "flag", value: flag }
		}

// OTHER
otherValue
	=	other:($("'" [^']* "'") / $("\"" [^"]* "\"") / $([^\s,]+)) { 
			return { type: "otherValue", value: other }
		}
