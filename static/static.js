// static.js
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// Required for ES modules to get __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'public')))

// Start the server
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log(`Static site served at http://localhost:${PORT}/`)
})