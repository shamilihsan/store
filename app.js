const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRouters = require('./routes/auth')
const itemRouters = require('./routes/item')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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

