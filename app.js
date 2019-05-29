const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRouters = require('./routes/auth')

const app = express()

app.use(bodyParser.json())

app.use('/auth', authRouters)

mongoose.connect(
    'mongodb+srv://shamil:eO7zwF9iiI5tmUbR@cluster0-np0ek.mongodb.net/store?retryWrites=true'
)
    .then(result => {
        app.listen(8080)
    })
    .catch(err => console.log(err))

