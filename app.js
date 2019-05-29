const express = require('express')
const bodyParser = require('body-parser')


const authRouters = require('./routes/auth')

const app = express()

app.use(bodyParser.json())

app.use('/auth', authRouters)

app.listen(8080)