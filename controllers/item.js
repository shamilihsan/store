const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Item = require('../models/item')

var hashkey = 'secretkey';

exports.getItem = (req, res, next) => {
    res.status(200).json({ message: "Got an item brah" })
}

exports.getItems = (req, res, next) => {
    res.status(200).json({ message: "Got items brah" })
}

exports.postItem = (req, res, next) => {

    const name = req.body.name
    const price = req.body.price
    const description = req.body.description

    Item.findOne({ name: name })
        .then( item => {
            if(item){
                const error = new Error('An item with the name ' + name + ' already exists')
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })

    res.status(200).json({ message: "Created item brah" })
}

exports.updateItem = (req, res, next) => {
    res.status(200).json({ message: "Updated item brah" })
}

exports.deleteItem = (req, res, next) => {
    res.status(200).json({ message: "Deleted item brah" })
}