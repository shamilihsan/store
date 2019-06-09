const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Item = require('../models/item')

exports.getItem = (req, res, next) => {
    const errors = validationResult(req)
    const itemId = req.body.itemId
    
    Item.findById(itemId)
        .then(item => {
            if (!item) {
                const error = new Error('An item with the name ' + name + ' does not exist')
                error.statusCode = 422
                error.data = errors.array()
                throw error
            }

            res.status(200).json({ item: item })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
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

    const updatedName = req.body.name
    const updatedPrice = req.body.price
    const updatedDescription = req.body.description

    Item.findOne({ name: updatedName })
        .then(item => {
            item.name = updatedName
            item.price = updatedPrice
            item.description = updatedDescription

            return item.save()
        })
        .then(result => {
            res.status(201).json({ message: 'Updated item successfully', item: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteItem = (req, res, next) => {
    const errors = validationResult(req);
    const name = req.body.name

    Item.findOne({ name: name })
        .then(item => {
            if (!item) {
                const error = new Error('An item with the name ' + name + ' does not exist')
                error.statusCode = 422
                error.data = errors.array()
                throw error
            }

            return Item.findOneAndDelete({ name: name })
        })
        .then(result => {
            res.status(200).json({ message: "Deleted item", item: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}