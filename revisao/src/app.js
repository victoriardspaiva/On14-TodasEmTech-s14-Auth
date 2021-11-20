const express = require('express')
const cors = require('cors')
const dontenv = require('dotenv')

const db = require('./database/configMongo')

const app = express()

app.use(cors())
app.use(express.json())

dontenv.config()

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: "Deu bom."
    })
})

db.connect()

module.exports = app
