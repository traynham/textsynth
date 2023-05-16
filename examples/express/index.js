import path from 'path'
import process from 'process'

import express from 'express';
import TextSynth, { expressTextSynthEngine } from '../../index.js';


const app = express();
const textSynth = await TextSynth();


app.engine('synth', (filePath, options, callback) => {
	expressTextSynthEngine(filePath, { ...options, textSynth }, callback)
})

app.set('view engine', 'synth');
//app.set('textMerger', textSynth);
app.set('views', path.join(process.cwd(), 'examples/express/views'));


app.get('/', async function(req, res) {
	res.render('index', {place: 'world'})	
})

app.listen(3000, () => {
	console.log('Server started on port 3000');
});