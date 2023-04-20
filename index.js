const express = require('express')
const cors = require('cors')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 80

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()