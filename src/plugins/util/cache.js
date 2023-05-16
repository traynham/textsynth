import fs from 'fs'
import path from 'path'

import { add } from 'date-fns'


const cacheFolder = './cache'

function ensureCacheFolderExists() {
	if (!fs.existsSync(cacheFolder)) {
		fs.mkdirSync(cacheFolder)
	}
}

function getCacheFilePath(name) {
	return path.join(cacheFolder, `${name}.json`)
}

function isCacheValid(expiration, cacheData) {
	const now = new Date().getTime()
	return now <= cacheData.expiration
}

export default {
	name: 'cache',
	kind: 'container',
	category: 'Performance',
	description: 'Caches the content and serves it if not expired.',
	usage: `{{cache: 'name', 'expiration'}} ... {{/cache}}`,
	processor(req) {
		
		ensureCacheFolderExists()
		
		const [ name, expiration ] = req.params
		const cacheFilePath = getCacheFilePath(name)
		if (fs.existsSync(cacheFilePath)) {
			
			const cacheData = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'))
			
			if (isCacheValid(expiration, cacheData)) {
				return cacheData.content
			}
			
		}
		
		const processedContent = req.textMerger.merge(req.content, req.payload)
		
		const cacheData = {
			content: processedContent,
			expiration: parseExpiration(expiration)
		}
		
		fs.writeFileSync(cacheFilePath, JSON.stringify(cacheData), 'utf-8')
		
		return processedContent
		
	}
  
}

function parseExpiration(expiration) {
	
	if (typeof expiration !== 'string') {
		throw new Error('Invalid input: Expiration must be a string');
	}
	
	const units = {
		y: 'years',
		M: 'months',
		w: 'weeks',
		d: 'days',
		h: 'hours',
		m: 'minutes',
		s: 'seconds'
	}
	
	let exp_bits = expiration.split('')
	
	let unitKey = exp_bits.pop()
	let unit = units[unitKey]
	
	if (!unit) {
		throw new Error(`Invalid input: Unit '${unitKey}' is not valid`);
	}
	
	let value = parseInt(exp_bits.join(''), 10)
	
	if (isNaN(value) || value <= 0) {
		throw new Error('Invalid input: Value must be a positive number');
	}
	
	return add(new Date(), { [unit]: value })
	
}