export default {
  name: 'switch',
  description: 'Performs multiple conditional checks based on a single payload value.',
  example: '{{switch: user.role}}\n{{case: "admin"}}Admin{{/case}}{{case: "user"}}User{{/case}}{{default}}Guest{{/default}}{{/switch}}',
  usage: '{{switch: path}}\n\t{{case: value}}...{{/case}}\n\t{{default}}...{{/default}}\n{{/switch}}',
  category: 'Conditional',
  kind: 'container',
  processor(req) {
	req.payload.__switchValue = req.params[0];
//	  console.log('SWITCH REQ::', req)
	return req.content;
  }
}
