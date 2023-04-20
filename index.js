const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
		const sslServer = https.createServer(
			{
				key: fs.readFileSync(path.join(__dirname, 'cert', 'private.key')),
				cert: fs.readFileSync(path.join(__dirname, 'cert', 'certificate.crt')),
			},
			app
		)
        sslServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()