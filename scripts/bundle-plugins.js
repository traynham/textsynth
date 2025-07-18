// scripts/bundle-plugins.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginsDir = path.resolve(__dirname, '../src/plugins')
const distDir = path.resolve(__dirname, '../src/dist')
const outFile = path.join(distDir, 'plugins.js')

function getPluginFiles(dir) {
	let results = []
	for (const file of fs.readdirSync(dir)) {
		const filePath = path.join(dir, file)
		if (fs.statSync(filePath).isDirectory()) {
			results = results.concat(getPluginFiles(filePath))
		} else if (file.endsWith('.js')) {
			results.push(filePath)
		}
	}
	return results
}

async function loadPlugins(files) {
	const pluginsObject = {}
	for (const file of files) {
		const mod = await import(file + '?ts=' + Date.now())
		const plugin = mod.default || mod.plugin || mod;
		if (!plugin || !plugin.name) {
			console.warn(`Plugin missing 'name' at ${file}. Skipping.`)
			continue
		}
		plugin.variant = 'original'
		pluginsObject[plugin.name] = plugin
		if (Array.isArray(plugin.aliases)) {
			for (const alias of plugin.aliases) {
				const aliasPlugin = { ...plugin, name: alias, alias, variant: 'alias' }
				pluginsObject[alias] = aliasPlugin
			}
		}
	}
	return pluginsObject
}

function serializeValue(value, key = null) {
	if (typeof value === 'function') {
		if (key) {
			let src = value.toString()
			// Replace 'function <name>(' with '<key>(' for method shorthand
			src = src.replace(/^function\s*\w*\s*\(/, `${key}(`)
			return src;
		}
		return value.toString()
	}
	if (Array.isArray(value)) {
		return `[${value.map(v => serializeValue(v)).join(', ')}]`
	}
	if (typeof value === 'object' && value !== null) {
		return serializePlugin(value)
	}
	if (typeof value === 'string') {
		return `\`${value.replace(/`/g, '\\`')}\``
	}
	return String(value)
}

function serializePlugin(plugin) {
	return `{\n${Object.entries(plugin)
		.map(([k, v]) => {
			if (typeof v === 'function') {
				return `\t${serializeValue(v, k)}`
			} else {
				return `\t${k}: ${serializeValue(v)}`
			}
		})
		.join(',\n')}\n}`
}

async function main() {
	fs.mkdirSync(distDir, { recursive: true })
	const pluginFiles = getPluginFiles(pluginsDir)
	const pluginsObject = await loadPlugins(pluginFiles)

	const pluginsCode =
		'// AUTO-GENERATED. DO NOT EDIT.\n' +
		'export const plugins = {\n' +
		Object.entries(pluginsObject)
			.map(([name, plugin]) => `\t${name}: ${serializePlugin(plugin)}`)
			.join(',\n') +
		'\n};\n'

	fs.writeFileSync(outFile, pluginsCode, 'utf8')
	console.log(`✅ Plugins bundled to ${outFile}`)
}

main().catch(e => {
	console.error(e)
	process.exit(1)
})