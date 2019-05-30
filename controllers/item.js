const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Item = require('../models/item')

var hashkey = 'secretkey';

exports.getItem = (req, res, next) => {
    res.status(200).json({message: "Got an item brah"})
}

exports.getItems = (req, res, next) => {
    res.status(200).json({message: "Got items brah"})
}

exports.postItem = (req,res,next) => {
    res.status(200).json({message: "Created item brah"})
}

exports.updateItem = (req,res,next) => {
    res.status(200).json({message: "Updated item brah"})
}

exports.deleteItem = (req,res,next) => {
    res.status(200).json({message: "Deleted item brah"})
}