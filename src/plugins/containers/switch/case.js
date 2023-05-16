export default {
  name: 'case',
  description: 'Renders content if the switch value matches the case value.',
  example: '{{case: "admin"}}Admin{{/case}}',
  usage: '{{case: value}}...{{/case}}',
  category: 'Conditional',
  kind: 'container',
  processor(req) {
//	  console.log('CASE REQ::', req)
	if (req.payload.__switchValue === req.params[0]) {
		req.payload.__switchValueMatched = true;
	  return req.content;
	}
	return '';
  }
}
