export default {
  name: 'default',
  description: 'Renders content if no previous case value has matched the switch value.',
  example: '{{default}}Guest{{/default}}',
  usage: '{{default}}...{{/default}}',
  category: 'Conditional',
  kind: 'container',
  processor(req) {
//	  console.log('DEFAULT REQ::', req)
	const matchedCase = req.payload.__switchValueMatched;
	if (!matchedCase) {
	  req.payload.__switchValueMatched = true;
	  return req.content;
	}
	return '';
  }
}
