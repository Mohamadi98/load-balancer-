const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000
let backendIndex = -1
const backends = ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082']
const headerNames = ['content-type', 'content-length', 'etag', 'date']

app.get('/', (req, res) => {
    res.send('Welcome to load balancer')
})

app.get('/test', async(req, res) => {
    backendIndex = (backendIndex + 1) % backends.length
    const url = new URL(`${backends[backendIndex]}${req.url}`)
    const result = await fetch(url)
    for(const header of headerNames) {
        const value = result.headers.get(header)
        if(value !== null) {
            res.set(header, value)
        }
    }
    const body = Buffer.from(await result.arrayBuffer())
    res.status(result.status).send(body)
})

app.listen(PORT, () => {
    console.log('Server running on PORT: ', PORT)
})