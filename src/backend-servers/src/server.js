const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

app.get('/test', async(req, res) => {
    console.log(`Backend on PORT:${PORT}`)
    console.log(Date())
    console.log('Processing...')
    await delay(100)
    console.log(Date())
    res.status(200).json({message: 'Welcome to backend'})
})

app.listen(PORT, ()=> {
    console.log('Server running on PORT:', PORT)
})