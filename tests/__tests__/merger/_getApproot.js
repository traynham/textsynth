import fs from 'fs'
import process from 'process'
import { describe, expect, jest, test } from '@jest/globals'
import TextSynth from '../index.js'

// Turning off console.
console.log = () => {}

describe('_getAppRoot method', () => {
  
  test('returns correct directory if node_modules is present', async () => {
	const textSynth = await TextSynth()

	const originalCwd = process.cwd
	const originalReaddirSync = fs.readdirSync
	
	// Mock process.cwd to return a custom current directory
	process.cwd = jest.fn().mockReturnValue('/path/to/current')
	
	// Mock fs.readdirSync to simulate a directory with node_modules
	fs.readdirSync = jest.fn().mockReturnValue(['node_modules'])
	
	const result = textSynth._getAppRoot()

	expect(result).toBe('/path/to/current')

	// Reset the mocks
	process.cwd = originalCwd
	fs.readdirSync = originalReaddirSync
	
  })

  test('returns null if no parent directory with node_modules is found', async () => {

	const textSynth = await TextSynth()

	const originalCwd = process.cwd
	const originalReaddirSync = fs.readdirSync
	
	// Mock process.cwd to return a custom current directory
	process.cwd = jest.fn().mockReturnValue('/path/to/current')
	
	// Mock fs.readdirSync to simulate a directory without node_modules
	fs.readdirSync = jest.fn().mockReturnValue(['other_dir'])
	
	const result = textSynth._getAppRoot()

	expect(result).toBe(null)

	// Reset the mocks
	process.cwd = originalCwd
	fs.readdirSync = originalReaddirSync
	
  })
  
})