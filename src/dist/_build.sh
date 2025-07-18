#!/bin/bash

npm run build:grammar
node scripts/bundle-plugins.js
npx esbuild src/dist/engine.js --bundle --minify --format=esm --outfile=src/dist/mote.js
cp src/dist/mote.js static/public/js/mote.js