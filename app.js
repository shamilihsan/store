const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouters = require('./routes/auth')
const itemRouters = require('./routes/item')
const orderRouters = require('./routes/order')

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use('/order', orderRouters)
app.use('/auth', authRouters)
app.use('/', itemRouters)

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(
    'mongodb+srv://shamil:eO7zwF9iiI5tmUbR@cluster0-np0ek.mongodb.net/store?retryWrites=true'
)
    .then(result => {
        app.listen(8080)
    })
    .catch(err => console.log(err))

