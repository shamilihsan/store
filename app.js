const express = require('express')

const authRouters = require('./routes/auth')

const app = express()

app.use('/auth', authRouters)

app.listen(8080)