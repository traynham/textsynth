# TextSynth

TextSynth is an extensible text templating engine with an intuitive syntax and built-in plugin support, enabling seamless merging and manipulation of data to generate dynamic content for various applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Plugins](#plugins)
  - [Creating Custom Plugins](#creating-custom-plugins)
  - [Express.js Integration](#expressjs-integration)
- [Options](#options)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features

- Simple and intuitive templating syntax
- Built-in support for plugins, allowing for powerful text manipulation
- Customizable opening and closing tags
- Ability to remove tabs and trailing new lines from the output
- Express.js integration

## Installation

Install TextSynth using npm:

```bash
npm install text-synth
```

## Usage

### Basic Usage

Import the TextSynth library and create a new instance:

```javascript
import TextSynth from 'textsynth';

const textSynth = await TextSynth();

const template = 'Hello, [name]!';
const data = { name: 'World' };

const output = textSynth.merge(template, data);
console.log(output); // Output: Hello, World!

```

### Plugins

TextSynth comes with built-in plugins that can be used to manipulate text within your templates:

```javascript
import TextSynth from 'textsynth';

const textSynth = await TextSynth();

const template = 'Hello, [uppercase:name]!';
const data = { name: 'world' };

const output = textSynth.merge(template, data);
console.log(output); // Output: Hello, WORLD!

```

### Creating Custom Plugins

Create custom plugins to extend TextSynth's functionality:

```javascript
import TextSynth from 'textsynth';

const textSynth = await TextSynth();

const reversePlugin = {
	name: 'reverse',
	kind: 'single',
	processor: ({ content }) => content.split('').reverse().join(''),
};

textSynth.use(reversePlugin);

const template = 'Hello, [reverse:name]!';
const data = { name: 'world' };

const output = textSynth.merge(template, data);
console.log(output); // Output: Hello, dlrow!

```

### Express.js Integration

Use TextSynth as a templating engine in your Express.js application:

```javascript
import express from 'express';
import TextSynth, { expressTextSynthEngine } from 'textsynth';

const app = express();
const textSynth = await TextSynth();

app.engine('synth', expressTextSynthEngine);
app.set('view engine', 'synth');
app.set('textMerger', textSynth);

// Your Express.js routes and configurations

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
```

## Options

TextSynth can be customized using the following options:

- `opener`: The opening tag for merge tags (default: `[`)
- `closer`: The closing tag for merge tags (default: `]`)
- `removeTabs`: Remove tabs from the output (default: `false`)
- `removeTrailingNewLines`: Remove trailing new lines from the output (default: `false`)

## API

- `TextSynth(options)`: Creates a new TextSynth instance with the specified options
- `textSynth.merge(template, data)`: Merges the template and data, returning the merged output
- `textSynth.use(plugin)`: Adds a plugin to the TextSynth instance
- `textSynth.renderFile(filePath, data, options)`: Renders a template file with the given data and options

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## License

TextSynth is released under the [MIT License](LICENSE).

