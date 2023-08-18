import JSON6 from 'json-6'
import Lorry from '@jessetraynham/lorry'
import { runAsWorker } from 'synckit'


runAsWorker(async (uri) => {
	
	// Initialize a Lorry instance to handle responses
	let lorry = new Lorry()
	
	// Define a timeout value in milliseconds, e.g., 5000 for 5 seconds
	const TIMEOUT_MS = 5000
	
	// Wrap the fetch operation in a Promise.race with a timeout
	// This will ensure the request fails if it takes longer than the specified timeout
	const fetchWithTimeout = Promise.race([
		fetch(uri),
		new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_MS)),
	])

	try {
		
		// Await the result of the fetch or timeout, whichever comes first
		let result = await fetchWithTimeout
		
		// Check if the result is a valid response (status code 200-299)
		if (!result.ok) {
			return lorry.Throw(result.status)
		}
		
		// Get the Content-Type header from the response
		const contentType = result.headers.get('Content-Type')
		
		// Check if the content type indicates JSON
		if (contentType && contentType.includes('application/json')) {
			
			// If the content type is JSON, parse the result as JSON
			lorry.value = await result.json()
			
		} else {
			
			// If it's not JSON, try to parse it as text
			const textResult = await result.text()
			
			try {
				
				// Try to parse the text as JSON using JSON6 parser
				lorry.value = JSON6.parse(textResult)
				
			} catch (error) {
				
				// If parsing fails, handle the error using Lorry
				return lorry.Throw(418, `ERROR: Content could not be parsed as JSON › ${uri}`)
				
			}
			
		}
		
		// Return the Lorry object with the parsed value
		return lorry

	} catch (error) {
		
		// Handle any fetch or parsing error using Lorry
		return lorry.Throw(`An error occurred while fetching URI: ${uri}, Error: ${error.message}`)
		
	}

})