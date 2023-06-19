const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors({
    origin: ['http://localhost:3000']
}));


app.get('/api', (req, res) => {
    const api = process.env.REACT_APP_API_KEY
    res.json({"api" : api})
})


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})
