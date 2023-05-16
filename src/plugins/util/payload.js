function setDeepValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();

  let current = obj;
  for (const key of keys) {
	if (!current[key]) {
	  current[key] = {};
	}
	current = current[key];
  }

  current[lastKey] = value;
}

function getDeepValue(obj, path) {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
	if (!current[key]) {
	  return undefined;
	}
	current = current[key];
  }

  return current;
}

export default {
  name: 'payload',
  kind: 'single',
  category: 'Data',
  description: 'Interact with the payload to get or set items.',
  usage: `{{payload: 'key'}}\n{{payload: 'key=value'}}\n{{payload: 'key1=value1, key2=value2'}}`,
  example: `{{payload: 'tests.test1.name'}}`,
  processor(req) {
	const keyValuePairs = req.content.split(',').map(pair => pair.trim());

	return keyValuePairs
	  .map(pair => {
		const [key, value] = pair.split('=');

		if (value === undefined) {
		  // Get value
		  return getDeepValue(req.payload, key.trim());
		} else {
		  // Set value
		  setDeepValue(req.payload, key.trim(), value.trim());
		  return '';
		}
	  })
	  .join('');
  },
};
