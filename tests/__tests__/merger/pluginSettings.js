import { describe, expect, test, jest } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

// Turning off console.
console.log = () => {}

describe("pluginSettings", () => {

	test("should return undefined and console error for nonexistent plugin", () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
		expect(textSynth.pluginSettings('nonexistent')).toBeUndefined()
		expect(consoleSpy).toHaveBeenCalledWith('Plugin nonexistent does not exist.')
		consoleSpy.mockRestore()
	});

	test("should initialize an empty settings object for a plugin without settings", () => {
		textSynth.tags['pluginWithoutSettings'] = {}
		textSynth.pluginSettings('upper', {})
		expect(textSynth.pluginSettings('upper')).toEqual({})
	});

	test("should return existing settings for a plugin with settings", () => {
		let result = textSynth.pluginSettings('upper', { settings: { key: 'value' } })
		expect(result).toEqual({ settings: {key: 'value' }})
	});

	test("should merge existing settings with new settings", () => {
		textSynth.tags['pluginWithSettings'] = { settings: { key1: 'value1', key2: 'value2' } }
		const newSettings = { key2: 'newvalue', key3: 'value3' }
		expect(textSynth.pluginSettings('pluginWithSettings', newSettings))
			.toEqual({ key1: 'value1', key2: 'newvalue', key3: 'value3' })
	})
	
})

