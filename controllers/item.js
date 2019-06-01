const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Item = require('../models/item')

var hashkey = 'secretkey';

exports.getItem = (req, res, next) => {
    res.status(200).json({ message: "Got an item brah" })
}

exports.getItems = (req, res, next) => {

    Item.find()
        .then(items => {
            res.status(200).json({ items: items })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.postItem = (req, res, next) => {
    const errors = validationResult(req);

    const name = req.body.name
    const price = req.body.price
    const description = req.body.description

    Item.findOne({ name: name })
        .then(isitem => {
            if (isitem) {
                const error = new Error('An item with the name ' + name + ' already exists')
                error.statusCode = 422
                error.data = errors.array()
                throw error
            }

            const item = new Item({
                name: name,
                price: price,
                description: description
            })

            return item.save()
        })
        .then(result => {
            res.status(201).json({ message: 'Added item successfully', item: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.updateItem = (req, res, next) => {
    res.status(200).json({ message: "Updated item brah" })
}

exports.deleteItem = (req, res, next) => {
    res.status(200).json({ message: "Deleted item brah" })
}