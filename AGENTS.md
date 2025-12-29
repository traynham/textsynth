# Repository Guidelines

## Project Structure & Module Organization
Core engine code lives in `src/`, with the primary entry at `src/merger.js`. Parsing rules are defined in `src/grammar.peggy`, and the generated parser is written to `src/dist/grammar.js`. Built-in plugins are grouped by category under `src/plugins/<category>/`. The package entrypoint `index.js` re-exports the engine for consumers. Tests are organized by plugin area under `tests/__tests__/`, with shared helpers in `tests/support/`; Jest coverage output is written to `tests/coverage/`. Browser demos and static test assets live in `static/public/`, and example integrations are in `examples/`.

## Build, Test, and Development Commands
- `npm run dev`: run the local entrypoint with nodemon for rapid iteration.
- `npm start`: run the library entrypoint with Node (no watch mode).
- `npm run static`: serve `static/public/` on `PORT` (defaults to 8080).
- `npm test`: run Jest with coverage using `.jest.js`.
- `npm run testv`: run Jest in verbose mode.
- `npm run express_example`: run the Express example in `examples/express/`.
- `npm run build:grammar`: regenerate `src/dist/grammar.js` from `src/grammar.peggy`.
- `npm run merge_docs`: generate `docs/merger.md` from JSDoc in `src/merger.js`.

## Coding Style & Naming Conventions
This repo uses ES modules (`type: module`); prefer `import`/`export` and top-level `await` as in existing files. Indentation is tabs, string literals are single-quoted, and most files omit semicolons. Keep new files consistent with existing naming: lower-case filenames, and plugin categories use snake_case (e.g., `src/plugins/array_and_text/`). When adding a plugin, mirror its test location under `tests/__tests__/<category>/<name>.js`.

## Testing Guidelines
Tests are written with Jest (`.jest.js`) and typically import the engine from `tests/__tests__/index.js`. Coverage is collected on every run and stored in `tests/coverage/` (generated output; do not edit by hand). Add tests alongside the feature or plugin you change, keeping the directory structure aligned with `src/plugins/`.

## Commit & Pull Request Guidelines
Git history uses short, plain-English commit messages (e.g., “Updated tests”, “Added …”), without a conventional-commit prefix. Keep messages concise and specific to the change. For PRs, include a brief summary, list test commands run, and call out generated artifacts (grammar/doc updates) when they change. Attach screenshots only if you modify assets under `static/public/`.
